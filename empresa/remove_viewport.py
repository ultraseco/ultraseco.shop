import os
import re

def remove_viewport_from_html(directory):
    # Regex para encontrar la etiqueta <meta name="viewport" ...> sin importar el orden de los atributos
    pattern1 = re.compile(r'<meta\s+(?:[^>]*?\s+)?name=[\'"]viewport[\'"][^>]*>', re.IGNORECASE)
    pattern2 = re.compile(r'<meta\s+(?:[^>]*?\s+)?content=[\'"][^\'"]*[\'"]\s+name=[\'"]viewport[\'"][^>]*>', re.IGNORECASE)
    
    count = 0

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Remover coincidencias de ambas aserciones
                    new_content, num_subs1 = pattern1.subn('', content)
                    new_content, num_subs2 = pattern2.subn('', new_content)
                    
                    if num_subs1 > 0 or num_subs2 > 0:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        count += 1
                        print(f"[MODIFICADO] Eliminado viewport de: {filepath}")
                except Exception as e:
                    print(f"[ERROR] procesando {filepath}: {e}")

    print(f"\n========================================")
    print(f"Proceso completado.")
    print(f"Total de archivos HTML modificados: {count}")
    print(f"========================================")

if __name__ == "__main__":
    # Ruta absoluta al directorio principal de tu ecosistema
    target_directory = '/home/valkash/Documentos/ultraseco_test/empresa'
    print(f"Buscando archivos HTML en: {target_directory}\n")
    remove_viewport_from_html(target_directory)
