
/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { ProveedorController } from '../../controllers/proveedor.controller.js'
import { ProveedorModel } from '../../models/proveedor.model.js'

jest.mock('../../controllers/proveedor.controller.js')

const mockProveedor = { Identificacion: '123456789', Nombre: 'Proveedor 1', Telefono: '1234567890', Direccion: 'Calle 123' }
const mockBadProveedor = { Identificacion: '123456789', Nombre: 'Proveedor 1', Telefono: 123, Direccion: 'Calle 123' }
const badResponse = {
  body: [
    {
      code: 'invalid_type',
      expected: 'string',
      message: 'Expected string, received number',
      path: ['Telefono'],
      received: 'number'
    }
  ]
}
describe('Test del controlador de ProveedorController', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // GET ALL
  test('getAll devuelve todos los registros de Proveedor correctamente', async () => {
    ProveedorModel.getAll = jest.fn().mockResolvedValue([mockProveedor])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProveedorController.getAll(req, res)

    expect(ProveedorModel.getAll).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockProveedor
    })
  })

  test('getAll maneja errores', async () => {
    const errorMessage = 'Error al obtener registros'
    ProveedorModel.getAll = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProveedorController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })

  // GET ONE
  test('getProveedor devuelve un registro específico', async () => {
    ProveedorModel.getProveedor = jest.fn().mockResolvedValue([mockProveedor])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProveedorController.getProveedor(req, res)

    expect(ProveedorModel.getProveedor).toHaveBeenCalledWith('1')
  })

  test('getProveedor maneja errores', async () => {
    const errorMessage = 'Error al obtener el registro'
    ProveedorModel.getProveedor = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProveedorController.getProveedor(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })

  test('getProveedor maneja registros no encontrados', async () => {
    ProveedorModel.getProveedor = jest.fn().mockResolvedValue([])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProveedorController.getProveedor(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontró ningún proveedor con el ID 1'
    })
  })

  // CREATE
  test('create crea un nuevo registro', async () => {
    const req = { body: mockProveedor }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    ProveedorModel.create = jest.fn().mockResolvedValue(mockProveedor)

    await ProveedorController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockProveedor
    })
  })

  test('create maneja errores', async () => {
    const errorMessage = 'Error al crear el registro'
    ProveedorModel.create = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = { body: mockProveedor }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProveedorController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })

  test('create maneja errores de validación', async () => {
    const req = { body: mockBadProveedor }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }
    ProveedorModel.create = jest.fn().mockResolvedValue([mockBadProveedor])

    await ProveedorController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 400,
      body: badResponse.body
    })
  })

  // UPDATE
  test('update actualiza un registro existente', async () => {
    const req = { params: { id: '1' }, body: mockProveedor }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    ProveedorModel.update = jest.fn().mockResolvedValue([mockProveedor])

    await ProveedorController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockProveedor
    })
  })

  test('update maneja errores', async () => {
    const errorMessage = 'Error al actualizar el registro'
    ProveedorModel.update = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = { params: { id: '1' }, body: mockProveedor }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProveedorController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })

  test('update maneja errores de validación', async () => {
    const req = { params: { id: '1' }, body: mockBadProveedor }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }
    ProveedorModel.update = jest.fn().mockResolvedValue([mockBadProveedor])

    await ProveedorController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 400,
      body: badResponse.body
    })
  })

  test('update maneja registros no encontrados', async () => {
    ProveedorModel.update = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    const req = { params: { id: '1' }, body: mockProveedor }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProveedorController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontro ningun proveedor con el ID 1 para actualizar'
    })
  })

  // DELETE
  test('delete elimina un registro', async () => {
    const responseMock = { affectedRows: 1 }
    ProveedorModel.delete = jest.fn().mockResolvedValue([responseMock])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProveedorController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: responseMock
    })
  })

  test('delete maneja errores', async () => {
    const errorMessage = 'Error al eliminar el registro'
    ProveedorModel.delete = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProveedorController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })

  test('delete maneja registros no encontrados', async () => {
    ProveedorModel.delete = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProveedorController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontró ningún proveedor con el ID 1 para eliminar'
    })
  })
})
