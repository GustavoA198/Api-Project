/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { InsumosTransaccionController } from '../../controllers/insumosTransaccion.controller.js'
import { InsumosTransaccionModel } from '../../models/insumosTransaccion.model.js'

// Mocks de respuesta
const mockTransacciones = [
  { ID: 1, Nombre: 'Transacción 1', Cantidad: 10 },
  { ID: 2, Nombre: 'Transacción 2', Cantidad: 20 }
]
const mockTransaccion = { ID: 1, Nombre: 'Transacción 1', Cantidad: 10 }
const mockTransaccionPost =
  {
    Cantidad: 15,
    InsumoID: '123e4567-e89b-12d3-a456-426655440000',
    TransaccionID: '123e4567-e89b-12d3-a456-426655440000'
  }
const mockBadValidatorPost = {
  body: [
    {
      code: 'invalid_type',
      expected: 'number',
      message: 'Required',
      path: ['Cantidad'],
      received: 'undefined'
    }
  ],
  error: true,
  status: 400
}

// Mock del modelo y validaciones
jest.mock('../../models/insumosTransaccion.model.js')

describe('Test del controlador de InsumosTransaccionController', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // GETALL
  test('getAll retorna una lista de transacciones', async () => {
    InsumosTransaccionModel.getAll = jest.fn().mockResolvedValue([mockTransacciones])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await InsumosTransaccionController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(InsumosTransaccionModel.getAll).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockTransacciones
    })
  })

  test('getAll maneja errores de la base de datos', async () => {
    const errorMessage = 'Error de base de datos'
    InsumosTransaccionModel.getAll = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await InsumosTransaccionController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })

  // GET BY ID
  test('getInsumosTransaccion retorna una transacción por ID', async () => {
    InsumosTransaccionModel.getInsumosTransaccionById = jest.fn().mockResolvedValue([[mockTransaccion]])

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await InsumosTransaccionController.getInsumosTransaccion(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(InsumosTransaccionModel.getInsumosTransaccionById).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: [mockTransaccion]
    })
  })

  test('getInsumosTransaccion retorna un notFound cuando no existe la transacción', async () => {
    InsumosTransaccionModel.getInsumosTransaccionById = jest.fn().mockResolvedValue([[]])

    const req = { params: { id: 999 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await InsumosTransaccionController.getInsumosTransaccion(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontró ningun insumo transaccion con el ID 999'
    })
  })

  // CREATE
  test('create añade una nueva transacción con éxito', async () => {
    InsumosTransaccionModel.create = jest.fn().mockResolvedValue(mockTransaccionPost)

    const req = { body: mockTransaccionPost }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await InsumosTransaccionController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(InsumosTransaccionModel.create).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockTransaccionPost
    })
  })

  test('create retorna un error de validación', async () => {
    const req = { body: {
      InsumoID: '123e4567-e89b-12d3-a456-426655440000',
      TransaccionID: '123e4567-e89b-12d3-a456-426655440000'
    } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await InsumosTransaccionController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith(mockBadValidatorPost)
  })

  // UPDATE
  test('update actualiza una transacción existente con éxito', async () => {
    InsumosTransaccionModel.update = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    const req = { params: { id: 1 }, body: { Cantidad: 20 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await InsumosTransaccionController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(InsumosTransaccionModel.update).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: { affectedRows: 1 }
    })
  })

  test('update retorna notFound cuando no se actualiza ninguna transacción', async () => {
    InsumosTransaccionModel.update = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    const req = { params: { id: 999 }, body: { Cantidad: 30 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await InsumosTransaccionController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontro ningun insumo transaccion con el ID 999 para actualizar'
    })
  })

  // DELETE
  test('delete elimina una transacción con éxito', async () => {
    InsumosTransaccionModel.delete = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await InsumosTransaccionController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(InsumosTransaccionModel.delete).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: { affectedRows: 1 }
    })
  })
})
