#!/usr/bin/env python3
"""
Generador de HTML Portable para Ultra F3
Convierte f3.html en un archivo autónomo con todos los recursos embebidos
"""

import base64
import re
import os
from pathlib import Path
from urllib.request import urlopen
import time

def read_file_as_base64(file_path):
    """Lee un archivo y lo convierte a base64"""
    try:
        with open(file_path, 'rb') as f:
            return base64.b64encode(f.read()).decode('utf-8')
    except Exception as e:
        print(f"⚠️  Error leyendo {file_path}: {e}")
        return None

def get_mime_type(file_path):
    """Determina el tipo MIME basado en la extensión"""
    ext = Path(file_path).suffix.lower()
    mime_types = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.mp3': 'audio/mpeg',
        '.wav': 'audio/wav',
    }
    return mime_types.get(ext, 'application/octet-stream')

def download_cdn_resource(url):
    """Descarga un recurso desde una CDN"""
    try:
        print(f"📥 Descargando: {url[:60]}...")
        response = urlopen(url, timeout=30)
        content = response.read().decode('utf-8')
        return content
    except Exception as e:
        print(f"⚠️  Error descargando {url}: {e}")
        return f"/* Error descargando desde {url} */"

def embed_local_image(html_content, base_path):
    """Convierte referencias de imágenes locales a data URIs"""
    # Patrón para encontrar src="ruta/local"
    pattern = r'src=["\'](?!http|data:)([^"\']+)["\']'
    
    def replace_image(match):
        img_path = match.group(1)
        full_path = os.path.join(base_path, img_path)
        
        if os.path.exists(full_path):
            b64_data = read_file_as_base64(full_path)
            if b64_data:
                mime_type = get_mime_type(full_path)
                print(f"✅ Embebiendo: {img_path}")
                return f'src="data:{mime_type};base64,{b64_data}"'
        
        print(f"⚠️  Imagen no encontrada: {full_path}")
        return match.group(0)  # Mantener original si no se puede convertir
    
    return re.sub(pattern, replace_image, html_content)

def embed_cdn_resources(html_content):
    """Descarga e inline recursos de CDN"""
    
    # Mapeo de URLs de CDN
    cdn_resources = {
        'tailwind': 'https://cdn.tailwindcss.com/3.3.5',
        'font-awesome-css': 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        'chartjs': 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
        'jspdf': 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
    }
    
    # Descargar e inline TailwindCSS
    print("\n🎨 Procesando TailwindCSS...")
    tailwind_js = download_cdn_resource(cdn_resources['tailwind'])
    html_content = html_content.replace(
        '<script src="https://cdn.tailwindcss.com"></script>',
        f'<script>{tailwind_js}</script>'
    )
    
    # Descargar e inline Font Awesome
    print("\n🎨 Procesando Font Awesome...")
    fa_css = download_cdn_resource(cdn_resources['font-awesome-css'])
    html_content = html_content.replace(
        '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">',
        f'<style>{fa_css}</style>'
    )
    
    # Descargar e inline Chart.js
    print("\n📊 Procesando Chart.js...")
    chartjs = download_cdn_resource(cdn_resources['chartjs'])
    html_content = html_content.replace(
        '<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>',
        f'<script>{chartjs}</script>'
    )
    
    # Descargar e inline jsPDF
    print("\n📄 Procesando jsPDF...")
    jspdf = download_cdn_resource(cdn_resources['jspdf'])
    html_content = html_content.replace(
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>',
        f'<script>{jspdf}</script>'
    )
    
    # Google Fonts - inline la importación
    print("\n🔤 Procesando Google Fonts...")
    html_content = html_content.replace(
        '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">',
        '''<style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');
        </style>'''
    )
    
    return html_content

def create_portable_html():
    """Función principal que genera el HTML portable"""
    
    print("=" * 70)
    print("🚀 GENERADOR DE HTML PORTABLE - ULTRA F3")
    print("=" * 70)
    
    # Rutas
    base_dir = Path(__file__).parent
    input_file = base_dir / 'f3.html'
    output_file = base_dir / 'f3_portable.html'
    
    # Leer HTML original
    print(f"\n📖 Leyendo: {input_file}")
    with open(input_file, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Procesar recursos CDN
    print("\n" + "=" * 70)
    print("ETAPA 1: DESCARGANDO RECURSOS CDN")
    print("=" * 70)
    html_content = embed_cdn_resources(html_content)
    
    # Procesar imágenes locales
    print("\n" + "=" * 70)
    print("ETAPA 2: EMBEBIENDO IMÁGENES LOCALES")
    print("=" * 70)
    html_content = embed_local_image(html_content, str(base_dir))
    
    # Agregar metadatos
    metadata_comment = f'''
<!--
═══════════════════════════════════════════════════════════════════════════
    ULTRA F3 - APLICACIÓN HTML PORTABLE
═══════════════════════════════════════════════════════════════════════════
    
    📦 Archivo autónomo generado automáticamente
    🗓️  Generado: {time.strftime('%Y-%m-%d %H:%M:%S')}
    📝 Descripción: Versión portable de la página Ultra F3 con todos 
                    los recursos embebidos (imágenes, CSS, JavaScript)
    
    ✨ Características:
       - No requiere conexión a internet para CDN*
       - Todas las imágenes convertidas a Base64
       - TailwindCSS, Chart.js, FontAwesome y jsPDF embebidos
       - Funcionalidad completa offline
    
    * Nota: Google Fonts requiere conexión para primera carga
    
    🔧 Generado con: create_portable_f3.py
    🏢 Ultra Seco C.A. - Maracaibo, Venezuela
    
═══════════════════════════════════════════════════════════════════════════
-->
'''
    
    # Insertar metadatos después del DOCTYPE
    html_content = html_content.replace('<!DOCTYPE html>', f'<!DOCTYPE html>{metadata_comment}')
    
    # Guardar archivo portable
    print("\n" + "=" * 70)
    print("ETAPA 3: GUARDANDO ARCHIVO PORTABLE")
    print("=" * 70)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    file_size = os.path.getsize(output_file) / 1024 / 1024  # MB
    print(f"\n✅ Archivo creado: {output_file}")
    print(f"📊 Tamaño: {file_size:.2f} MB")
    
    print("\n" + "=" * 70)
    print("🎉 ¡GENERACIÓN COMPLETADA CON ÉXITO!")
    print("=" * 70)
    print(f"\n📁 Ubicación: {output_file.absolute()}")
    print("\n💡 Instrucciones:")
    print("   1. Abra 'f3_portable.html' con cualquier navegador")
    print("   2. Comparta este archivo único - no necesita carpetas adicionales")
    print("   3. Funciona offline (excepto Google Fonts en primera carga)")
    print("\n" + "=" * 70)

if __name__ == '__main__':
    try:
        create_portable_html()
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        import traceback
        traceback.print_exc()
