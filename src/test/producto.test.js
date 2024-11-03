/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { ProductoController } from '../controllers/producto.controller.js'
import { ProductoModel } from '../models/producto.model.js'
import { validatePartialProducto } from '../schemas/producto.schema.js'

// Mocks de respuesta
const mockProductos = [
  { ID: '1', Numero: 1, Nombre: 'Producto 1', Cantidad: 10, UnidadMedida: 'kg', Observaciones: 'Sin observaciones' },
  { ID: '2', Numero: 2, Nombre: 'Producto 2', Cantidad: 20, UnidadMedida: 'lt', Observaciones: 'Algunas observaciones' }
]
const mockProducto = { ID: '1', Numero: 1, Nombre: 'Producto 1', Cantidad: 10, UnidadMedida: 'kg', Observaciones: 'Sin observaciones' }
const mockProductoPost = { Nombre: 'Producto 1', Fecha: '2024-10-31', Cantidad: 10 }
const mockProductoUpdate = { Nombre: 'Producto 2', Fecha: '2024-10-31' }
const mockBadValidatorPost = {
  body: [
    {
      code: 'invalid_type',
      expected: 'string',
      message: 'Required',
      path: ['Nombre'],
      received: 'undefined'
    },
    {
      code: 'invalid_type',
      expected: 'number',
      message: 'Required',
      path: ['Cantidad'],
      received: 'undefined'
    }
  ],
  'error': true,
  'status': 400
}

// Mock del modelo ProductoModel
jest.mock('../models/producto.model.js')

jest.mock('../schemas/producto.schema.js')

describe('Test del controlador de producto', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // GETALL
  test('getAll retorna una lista de productos', async () => {
    ProductoModel.getAll = jest.fn().mockResolvedValue([mockProductos])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProductoController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(ProductoModel.getAll).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockProductos
    })
  })

  test('getAll retorna un error cuando no hay productos', async () => {
    const errorMessage = 'Error al obtener productos'
    ProductoModel.getAll = jest.fn().mockResolvedValue(new Error(errorMessage))

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProductoController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(ProductoModel.getAll).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: expect.any(String)
    })
  })

  // GET
  test('getProducto retorna un producto existente', async () => {
    ProductoModel.getProducto = jest.fn().mockResolvedValue([mockProducto])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProductoController.getProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(ProductoModel.getProducto).toHaveBeenCalledWith(req.params.id)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockProducto
    })
  })

  test('getProducto retorna un error 404 si no se encuentra el producto', async () => {
    ProductoModel.getProducto = jest.fn().mockResolvedValue([null])

    const req = { params: { id: '999' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProductoController.getProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(ProductoModel.getProducto).toHaveBeenCalledWith(req.params.id)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: `No se encontró ningún producto con el ID ${req.params.id}`
    })
  })

  test('getProducto maneja errores inesperados', async () => {
    const errorMessage = 'Error al obtener el producto'
    ProductoModel.getProducto = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProductoController.getProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(ProductoModel.getProducto).toHaveBeenCalledWith(req.params.id)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: expect.any(String)
    })
  })

  // POST
  test('create agrega un nuevo producto exitosamente', async () => {
    const req = {
      body: mockProductoPost
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    const validateProductoMock = jest.fn().mockReturnValue({ success: true, data: mockProductoPost })
    ProductoModel.create = jest.fn().mockResolvedValue(mockProductoPost)

    await ProductoController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockProductoPost
    })

    validateProductoMock.mockRestore() // Restaurar el mock después de la prueba
  })

  test('create retorna un error 400 cuando la validación falla', async () => {
    const req = {
      body: {}
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    const validateProductoMock = jest.fn().mockReturnValue({ success: false, data: mockProductoPost })
    await ProductoController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(ProductoModel.create).not.toHaveBeenCalled() // Asegurarse de que no se llame a create
    expect(res.send).toHaveBeenCalledWith(mockBadValidatorPost)

    validateProductoMock.mockRestore() // Restaurar el mock después de la prueba
  })

  test('create maneja errores inesperados', async () => {
    const req = {
      body: mockProducto
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    const validateProductoMock = jest.fn().mockReturnValue({ success: false, data: mockProductoPost })

    const errorMessage = 'Error al agregar el producto'
    ProductoModel.create = jest.fn().mockRejectedValue(new Error(errorMessage))

    await ProductoController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: expect.any(String)
    })

    validateProductoMock.mockRestore()
  })

  /*  */

  /* test('update actualiza un producto exitosamente', async () => {
    const req = {
      params: { id: '1' },
      body: mockProductoUpdate
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    const validatePartialProductoMock = jest.fn().mockReturnValue({ success: true, data: mockProductoUpdate })
    ProductoModel.update = jest.fn().mockResolvedValue([{ affectedRows: 1, changedRows: 1 }])

    await ProductoController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: { affectedRows: 1, changedRows: 1 }
    })

    validatePartialProductoMock.mockRestore()
  })
 */
    /*  */

  // DELETE
  test('delete elimina un producto existente exitosamente', async () => {
    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    ProductoModel.delete = jest.fn().mockResolvedValue({ affectedRows: 1 })

    await ProductoController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: `Producto con ID ${req.params.id} eliminado`
    })
  })

  test('delete retorna error 404 si el producto no existe', async () => {
    const req = { params: { id: '999' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    ProductoModel.delete = jest.fn().mockResolvedValue({ affectedRows: 0 })

    await ProductoController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: `No se encontro ningún producto con el ID ${req.params.id} para eliminar`
    })
  })

  test('delete maneja errores inesperados con status 500', async () => {
    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    ProductoModel.delete = jest.fn().mockRejectedValue(new Error('Error inesperado'))

    await ProductoController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: 'Error inesperado'
    })
  })
})

