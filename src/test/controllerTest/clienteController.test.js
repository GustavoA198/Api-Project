/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { ClienteController } from '../../controllers/cliente.controller.js'
import { ClienteModel } from '../../models/cliente.model.js'

// Mocks de respuesta
const mockClientes = [
  { Nombre: 'Juan Perez', FechaRegistro: '2024-10-31', ID: '1' },
  { Nombre: 'Ana Gomez', FechaRegistro: '2024-11-01', ID: '2' }
]
const mockCliente = { Nombre: 'Juan Perez', FechaRegistro: '2024-10-31', ID: '1', Telefono: '1234567890' }
const mockClientePost = { Nombre: 'Juan Perez', ID: '1', Identificacion: 'ide1', Telefono: '1234567890' }

const mockBadValidatorPost = {
  body: [
    {
      code: 'invalid_type',
      expected: 'string',
      message: 'Required',
      path: ['Identificacion'],
      received: 'undefined'
    },
    {
      code: 'invalid_type',
      expected: 'string',
      message: 'Required',
      path: ['Nombre'],
      received: 'undefined'
    },
    {
      code: 'invalid_type',
      expected: 'string',
      message: 'Required',
      path: ['Telefono'],
      received: 'undefined'
    }
  ],
  error: true,
  status: 400
}

// Mock del modelo ClienteModel
jest.mock('../../models/cliente.model.js')
jest.mock('../../schemas/cliente.schema.js')

describe('Test del controlador de cliente', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // GETALL
  test('getAll retorna una lista de clientes', async () => {
    ClienteModel.getAll = jest.fn().mockResolvedValue([mockClientes])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ClienteController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(ClienteModel.getAll).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockClientes
    })
  })

  test('getAll retorna un error cuando no hay clientes', async () => {
    const errorMessage = 'Error al obtener clientes'
    ClienteModel.getAll = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ClienteController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(ClienteModel.getAll).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: expect.any(String)
    })
  })

  // GET
  test('getCliente retorna un cliente existente', async () => {
    ClienteModel.getCliente = jest.fn().mockResolvedValue([mockCliente])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ClienteController.getCliente(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockCliente
    })
  })

  test('getCliente retorna un error 404 si no se encuentra el cliente', async () => {
    ClienteModel.getCliente = jest.fn().mockResolvedValue([null])

    const req = { params: { id: '999' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ClienteController.getCliente(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: `No se encontró ningún cliente con el ID ${req.params.id}`
    })
  })

  test('getCliente maneja errores inesperados', async () => {
    const errorMessage = 'Error al obtener el cliente'
    ClienteModel.getCliente = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ClienteController.getCliente(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: expect.any(String)
    })
  })

  // POST
  test('create agrega un nuevo cliente exitosamente', async () => {
    const req = {
      body: mockClientePost
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    ClienteModel.create = jest.fn().mockResolvedValue(mockClientePost)

    await ClienteController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockClientePost
    })
  })

  test('create retorna un error 400 cuando la validación falla', async () => {
    const req = {
      body: {}
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ClienteController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith(mockBadValidatorPost)
  })

  test('create maneja errores inesperados', async () => {
    const req = {
      body: mockCliente
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    const errorMessage = 'Error al agregar el cliente'
    ClienteModel.create = jest.fn().mockRejectedValue(new Error(errorMessage))

    await ClienteController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 400,
      body: [
        {
          code: 'invalid_type',
          expected: 'string',
          message: 'Required',
          path: ['Identificacion'],
          received: 'undefined'
        }
      ]
    })
  })

  // DELETE
  test('delete elimina un cliente existente exitosamente', async () => {
    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    ClienteModel.delete = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    await ClienteController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(ClienteModel.delete).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: {
        'affectedRows': 1
      }
    })
  })

  test('delete retorna error 404 si el cliente no existe', async () => {
    const req = { params: { id: '999' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    ClienteModel.delete = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    await ClienteController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(ClienteModel.delete).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: `No se encontró ningún cliente con el ID ${req.params.id} para eliminar`
    })
  })

  test('delete maneja errores inesperados con status 500', async () => {
    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    ClienteModel.delete = jest.fn().mockRejectedValue(new Error('Error inesperado'))

    await ClienteController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(ClienteModel.delete).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: expect.any(String)
    })
  })

  // UPDATE
  test('update actualiza un cliente existente exitosamente', async () => {
    const req = {
      params: { id: '1' },
      body: mockClientePost
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    ClienteModel.update = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    await ClienteController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(ClienteModel.update).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: {
        'affectedRows': 1
      }
    })
  })

  test('update retorna error 404 si el cliente no existe', async () => {
    const req = {
      params: { id: '999' },
      body: mockClientePost
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    ClienteModel.update = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    await ClienteController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(ClienteModel.update).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: `No se encontro ningun cliente con el ID ${req.params.id} para actualizar`
    })
  })
})
