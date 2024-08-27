import { ImagenModel } from '../models/imagen.model.js'
import { error, success, notFound } from '../utils/responses.js'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
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

  static async getImagenByName (req, res) {
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

  static async getImagenById (req, res) {
    try {
      const [all] = await ImagenModel.getAll(req.params.resid)
      if (!all || all.length === 0) {
        notFound(req, res, `No se encontró ninguna imagen para el id ${req.params.resid}`)
        return
      }
      const imagename = all[0].URL
      const imagen = await ImagenModel.getImagen(imagename)
      if (!imagen || imagen.length === 0) {
        notFound(req, res, `No se encontró ninguna imagen`)
      } else {
        res.sendFile(imagen)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static create (req, res) {
    const maxImagenes = 10
    upload.array('images', maxImagenes)(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        console.error(err)
        return error(req, res, 'Se produjo un error al cargar imágenes. Asegúrese de que las imágenes sean válidas y de que no excedan el tamaño máximo permitido.')
      } else if (err) {
        console.error(err)
        return error(req, res, 'Se produjo un error al cargar imágenes. Asegúrese de que las imágenes sean válidas y de que no excedan el tamaño máximo permitido.')
      }

      const fileNames = req.files.map(file => file.filename)// Crear un array con los nombres de los archivos

      try {
        let listAdded = []
        for (const filename of fileNames) {
          console.log(filename)
          const added = await ImagenModel.create(filename, req.body.resID)
          listAdded.push(added)
        }
        success(req, res, listAdded, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
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
