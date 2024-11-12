/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { OcupacionController } from '../../controllers/ocupacion.controller.js'
import { OcupacionModel } from '../../models/ocupacion.model.js'

// Mocks de respuestas
const mockOcupaciones = [
  { NoAnimales: 10, FechaIngreso: '2024-11-01', TipoRebano: 'Lecheras', FechaSalida: '2024-11-10', LoteID: '123e4567-e89b-12d3-a456-426655440000' }
]
const mockOcupacion = { NoAnimales: 5, FechaIngreso: '2024-11-01', TipoRebano: 'Secas', LoteID: '123e4567-e89b-12d3-a456-426655440001' }
const mockUpdatedOcupacion = { NoAnimales: 8, FechaIngreso: '2024-11-01', TipoRebano: 'Lecheras', LoteID: '123e4567-e89b-12d3-a456-426655440001' }
const mockDeleteResult = { affectedRows: 1 }
const mockBadValidatorPost = {
  body: [
    {
      code: 'invalid_type',
      expected: 'number',
      message: 'Required',
      path: ['NoAnimales'],
      received: 'undefined'
    }
  ],
  error: true,
  status: 400
}

// Mock de las funciones del modelo y las validaciones
jest.mock('../../models/ocupacion.model.js')
jest.mock('../../schemas/ocupacion.schema.js')
jest.mock('../../utils/responses.js')

describe('Test del controlador de OcupacionController', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // GET ALL
  test('getAll devuelve todas las ocupaciones correctamente', async () => {
    OcupacionModel.getAll = jest.fn().mockResolvedValue([mockOcupaciones])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await OcupacionController.getAll(req, res)

    expect(OcupacionModel.getAll).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockOcupaciones
    })
  })

  test('getAll maneja errores', async () => {
    const errorMessage = 'Error al obtener ocupaciones'
    OcupacionModel.getAll = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await OcupacionController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })

  // GET ONE
  test('getOcupacion devuelve una ocupación específica', async () => {
    OcupacionModel.getOcupacion = jest.fn().mockResolvedValue([mockOcupacion])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await OcupacionController.getOcupacion(req, res)

    expect(OcupacionModel.getOcupacion).toHaveBeenCalledWith('1')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockOcupacion
    })
  })

  test('getOcupacion maneja cuando no se encuentra la ocupación', async () => {
    OcupacionModel.getOcupacion = jest.fn().mockResolvedValue([])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await OcupacionController.getOcupacion(req, res)

    expect(OcupacionModel.getOcupacion).toHaveBeenCalledWith('1')
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontró ninguna ocupación con el ID 1'
    })
  })

  // CREATE
  test('create crea una nueva ocupación correctamente', async () => {
    OcupacionModel.create = jest.fn().mockResolvedValue(mockOcupacion)

    const req = { body: mockOcupacion }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await OcupacionController.create(req, res)

    expect(OcupacionModel.create).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockOcupacion
    })
  })

  test('create maneja error de validación', async () => {
    const req = { body: { LoteID: '123e4567-e89b-12d3-a456-426655440000' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await OcupacionController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 400,
      body: mockBadValidatorPost.body
    })
  })

  // UPDATE
  test('update actualiza correctamente una ocupación', async () => {
    const validPartialOcupacion = { ...mockUpdatedOcupacion }
    OcupacionModel.update = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    const req = { params: { id: '1' }, body: validPartialOcupacion }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await OcupacionController.update(req, res)

    expect(OcupacionModel.update).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: { affectedRows: 1 }
    })
  })

  test('update maneja el caso cuando no se encuentra la ocupación para actualizar', async () => {
    const validPartialOcupacion = { ...mockUpdatedOcupacion }
    OcupacionModel.update = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    const req = { params: { id: '1' }, body: validPartialOcupacion }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await OcupacionController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontro ninguna ocupación con el ID 1 para actualizar'
    })
  })

  // DELETE
  test('delete elimina correctamente una ocupación', async () => {
    OcupacionModel.delete = jest.fn().mockResolvedValue([mockDeleteResult])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await OcupacionController.delete(req, res)

    expect(OcupacionModel.delete).toHaveBeenCalledWith('1')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockDeleteResult
    })
  })

  test('delete maneja excepciones cuando no se encuentra la ocupación para eliminar', async () => {
    OcupacionModel.delete = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await OcupacionController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontro ninguna ocupación con el ID 1 para eliminar'
    })
  })
})
