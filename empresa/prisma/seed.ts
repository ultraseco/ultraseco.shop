import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  // Asegúrate de que la ruta al archivo sea correcta
  const filePath = path.join(__dirname, '../docs/precios.md')
  const content = fs.readFileSync(filePath, 'utf-8')
  
  const lines = content.split('\n').filter(line => line.includes('|') && !line.includes('---') && !line.includes('Nombre'))
  
  let lastNombre = ""

  for (const line of lines) {
    const parts = line.split('|').map(p => p.trim())
    const nombreRaw = parts[1].replace(/\*\*/g, '')
    const nombre = nombreRaw !== "" ? nombreRaw : lastNombre
    lastNombre = nombre
    
    const presentacion = parts[2]
    const precio = parseFloat(parts[3].replace('$', '').replace(',', ''))

    if (!isNaN(precio)) {
      await prisma.producto.upsert({
        where: {
          // ESTA ES LA PARTE QUE DABA ERROR:
          nombre_presentacion: {
            nombre: nombre,
            presentacion: presentacion
          }
        },
        update: { precio },
        create: {
          nombre,
          presentacion,
          precio,
          categoria: "General",
          stock: 0
        },
      })
      console.log(`✅ Procesado: ${nombre} - ${presentacion}`)
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })