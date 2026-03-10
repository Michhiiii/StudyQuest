import os
import re
import ssl
import base64
import hashlib
import markdown
from urllib.request import urlopen, Request
from playwright.sync_api import sync_playwright

WORKSPACE = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(WORKSPACE, "11_PDFs")
IMG_CACHE_DIR = os.path.join(WORKSPACE, ".img_cache")

MD_FILES = [
    ("01_Projektskizze",              "Projektskizze.md"),
    ("02_Software_Development_Plan",  "SoftwareDevelopmentPlan.md"),
    ("03_Anforderungsanalyse",        "Requirements.md"),
    ("03_Anforderungsanalyse",        "UseCases.md"),
    ("04_Grobdesign",                 "Analyseklassenmodell.md"),
    ("04_Grobdesign",                 "Sequenzdiagramme.md"),
    ("05_Software_Detailed_Design",   "DesignPattern_Observer.md"),
    ("05_Software_Detailed_Design",   "Software_Design_Document.md"),
    ("05_Software_Detailed_Design",   "Softwarearchitektur.md"),
    ("06_Software_Verification_Plan", "Software_Verification_Plan.md"),
    ("07_Software_Quality_Assurance", "SQAP_SQAR_StudyQuest.md"),
    ("08_Aufwandsschaetzung",         "Aufwandsschaetzung_Initial.md"),
    ("08_Aufwandsschaetzung",         "Aufwandsschaetzung_Final.md"),
    ("09_Code_Quality_VCS",           "Code_Quality_VCS.md"),
    ("10_Durchfuehrung",              "Besprechungsprotokolle.md"),
    ("10_Durchfuehrung",              "reviewProcedure.md"),
    ("10_Durchfuehrung/tests",        "TEST_DOCUMENTATION.md"),
]

HTML_TEMPLATE = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {{
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 11pt;
    line-height: 1.5;
    color: #222;
    max-width: 210mm;
    margin: 0 auto;
    padding: 10mm;
  }}
  h1 {{ font-size: 20pt; border-bottom: 2px solid #333; padding-bottom: 4px; }}
  h2 {{ font-size: 16pt; border-bottom: 1px solid #aaa; padding-bottom: 3px; margin-top: 1.2em; }}
  h3 {{ font-size: 13pt; margin-top: 1em; }}
  h4 {{ font-size: 11pt; margin-top: 0.8em; }}
  table {{ border-collapse: collapse; width: 100%; margin: 0.8em 0; page-break-inside: auto; }}
  tr {{ page-break-inside: avoid; }}
  th, td {{ border: 1px solid #999; padding: 5px 8px; text-align: left; font-size: 10pt; }}
  th {{ background-color: #f0f0f0; }}
  code {{ background-color: #f4f4f4; padding: 1px 4px; font-size: 0.9em; border-radius: 3px; }}
  pre {{ background-color: #f4f4f4; padding: 10px; overflow-x: auto; font-size: 9pt; border-radius: 4px; }}
  pre code {{ background: none; padding: 0; }}
  img {{ max-width: 100%; height: auto; display: block; margin: 0.5em 0; }}
  blockquote {{ border-left: 3px solid #ccc; margin-left: 0; padding-left: 1em; color: #555; }}
  hr {{ border: none; border-top: 1px solid #ccc; margin: 1.5em 0; }}
  ul, ol {{ padding-left: 1.5em; }}
</style>
</head>
<body>
{content}
</body>
</html>"""

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(IMG_CACHE_DIR, exist_ok=True)

ssl_ctx = ssl.create_default_context()
MIME_MAP = {
    ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
    ".gif": "image/gif", ".svg": "image/svg+xml", ".webp": "image/webp",
}


def download_to_base64(url, timeout=30):
    url_hash = hashlib.md5(url.encode()).hexdigest()
    for ext, mime in MIME_MAP.items():
        cached = os.path.join(IMG_CACHE_DIR, url_hash + ext)
        if os.path.isfile(cached):
            with open(cached, "rb") as f:
                b64 = base64.b64encode(f.read()).decode()
            return f"data:{mime};base64,{b64}"
    try:
        req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urlopen(req, timeout=timeout, context=ssl_ctx) as resp:
            ct = resp.headers.get("Content-Type", "image/png")
            data = resp.read()
        ext = ".png"
        for e, m in MIME_MAP.items():
            if m in ct:
                ext = e
                break
        mime = MIME_MAP.get(ext, "image/png")
        cached = os.path.join(IMG_CACHE_DIR, url_hash + ext)
        with open(cached, "wb") as f:
            f.write(data)
        b64 = base64.b64encode(data).decode()
        return f"data:{mime};base64,{b64}"
    except Exception as e:
        print(f"    [IMG] Failed: {url[:70]}... -> {e}")
        return None


def embed_images(html):
    def _replace(match):
        tag = match.group(0)
        url = match.group(1)
        data_uri = download_to_base64(url)
        if data_uri:
            return tag.replace(url, data_uri)
        return '<em>[Bild konnte nicht geladen werden]</em>'
    return re.sub(r'<img\b[^>]*\bsrc="(https?://[^"]+)"[^>]*/?>', _replace, html)


extensions = ["tables", "fenced_code", "toc", "sane_lists"]

print("Starting PDF conversion with Playwright (Chromium)...\n")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    success = 0
    errors = []

    for folder, filename in MD_FILES:
        src = os.path.join(WORKSPACE, folder, filename)
        if not os.path.isfile(src):
            errors.append(f"NOT FOUND: {folder}/{filename}")
            continue

        pdf_name = os.path.splitext(filename)[0] + ".pdf"
        dest_dir = os.path.join(OUTPUT_DIR, folder)
        os.makedirs(dest_dir, exist_ok=True)
        dst = os.path.join(dest_dir, pdf_name)

        print(f"  Converting: {folder}/{filename} ...", end=" ", flush=True)

        try:
            with open(src, "r", encoding="utf-8") as f:
                md_text = f.read()

            html_body = markdown.markdown(md_text, extensions=extensions)
            html_body = embed_images(html_body)
            full_html = HTML_TEMPLATE.format(content=html_body)

            # Save intermediate HTML for debugging
            html_path = dst.replace(".pdf", ".html")
            with open(html_path, "w", encoding="utf-8") as hf:
                hf.write(full_html)

            page.goto("file:///" + html_path.replace("\\", "/"), wait_until="load")
            page.wait_for_timeout(1000)
            page.pdf(
                path=dst,
                format="A4",
                margin={"top": "15mm", "bottom": "15mm", "left": "15mm", "right": "15mm"},
                print_background=True,
            )

            # Remove HTML after successful PDF generation
            os.remove(html_path)

            print("OK")
            success += 1
        except Exception as e:
            errors.append(f"ERROR: {folder}/{filename} -> {e}")
            print(f"FAILED: {e}")

    browser.close()

print(f"\n{success}/{len(MD_FILES)} PDFs created in {OUTPUT_DIR}")
if errors:
    print("Issues:")
    for e in errors:
        print(f"  - {e}")
