import json
import os
import pathlib
import subprocess
import sys
import tempfile
import threading
import unittest
from http.server import BaseHTTPRequestHandler, HTTPServer

ROOT = pathlib.Path(__file__).resolve().parents[1]
SCRIPT = ROOT / ".github" / "scripts" / "inspect_page.py"


class FixtureHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        pages = {
            "/": """<!doctype html><html lang="pt-BR"><head><title>Fixture</title></head>
<body><main><h1>Produto sintético</h1><a href="/about">Sobre</a>
<a href="/logout">Sair</a><a href="https://example.com/external">Externo</a>
<form><label for="email">E-mail</label><input id="email" name="email" type="email" value="SYNTHETIC_PRIVATE_VALUE" required>
<input name="unlabeled" type="text"></form>
<button aria-expanded="false" aria-controls="menu">Menu</button>
<div id="menu" role="status" aria-live="polite">Pronto</div></main></body></html>""",
            "/about": """<!doctype html><html lang="pt-BR"><head><title>Sobre</title></head><body><h1>Sobre</h1><a href="/">Início</a></body></html>""",
            "/logout": """<!doctype html><html><body>ROUTE MUST NOT BE VISITED</body></html>""",
        }
        body = pages.get(self.path, "not found").encode()
        self.send_response(200 if self.path in pages else 404)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *_):
        pass


class SyntheticCrawlerTests(unittest.TestCase):
    def test_public_host_rejects_private_addresses_outside_test_mode(self):
        code = "import runpy; m=runpy.run_path(sys.argv[1]); print(m['public_host']('http://127.0.0.1:8000'))"
        result = subprocess.run([sys.executable, "-c", "import sys; " + code, str(SCRIPT)],
                                capture_output=True, text=True, env={**os.environ, "REINCLUDER_SYNTHETIC_TEST": "0"})
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout.strip(), "False")

    def test_canonical_preserves_functional_query_and_drops_tracking(self):
        code = "import runpy,sys; print(runpy.run_path(sys.argv[1])['canonical']('https://example.com/p?a=1&utm_source=x&gclid=z'))"
        result = subprocess.run([sys.executable, "-c", code, str(SCRIPT)], capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout.strip(), "https://example.com/p?a=1")

    def test_end_to_end_against_synthetic_site(self):
        server = HTTPServer(("127.0.0.1", 0), FixtureHandler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            with tempfile.TemporaryDirectory() as workdir:
                env = {**os.environ, "PAGE_URL": f"http://127.0.0.1:{server.server_port}/",
                       "REINCLUDER_SYNTHETIC_TEST": "1"}
                run = subprocess.run([sys.executable, str(SCRIPT)], cwd=workdir, env=env,
                                     capture_output=True, text=True, timeout=90)
                self.assertEqual(run.returncode, 0, run.stdout + run.stderr)
                evidence = json.loads((pathlib.Path(workdir) / "page_inspection.json").read_text())
                self.assertEqual(evidence["pages_inspected"], 2)
                urls = [p["url"] for p in evidence["pages"]]
                self.assertTrue(any(url.endswith("/about") for url in urls))
                self.assertFalse(any(url.endswith("/logout") for url in urls))
                self.assertFalse(any("example.com" in url for url in urls))
                first = next(p for p in evidence["pages"] if p["url"].endswith("/"))
                form = first["desktop"]["forms"][0]
                self.assertEqual(form["fieldCount"], 2)
                self.assertNotIn("SYNTHETIC_PRIVATE_VALUE", json.dumps(evidence))
                self.assertIn("Produto sintético", first["desktop"]["bodyText"])
        finally:
            server.shutdown()
            server.server_close()


if __name__ == "__main__":
    unittest.main(verbosity=2)
