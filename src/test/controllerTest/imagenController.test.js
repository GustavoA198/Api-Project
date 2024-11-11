/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { ImagenController } from '../../controllers/imagen.controller.js'
import { ImagenModel } from '../../models/imagen.model.js'
import multer from 'multer'

// Mock de datos de prueba
const mockImagenList = [
  { id: '1', URL: 'imagen1.jpg', resId: '123' },
  { id: '2', URL: 'imagen2.jpg', resId: '456' }
]
const mockImagen = 'imagen1.jpg'

// Mock del modelo ImagenModel
jest.mock('../../models/imagen.model.js')
jest.mock('multer', () => ({
  diskStorage: jest.fn().mockReturnValue({ array: () => mockUploadFn })
}))

describe('Test del controlador de imagen', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // Test para getAll
  test('getAll retorna una lista de imágenes', async () => {
    ImagenModel.getAll = jest.fn().mockResolvedValue([mockImagenList])

    const req = { params: { resid: '123' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ImagenController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockImagenList
    })
  })

  test('getAll maneja errores correctamente', async () => {
    ImagenModel.getAll = jest.fn().mockRejectedValue(new Error('Error al obtener imágenes'))

    const req = { params: { resid: '123' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ImagenController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: 'Error al obtener imágenes'
    })
  })

   // Test para getImagenByName
  test('getImagenByName retorna una imagen por nombre', async () => {
    ImagenModel.getImagen = jest.fn().mockResolvedValue(mockImagen)

    const req = { params: { imagen: 'imagen1.jpg' } }
    const res = {
      sendFile: jest.fn()
    }

    await ImagenController.getImagenByName(req, res)

    expect(res.sendFile).toHaveBeenCalledWith(mockImagen)
  })

  test('getImagenByName retorna error 404 si no se encuentra la imagen', async () => {
    ImagenModel.getImagen = jest.fn().mockResolvedValue(null)

    const req = { params: { imagen: 'imagen_no_existente.jpg' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ImagenController.getImagenByName(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontró ninguna imagen con el nombre imagen_no_existente.jpg'
    })
  })
  // Test para getImagenById
  test('getImagenById retorna una imagen por ID de res', async () => {
    ImagenModel.getAll = jest.fn().mockResolvedValue([mockImagenList])
    ImagenModel.getImagen = jest.fn().mockResolvedValue(mockImagen)

    const req = { params: { resid: '123' } }
    const res = {
      sendFile: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ImagenController.getImagenById(req, res)

    expect(ImagenModel.getAll).toHaveBeenCalledWith('123')
    expect(res.sendFile).toHaveBeenCalledWith(mockImagen)
  })

  test('getImagenById retorna error 204 si no se encuentra imagen para el ID de res', async () => {
    ImagenModel.getAll = jest.fn().mockResolvedValue([])

    const req = { params: { resid: '123' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ImagenController.getImagenById(req, res)

    expect(res.status).toHaveBeenCalledWith(204)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 204,
      body: 'No se encontró ninguna imagen para el id 123'
    })
  })

  // Test para delete
  test('delete elimina una imagen correctamente', async () => {
    ImagenModel.delete = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    const req = { params: { id: '00000000-0000-0000-0000-000000000001' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ImagenController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: [{ affectedRows: 1 }]
    })
  })

  test('delete maneja errores correctamente', async () => {
    ImagenModel.delete = jest.fn().mockRejectedValue(new Error('Error al eliminar imagen'))

    const req = { params: { imagen: 'imagen_error.jpg' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ImagenController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: 'Error al eliminar imagen'
    })
  })

  // Test para create
})
