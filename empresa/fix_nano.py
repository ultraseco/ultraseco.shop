import codecs

file_path = r"c:/Users/benha/OneDrive/Desktop/ultra seco ecosistema/empresa/index.html"

# Try different encodings
for encoding in ['utf-8', 'utf-8-sig', 'latin-1', 'cp1252']:
    try:
        with codecs.open(file_path, 'r', encoding=encoding) as f:
            content = f.read()
        
        # Check if we can find Nano Aditivo
        if 'Nano Aditivo' in content:
            print(f"SUCCESS: File read with {encoding}")
            
            # Make the changes
            content = content.replace('src="images/aditivo.png" alt="Nano Aditivo"', 
                                    'src="images/nano-aditivo.jpg" alt="Nano Aditivo"')
            content = content.replace('<p>Aditivo para concreto de alto rendimiento.</p>', 
                                    '<p>Aditivo nanotecnológico para concreto y morteros de alto rendimiento.</p>')
            
            # Find and replace the specific href for Nano Aditivo
            # Look for the pattern around line 470-480
            lines = content.split('\n')
            for i in range(len(lines)):
                if i > 460 and i < 490:
                    if 'href="aditivo.html"' in lines[i] and 'Nano' in content[max(0,content.rfind('\n', 0, content.find(lines[i]))): content.find(lines[i])+500]:
                        lines[i] = lines[i].replace('href="aditivo.html"', 'href="nano-aditivo.html"')
                        print(f"Changed link at line {i+1}")
            
            content = '\n'.join(lines)
            
            # Write back
            with codecs.open(file_path, 'w', encoding=encoding) as f:
                f.write(content)
            
            print("All changes applied successfully!")
            break
    except Exception as e:
        print(f"Failed with {encoding}: {e}")
        continue
