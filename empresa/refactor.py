import re

with open('f3.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Fonts
content = content.replace(
    'href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap"',
    'href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Roboto:wght@300;400;500;700&display=swap"'
)
content = content.replace(
    "font-family: 'Inter', sans-serif;",
    "font-family: 'Roboto', sans-serif;\n            h1, h2, h3, h4, h5, h6, .font-bold, .font-black { font-family: 'Montserrat', sans-serif; }"
)

# 2. Update Body
content = content.replace('<body class="bg-slate-50 text-slate-900">', '<body class="bg-slate-900 text-slate-300">')

# 3. Update Colors (Backgrounds, Texts, Borders)
# White backgrounds to dark blue corporate
content = re.sub(r'\bbg-white\b', 'bg-slate-800', content)
content = re.sub(r'\bbg-slate-50\b', 'bg-slate-900', content)

# Dark text to light text
content = re.sub(r'\btext-slate-900\b', 'text-white', content)
content = re.sub(r'\btext-slate-800\b', 'text-slate-100', content)
content = re.sub(r'\btext-slate-700\b', 'text-slate-300', content)
content = re.sub(r'\btext-slate-600\b', 'text-slate-400', content)

# Light borders to dark borders
content = re.sub(r'\bborder-slate-200\b', 'border-slate-700', content)
content = re.sub(r'\bborder-slate-100\b', 'border-slate-800', content)

# Primary Blue to Corporate Amber/Gold
content = re.sub(r'\bbg-blue-600\b', 'bg-amber-600', content)
content = re.sub(r'\bbg-blue-700\b', 'bg-amber-700', content)
content = re.sub(r'\bhover:bg-blue-700\b', 'hover:bg-amber-500', content)
content = re.sub(r'\btext-blue-600\b', 'text-amber-500', content)
content = re.sub(r'\btext-blue-700\b', 'text-amber-400', content)
content = re.sub(r'\btext-blue-400\b', 'text-amber-400', content)
content = re.sub(r'\bfrom-blue-400\b', 'from-amber-400', content)
content = re.sub(r'\bto-cyan-300\b', 'to-yellow-300', content)

# 4. Update Rounded Corners
content = re.sub(r'\brounded-3xl\b', 'rounded-sm', content)
content = re.sub(r'\brounded-2xl\b', 'rounded-sm', content)
content = re.sub(r'\brounded-xl\b', 'rounded-sm', content)
content = re.sub(r'\brounded-lg\b', 'rounded-sm', content)
content = re.sub(r'\brounded-full\b', 'rounded-sm', content) # Make everything sharper

# 5. Fix Mobile Layout / Grids
# The user wants mobile to be more like desktop and not have huge elements
# Specifically for the video section:
content = content.replace('grid grid-cols-1 lg:grid-cols-2 bg-black w-full', 'grid grid-cols-2 bg-black w-full')
# For other grids: grid-cols-1 lg:grid-cols-2 -> grid-cols-1 md:grid-cols-2 (to make it switch earlier)
content = content.replace('grid grid-cols-1 lg:grid-cols-2', 'grid grid-cols-1 md:grid-cols-2')

# Reduce paddings to make it denser
content = re.sub(r'\bpy-24\b', 'py-12', content)
content = re.sub(r'\bpy-20\b', 'py-10', content)
content = re.sub(r'\bpy-16\b', 'py-8', content)
content = re.sub(r'\bp-8\b', 'p-4 md:p-6', content)
content = re.sub(r'\bp-10\b', 'p-6', content)

# 6. Add Animations/Transitions to cards and buttons
# Any rounded-sm (which was previously rounded-something) we can add a subtle transition
content = content.replace('class="max-w-4xl', 'class="max-w-4xl transition-all duration-500 hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]')
content = content.replace('class="bg-slate-800 rounded-sm p-4 md:p-6', 'class="bg-slate-800 rounded-sm p-4 md:p-6 transition-all duration-500 hover:bg-slate-750 hover:-translate-y-1 hover:border-amber-500/50 border border-slate-700')
content = content.replace('class="bg-slate-900 rounded-sm p-4 md:p-6', 'class="bg-slate-900 rounded-sm p-4 md:p-6 transition-all duration-500 hover:bg-slate-800 hover:-translate-y-1 hover:border-amber-500/50 border border-slate-700')

with open('f3.html', 'w', encoding='utf-8') as f:
    f.write(content)
