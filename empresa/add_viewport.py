import os
import re

def add_viewport_to_html(directory):
    # Primero buscamos archivos html
    count_added = 0
    count_skipped = 0

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()

                    # Comprobar si ya existe un viewport
                    pattern_viewport = re.compile(r'<meta\s+(?:[^>]*?\s+)?name=[\'"]viewport[\'"][^>]*>', re.IGNORECASE)
                    if pattern_viewport.search(content):
                        print(f"[SKIPPED] Viewport ya existe en: {filepath}")
                        count_skipped += 1
                        continue

                    # Insertar después de <head> o meta charset
                    viewport_tag = '\n    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n'
                    
                    # Tratar de meterlo después de meta charset
                    pattern_charset = re.compile(r'(<meta\s+charset=[\'"][^\'"]*[\'"][^>]*>)', re.IGNORECASE)
                    
                    if pattern_charset.search(content):
                        new_content = pattern_charset.sub(r'\1' + viewport_tag, content, count=1)
                    else:
                        # Si no hay charset, buscar <head>
                        pattern_head = re.compile(r'(<head(?:>|\s+[^>]*>))', re.IGNORECASE)
                        if pattern_head.search(content):
                            new_content = pattern_head.sub(r'\1' + viewport_tag, content, count=1)
                        else:
                            # Sin head, saltamos por seguridad
                            print(f"[WARNING] No se encontró <head> en: {filepath}")
                            continue

                    
                    # Opcionalmente, quitar los desbordamientos estilo inline (overflow-x: hidden) aunque mejor dejarlo tranquilo y manejarlo por CSS.
                    
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                        count_added += 1
                        print(f"[MODIFICADO] Añadido viewport a: {filepath}")
                        
                except Exception as e:
                    print(f"[ERROR] Procesando {filepath}: {e}")

    print(f"\n========================================")
    print(f"Proceso completado.")
    print(f"Viewport añadidos: {count_added}")
    print(f"Ya tenían viewport: {count_skipped}")
    print(f"========================================")

if __name__ == "__main__":
    target_directory = '/home/valkash/Documentos/ultraseco_test/empresa'
    print(f"Añadiendo viewport en HTMLs dentro de: {target_directory}\n")
    add_viewport_to_html(target_directory)

