"""Debug script to check if HTML conversion produces complete output."""
import os
import markdown

WORKSPACE = os.path.dirname(os.path.abspath(__file__))
extensions = ["tables", "fenced_code", "toc", "sane_lists"]

test_files = [
    "06_Software_Verification_Plan/Software_Verification_Plan.md",
    "03_Anforderungsanalyse/Requirements.md",
    "07_Software_Quality_Assurance/SQAP_SQAR_StudyQuest.md",
    "10_Durchfuehrung/Besprechungsprotokolle.md",
    "04_Grobdesign/Sequenzdiagramme.md",
]

for rel_path in test_files:
    src = os.path.join(WORKSPACE, rel_path)
    with open(src, "r", encoding="utf-8") as f:
        md_text = f.read()
    
    # Check raw MD
    md_lines = md_text.count("\n")
    md_chars = len(md_text)
    
    # Check last 200 chars of MD
    md_tail = md_text[-200:].strip()
    
    # Convert to HTML
    html = markdown.markdown(md_text, extensions=extensions)
    html_chars = len(html)
    
    # Check last 200 chars of HTML
    html_tail = html[-200:].strip()
    
    print(f"\n{'='*60}")
    print(f"FILE: {rel_path}")
    print(f"  MD:   {md_lines} lines, {md_chars} chars")
    print(f"  HTML: {html_chars} chars")
    print(f"  MD tail:   ...{md_tail[-80:]}")
    print(f"  HTML tail: ...{html_tail[-80:]}")
