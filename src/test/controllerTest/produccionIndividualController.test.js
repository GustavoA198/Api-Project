/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { ProduccionIndividualController } from '../../controllers/produccionIndividual.controller.js'
import { ProduccionIndividualModel } from '../../models/produccionIndividual.model.js'

jest.mock('../../models/produccionIndividual.model.js')

const mockProduccionIndividual = { Fecha: '2024-11-01', Tipo: 'Leche', Cantidad: 10, ResID: ['123e4567-e89b-12d3-a456-426655440000'] }

describe('ProduccionIndividualController', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // GET ALL
  test('getAll devuelve todos los registros de ProduccionIndividual correctamente', async () => {
    ProduccionIndividualModel.getProduccionIndividuals = jest.fn().mockResolvedValue([mockProduccionIndividual])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProduccionIndividualController.getAll(req, res)

    expect(ProduccionIndividualModel.getProduccionIndividuals).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockProduccionIndividual
    })
  })

  test('getAll maneja errores', async () => {
    const errorMessage = 'Error al obtener registros'
    ProduccionIndividualModel.getProduccionIndividuals = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProduccionIndividualController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })

  // GET ProduccionIndividual
  test('getProduccionIndividual devuelve un registro de ProduccionIndividual correctamente', async () => {
    ProduccionIndividualModel.getProduccionIndividualById = jest.fn().mockResolvedValue([mockProduccionIndividual])

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProduccionIndividualController.getProduccionIndividual(req, res)

    expect(ProduccionIndividualModel.getProduccionIndividualById).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockProduccionIndividual
    })
  })

  test('getProduccionIndividual maneja errores', async () => {
    const errorMessage = 'Error al obtener registro'
    ProduccionIndividualModel.getProduccionIndividualById = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProduccionIndividualController.getProduccionIndividual(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })

  test('getProduccionIndividual maneja registros no encontrados', async () => {
    ProduccionIndividualModel.getProduccionIndividualById = jest.fn().mockResolvedValue([])

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProduccionIndividualController.getProduccionIndividual(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontró ninguna produccion individual con el ID 1'
    })
  })

  // CREATE
  test('create crea un registro de ProduccionIndividual correctamente', async () => {
    ProduccionIndividualModel.createProduccionIndividual = jest.fn().mockResolvedValue(mockProduccionIndividual)

    const req = { body: mockProduccionIndividual }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProduccionIndividualController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(ProduccionIndividualModel.createProduccionIndividual).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: [mockProduccionIndividual]
    })
  })

  test('create maneja errores', async () => {
    const errorMessage = 'Error al crear registro'
    ProduccionIndividualModel.createProduccionIndividual = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = { body: mockProduccionIndividual }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProduccionIndividualController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })

  test('create maneja errores de validación', async () => {
    const errorMessage = [
      {
        code: 'too_big',
        exact: false,
        inclusive: true,
        maximum: 999.99,
        message: 'Number must be less than or equal to 999.99',
        path: ['Cantidad'],
        type: 'number'
      }
    ]
    ProduccionIndividualModel.createProduccionIndividual = jest.fn().mockResolvedValue(mockProduccionIndividual)

    const req = { body: { ...mockProduccionIndividual, Cantidad: 1000 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProduccionIndividualController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 400,
      body: errorMessage
    })
  })

  // UPDATE
  test('update actualiza un registro de ProduccionIndividual correctamente', async () => {
    ProduccionIndividualModel.updateProduccionIndividual = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    const req = { params: { id: 1 }, body: mockProduccionIndividual }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProduccionIndividualController.update(req, res)

    expect(ProduccionIndividualModel.updateProduccionIndividual).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: { affectedRows: 1 }
    })
  })

  test('update maneja errores', async () => {
    const errorMessage = 'Error al actualizar registro'
    ProduccionIndividualModel.updateProduccionIndividual = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = { params: { id: 1 }, body: mockProduccionIndividual }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProduccionIndividualController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })

  test('update maneja registros no encontrados', async () => {
    ProduccionIndividualModel.updateProduccionIndividual = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    const req = { params: { id: 1 }, body: mockProduccionIndividual }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProduccionIndividualController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontro ninguna produccion individual con el ID 1 para actualizar'
    })
  })

  test('update maneja errores de validación', async () => {
    const errorMessage = [
      {
        code: 'too_big',
        exact: false,
        inclusive: true,
        maximum: 999.99,
        message: 'Number must be less than or equal to 999.99',
        path: ['Cantidad'],
        type: 'number'
      }
    ]

    ProduccionIndividualModel.updateProduccionIndividual = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    const req = { params: { id: 1 }, body: { ...mockProduccionIndividual, Cantidad: 1000 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProduccionIndividualController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 400,
      body: errorMessage
    })
  })

  // DELETE
  test('delete elimina un registro de ProduccionIndividual correctamente', async () => {
    ProduccionIndividualModel.deleteProduccionIndividual = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProduccionIndividualController.delete(req, res)

    expect(ProduccionIndividualModel.deleteProduccionIndividual).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: { affectedRows: 1 }
    })
  })

  test('delete maneja errores', async () => {
    const errorMessage = 'Error al eliminar registro'
    ProduccionIndividualModel.deleteProduccionIndividual = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProduccionIndividualController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })

  test('delete maneja registros no encontrados', async () => {
    ProduccionIndividualModel.deleteProduccionIndividual = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ProduccionIndividualController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontro ninguna produccion individual con el ID 1 para eliminar'
    })
  })
})
