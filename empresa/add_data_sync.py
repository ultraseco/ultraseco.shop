import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# Mapping from filename or keywords to product name for sync
product_mapping = {
    'estuco': 'Estuco Bloqueador',
    'fortificador': 'Fortificador de Superficies',
    'exteriores': 'Solución Exteriores',
    'interiores': 'Solución Interiores',
    'pintura': 'Pintura Súper Hidrofóbica',
    'nano-aditivo': 'Nano Aditivo',
    'champu': 'Champú',
    'cera': 'Cera',
    'escudo': 'Escudo Cerámico',
    'aditivo': 'Aditivo Asfáltico',
    'eco': 'Eco Capturador',
    'f3': 'Ultra F3',
    'magnetron': 'Eco Magnetron'
}

for filename in html_files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Special handling for index.html
    if filename == 'index.html':
        # we can replace <select ...> with <select data-sync-product="..." ...>
        # but we need to know the product name.
        # In index.html, it's inside <div class="... producto-contenedor" id="prod-estuco">
        # Let's find each producto-contenedor
        blocks = re.split(r'(<div[^>]*producto-contenedor[^>]*>)', content)
        new_content = blocks[0]
        for i in range(1, len(blocks), 2):
            div_start = blocks[i]
            block_content = blocks[i+1]
            
            # extract product name from <h3 class="producto-nombre">Name</h3>
            match = re.search(r'<h3 class="producto-nombre">([^<]+)</h3>', block_content)
            if match:
                prod_name = match.group(1).strip()
                # find the select and inject data-sync-product
                # Only add if not already there
                if 'data-sync-product' not in block_content:
                    block_content = re.sub(
                        r'<select\s+',
                        f'<select data-sync-product="{prod_name}" ',
                        block_content,
                        count=1
                    )
            new_content += div_start + block_content
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")
        
    else:
        # For individual pages
        # determine product name from filename
        prod_key = filename.replace('.html', '').replace('_portable', '').replace('-temp', '')
        # Try to find a match in mapping
        prod_name = None
        for key, value in product_mapping.items():
            if key in filename:
                prod_name = value
                break
        
        if prod_name:
            if '<select' in content and 'data-sync-product' not in content:
                # Add to all selects that have data-price in their options
                # (or just the first select)
                new_content = re.sub(
                    r'<select\s+',
                    f'<select data-sync-product="{prod_name}" ',
                    content
                )
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filename} with product {prod_name}")

