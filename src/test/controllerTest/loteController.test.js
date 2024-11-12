/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { LoteController } from '../../controllers/lote.controller.js'
import { LoteModel } from '../../models/lote.model.js'

// Mocks de respuesta
const mockLotes = [
  { ID: 1, Nombre: 'Lote 1', Descripcion: 'Descripción del lote 1' },
  { ID: 2, Nombre: 'Lote 2', Descripcion: 'Descripción del lote 2' }
]
const mockLote = { ID: 1, Nombre: 'Lote 1', Descripcion: 'Descripción del lote 1' }
const mockLotePost = {
  Nombre: 'Lote 3',
  Numero: 3,
  FincaID: '123e4567-e89b-12d3-a456-426655440000'
}
const mockBadValidatorPost = {
  body: [
    {
      code: 'invalid_type',
      expected: 'string',
      message: 'Required',
      path: ['Nombre'],
      received: 'undefined'
    }
  ],
  error: true,
  status: 400
}

// Mock del modelo y validaciones
jest.mock('../../models/lote.model.js')

describe('Test del controlador de LoteController', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // GETALL
  test('getAll retorna una lista de lotes', async () => {
    LoteModel.getAll = jest.fn().mockResolvedValue([mockLotes])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await LoteController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(LoteModel.getAll).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockLotes
    })
  })

  test('getAll maneja errores de la base de datos', async () => {
    const errorMessage = 'Error de base de datos'
    LoteModel.getAll = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await LoteController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })

  // GET BY ID
  test('getLote retorna un lote por ID', async () => {
    LoteModel.getLote = jest.fn().mockResolvedValue([mockLote])

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await LoteController.getLote(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(LoteModel.getLote).toHaveBeenCalledWith(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockLote
    })
  })

  test('getLote maneja cuando no se encuentra un lote', async () => {
    LoteModel.getLote = jest.fn().mockResolvedValue([])

    const req = { params: { id: 99 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await LoteController.getLote(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontró ningún lote con el ID 99'
    })
  })

  // CREATE
  test('create agrega un nuevo lote', async () => {
    LoteModel.create = jest.fn().mockResolvedValue(mockLotePost)

    const req = { body: mockLotePost }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await LoteController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(LoteModel.create).toHaveBeenCalledWith(mockLotePost)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockLotePost
    })
  })

  test('create maneja errores de validación', async () => {
    const req = { body: {
      Numero: 3,
      FincaID: '123e4567-e89b-12d3-a456-426655440000'
    } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    jest.mock('../../schemas/lote.schema.js', () => ({
      validateLote: jest.fn(() => mockBadValidatorPost)
    }))

    await LoteController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 400,
      body: mockBadValidatorPost.body
    })
  })

  // UPDATE
  test('update actualiza un lote existente', async () => {
    LoteModel.update = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    const req = { params: { id: 1 }, body: { Nombre: 'Lote Actualizado' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await LoteController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(LoteModel.update).toHaveBeenCalledWith(1, { Nombre: 'Lote Actualizado' })
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: { affectedRows: 1 }
    })
  })

  test('update maneja cuando no se encuentra un lote para actualizar', async () => {
    LoteModel.update = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    const req = { params: { id: 99 }, body: { Nombre: 'Lote Inexistente' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await LoteController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontro ningún lote con el ID 99 para actualizar'
    })
  })

  test('update maneja errores de validación', async () => {
    const req = { params: { id: 1 }, body: { Numero: '3' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    jest.mock('../../schemas/lote.schema.js', () => ({
      validatePartialLote: jest.fn(() => mockBadValidatorPost)
    }))

    await LoteController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 400,
      body: [
        {
          code: 'invalid_type',
          expected: 'number',
          message: 'Expected number, received string',
          path: ['Numero'],
          received: 'string'
        }
      ]
    })
  })

  // DELETE
  test('delete elimina un lote existente', async () => {
    LoteModel.delete = jest.fn().mockResolvedValue({ affectedRows: 1 })

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await LoteController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(LoteModel.delete).toHaveBeenCalledWith(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: 'Lote con ID 1 eliminado'
    })
  })

  test('delete maneja cuando no se encuentra un lote para eliminar', async () => {
    LoteModel.delete = jest.fn().mockResolvedValue({ affectedRows: 0 })

    const req = { params: { id: 99 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await LoteController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontro ningún lote con el ID 99 para eliminar'
    })
  })
})
