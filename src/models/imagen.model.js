import { database } from '../database/db.js'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import { promisify } from 'util'
import fs from 'fs'

export class ImagenModel {
  static async getAll () {
    return await database.query('SELECT * FROM Imagen')
  }

  static async getImagen (resID) {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename);
    const results = await database.query('SELECT * FROM Imagen WHERE resID = ?', [resID])
    const readFile = promisify(fs.readFile)
    console.log('_____________________________________________________________________')
    console.log('results', results, 'filename', __filename, 'dirname', __dirname, 'readfile', readFile)
  
    if (results[0].length > 0) {
      const images = []
      for (let result of results[0]) {
        console.log('result.url', result.URL)
        if (result.URL) {          
          const data = await readFile(path.join(__dirname, '..', '..', result.URL)) // Lee el archivo de imagen
          const imageBase64 = Buffer.from(data).toString('base64') // Convierte la imagen a Base64          
          images.push({
            ID: result.ID,
            Image: imageBase64,
            resID: result.resID
          })
        }
      }
      return images
    } else {
      throw new Error(`No se encontró ninguna imagen con el ID ${resID}`)
    }
  }

  static async delete (id) {
    return await database.query('DELETE FROM Imagen WHERE ID = ?', [id])
  }
}
