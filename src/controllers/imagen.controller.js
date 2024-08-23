import { ImagenModel } from '../models/imagen.model.js'
import { error, success, notFound } from '../utils/responses.js'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

export class ImagenController {

  static async getAll (req, res) {
    try {
      const [all] = await ImagenModel.getAll(req.params.resid)
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getImagen (req, res) {
    try {
      const imagen = await ImagenModel.getImagen(req.params.imagen)
      if (!imagen || imagen.length === 0) {
        notFound(req, res, `No se encontró ninguna imagen con el nombre ${req.params.imagen}`)
      } else {
        res.sendFile(imagen)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static create (req, res) {
    const maxImagenes = 10
    upload.array('images', maxImagenes)(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.error(err)
        return error(req, res, 'Se produjo un error al cargar imágenes. Asegúrese de que las imágenes sean válidas y de que no excedan el tamaño máximo permitido.')
      } else if (err) {
        console.error(err)
        return error(req, res, 'Se produjo un error al cargar imágenes. Asegúrese de que las imágenes sean válidas y de que no excedan el tamaño máximo permitido.')
      }
      const fileLocations = req.files.map(file => file.path)// Crear un array con las ubicaciones de los archivos
      const resID = req.body.resID
      console.log(fileLocations)
      ImagenModel.create({ URL: fileLocations, resID: resID })
        .then(() => success(req, res, 'Imágenes guardadas con éxito'))
        .catch(err => {
          console.error(err)
          error(req, res, 'Se produjo un error al guardar las imágenes')
        })
    })
  }

  static async delete (req, res) {
    try {
      const deleted = await ImagenModel.delete(req.params.id)
      success(req, res, deleted, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
