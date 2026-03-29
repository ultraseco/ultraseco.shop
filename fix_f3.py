
import os

filepath = r"c:\Users\benha\OneDrive\Desktop\ultra seco ecosistema\empresa\f3_portable.html"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add config.js to head
head_tag = '<title>ULTRA-F3 | La Revolución de la Extinción</title>'
if head_tag in content and 'src="config.js"' not in content[:2000]:
    content = content.replace(head_tag, head_tag + '\n    <script src="config.js"></script>')
    print("Added config.js to head.")

# 2. Fix nested script tag
# We are looking for:
#     <script>
#         // --- GEMINI AI CONFIG ---
#     <script src="config.js"></script>
#     <script>
#         let apiKey = ...

bad_block = """    <script>
        // --- GEMINI AI CONFIG ---
    <script src="config.js"></script>
    <script>
        let apiKey = window.ULTRA_SECO_CONFIG?.GEMINI_API_KEY || localStorage.getItem('gemini-api-key');"""

good_block = """    <script>
        // --- GEMINI AI CONFIG ---
        let apiKey = window.ULTRA_SECO_CONFIG?.GEMINI_API_KEY || localStorage.getItem('gemini-api-key');"""

if bad_block in content:
    content = content.replace(bad_block, good_block)
    print("Fixed nested script tag.")
else:
    print("Could not find bad block for nested script tag.")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("File updated.")
