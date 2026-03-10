"""Check PDF page counts to verify completeness."""
import os
from pypdf import PdfReader

PDF_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "11_PDFs")

for root, dirs, files in sorted(os.walk(PDF_DIR)):
    for f in sorted(files):
        if f.endswith(".pdf"):
            path = os.path.join(root, f)
            try:
                reader = PdfReader(path)
                pages = len(reader.pages)
                size_kb = os.path.getsize(path) // 1024
                rel = os.path.relpath(path, PDF_DIR)
                print(f"  {rel:<60} {pages:>3} pages  {size_kb:>5} KB")
            except Exception as e:
                print(f"  ERROR: {f} -> {e}")
