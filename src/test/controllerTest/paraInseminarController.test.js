/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { ParaInseminarController } from '../../controllers/paraInseminar.controller.js'
import { ParaInseminarModel } from '../../models/paraInseminar.model.js'

// Mocks de respuestas
const mockParaInseminar = { Fecha: '2024-11-01', Observaciones: 'Observación', ResID: '123e4567-e89b-12d3-a456-426655440000' }
const mockUpdatedParaInseminar = { Fecha: '2024-11-02', Observaciones: 'Nueva observación', ResID: '123e4567-e89b-12d3-a456-426655440000' }
const mockDeleteResult = { affectedRows: 1 }
const mockBadValidatorPost = {
  body: [
    {
      code: 'invalid_type',
      expected: 'string',
      message: 'Required',
      path: ['Fecha'],
      received: 'undefined'
    }
  ],
  error: true,
  status: 400
}

// Mock de las funciones del modelo y las validaciones
jest.mock('../../models/paraInseminar.model.js')

describe('Test del controlador de ParaInseminarController', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // GET ALL
  test('getAll devuelve todos los registros de ParaInseminar correctamente', async () => {
    ParaInseminarModel.getAll = jest.fn().mockResolvedValue([mockParaInseminar])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ParaInseminarController.getAll(req, res)

    expect(ParaInseminarModel.getAll).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockParaInseminar
    })
  })

  test('getAll maneja errores', async () => {
    const errorMessage = 'Error al obtener registros'
    ParaInseminarModel.getAll = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ParaInseminarController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })

  // GET ONE
  test('getParaInseminar devuelve un registro específico', async () => {
    ParaInseminarModel.getParaInseminar = jest.fn().mockResolvedValue([mockParaInseminar])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ParaInseminarController.getParaInseminar(req, res)

    expect(ParaInseminarModel.getParaInseminar).toHaveBeenCalledWith('1')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockParaInseminar
    })
  })

  test('getParaInseminar maneja cuando no se encuentra el registro', async () => {
    ParaInseminarModel.getParaInseminar = jest.fn().mockResolvedValue([])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ParaInseminarController.getParaInseminar(req, res)

    expect(ParaInseminarModel.getParaInseminar).toHaveBeenCalledWith('1')
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontró ningún registro con el ID 1'
    })
  })

  // CREATE
  test('create crea un nuevo registro de ParaInseminar correctamente', async () => {
    ParaInseminarModel.create = jest.fn().mockResolvedValue(mockParaInseminar)

    const req = { body: mockParaInseminar }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ParaInseminarController.create(req, res)

    expect(ParaInseminarModel.create).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockParaInseminar
    })
  })

  test('create maneja error de validación', async () => {
    const req = { body: { ResID: '123e4567-e89b-12d3-a456-426655440000' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ParaInseminarController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 400,
      body: mockBadValidatorPost.body
    })
  })

  // UPDATE
  test('update actualiza correctamente un registro de ParaInseminar', async () => {
    ParaInseminarModel.update = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    const req = { params: { id: '1' }, body: mockUpdatedParaInseminar }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ParaInseminarController.update(req, res)

    expect(ParaInseminarModel.update).toHaveBeenCalledWith('1')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: { affectedRows: 1 }
    })
  })

  test('update maneja el caso cuando no se encuentra el registro para actualizar', async () => {
    ParaInseminarModel.update = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    const req = { params: { id: '1' }, body: mockUpdatedParaInseminar }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ParaInseminarController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontro ningun registro con el ID 1 para actualizar'
    })
  })

  // DELETE
  test('delete elimina correctamente un registro de ParaInseminar', async () => {
    ParaInseminarModel.delete = jest.fn().mockResolvedValue([mockDeleteResult])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ParaInseminarController.delete(req, res)

    expect(ParaInseminarModel.delete).toHaveBeenCalledWith('1')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockDeleteResult
    })
  })

  test('delete maneja excepciones cuando no se encuentra el registro para eliminar', async () => {
    ParaInseminarModel.delete = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ParaInseminarController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontró ningún registro con el ID 1 para eliminar'
    })
  })

  // GET SUGERIDOS
  test('getSugeridos devuelve los registros sugeridos correctamente', async () => {
    ParaInseminarModel.getSugeridos = jest.fn().mockResolvedValue([mockParaInseminar])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ParaInseminarController.getSugeridos(req, res)

    expect(ParaInseminarModel.getSugeridos).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockParaInseminar
    })
  })

  test('getSugeridos maneja errores', async () => {
    const errorMessage = 'Error al obtener registros sugeridos'
    ParaInseminarModel.getSugeridos = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ParaInseminarController.getSugeridos(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })
})
