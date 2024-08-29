import { database } from '../database/db.js'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import { promisify } from 'util'
import fs from 'fs'

export class ImagenModel {
  static async getAll (resID) {
    return await database.query('SELECT * FROM Imagen WHERE resID = ?', [resID])
  }

  static async getImagen (imagen) {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
    const readFile = promisify(fs.readFile)
    try {
      const imagenData = path.join(__dirname, '..', '..', 'images', imagen)  // Direccion de la imagen
      await readFile(imagenData) // Lee el archivo de imagen
      return imagenData
    } catch (error) {
      throw new Error(`No se encontró ninguna imagen con el nombre ${imagen}`)
    }
  }

  static async create (URL, resID) {
    const [[{id}]] = await database.query('SELECT UUID() id')
    const result = await database.query('INSERT INTO Imagen (ID, URL, resID) VALUES (?, ?, ?)', [id, URL, resID])
    return result
  }

  static async delete (id) {

    const [resp] = await database.query('SELECT URL FROM Imagen WHERE ID = ?', [id])
    const imagenName = resp[0].URL
    
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
  
    try {
      const imagenData = path.join(__dirname, '..', '..', 'images', imagenName)  // Direccion de la imagen
      fs.unlink(imagenData, async (err) => {
        if (err) {
          throw new Error(`No se encontró ninguna imagen con el ID ${id} para eliminar`)
        }else{
          return await database.query('DELETE FROM Imagen WHERE ID = ?', [id])
        }
      })
    } catch (error) {
      throw new Error(`No se encontró ninguna imagen con el id ${id}`)
    }
  }
}
