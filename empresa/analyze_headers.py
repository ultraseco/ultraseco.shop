import os
from bs4 import BeautifulSoup
import glob

html_files = glob.glob('*.html')

inconsistent_files = []

for file in html_files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')
        
        header = soup.find('header')
        if not header:
            continue
            
        nav_links = soup.find(class_='nav-links')
        if not nav_links:
            continue
            
        header_classes = header.get('class', [])
        
        # Get the first link class
        first_a = nav_links.find('a')
        if first_a:
            a_classes = first_a.get('class', [])
        else:
            a_classes = []
            
        print(f"File: {file}")
        print(f"Header classes: {' '.join(header_classes) if header_classes else 'None'}")
        print(f"Link classes: {' '.join(a_classes) if isinstance(a_classes, list) else a_classes}")
        print("-" * 40)
        
    except Exception as e:
        print(f"Error parsing {file}: {e}")
