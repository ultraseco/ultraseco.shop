import os
import glob
from bs4 import BeautifulSoup
import re

html_files = glob.glob('*.html')

for file in html_files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        soup = BeautifulSoup(content, 'html.parser')
        header = soup.find('header')
        
        if not header:
            continue
            
        header_classes = header.get('class', [])
        is_dark = False
        is_light = False
        
        if any('bg-slate' in c or 'bg-black' in c for c in header_classes):
            is_dark = True
        elif 'glass-panel' in header_classes:
            is_light = True
            
        if not is_dark and not is_light:
            # Look at styles.css. header defaults to transparent, but we made header.scrolled dark.
            # wait, by default it's transparent, but usually they are explicitly dark or light in the class.
            pass

        # We need to process links in nav-links
        nav_links = soup.find(class_='nav-links')
        if not nav_links:
            continue
            
        modified = False
        
        if is_dark:
            # Enforce light text for dark headers
            for a in nav_links.find_all('a'):
                cls = a.get('class', [])
                if isinstance(cls, str):
                    cls = cls.split()
                
                # if it contains text-slate-800 or similar, remove it
                cls = [c for c in cls if not c.startswith('text-slate-')]
                
                if 'text-white' not in cls:
                    cls.append('text-white')
                    modified = True
                    
                a['class'] = cls
                
            for btn in nav_links.find_all('button'):
                cls = btn.get('class', [])
                if isinstance(cls, str):
                    cls = cls.split()
                if 'text-white' not in cls:
                    cls.append('text-white')
                    modified = True
                btn['class'] = cls

        if is_light:
            # Enforce dark text for light headers
            for a in nav_links.find_all('a'):
                cls = a.get('class', [])
                if isinstance(cls, str):
                    cls = cls.split()
                
                # Remove text-white
                if 'text-white' in cls:
                    cls.remove('text-white')
                    modified = True
                
                if 'text-slate-900' not in cls and 'nav-button' not in cls:
                    cls.append('text-slate-900')
                    modified = True
                    
                a['class'] = cls

            for btn in nav_links.find_all('button'):
                cls = btn.get('class', [])
                if isinstance(cls, str):
                    cls = cls.split()
                if 'text-white' in cls:
                    cls.remove('text-white')
                    modified = True
                if 'text-slate-900' not in cls and 'nav-button' not in cls:
                    cls.append('text-slate-900')
                    modified = True
                btn['class'] = cls
                
        if modified:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(str(soup))
            print(f"Updated {file} -> {'Dark' if is_dark else 'Light'} header")

    except Exception as e:
        print(f"Error {file}: {e}")
