/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { MontaController } from '../../controllers/monta.controller.js'
import { MontaModel } from '../../models/monta.model.js'

// Mocks de respuesta
const mockMontas = [
  { ID: 1, Nombre: 'Monta 1', FechaParto: '2024-11-01' },
  { ID: 2, Nombre: 'Monta 2', FechaParto: '2024-12-15' }
]
const mockMonta = { ID: 1, Nombre: 'Monta 1', FechaParto: '2024-11-01' }
const mockMontaPost = {
  ServicioID: '123e4567-e89b-12d3-a456-426655440000',
  ToroID: '123e4567-e89b-12d3-a456-426655440000'
}

// Mock del modelo y validaciones
jest.mock('../../models/monta.model.js')

describe('Test del controlador de MontaController', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // GETALL
  test('getAll retorna una lista de montas', async () => {
    MontaModel.getMontas = jest.fn().mockResolvedValue([mockMontas])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await MontaController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(MontaModel.getMontas).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockMontas
    })
  })

  test('getAll maneja errores de la base de datos', async () => {
    const errorMessage = 'Error de base de datos'
    MontaModel.getMontas = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await MontaController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })

  // GET BY ID
  test('getMonta retorna una monta por ID', async () => {
    MontaModel.getMontaById = jest.fn().mockResolvedValue([mockMonta])

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await MontaController.getMonta(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(MontaModel.getMontaById).toHaveBeenCalledWith(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockMonta
    })
  })

  test('getMonta maneja el caso cuando no se encuentra una monta por ID', async () => {
    MontaModel.getMontaById = jest.fn().mockResolvedValue([])

    const req = { params: { id: 999 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await MontaController.getMonta(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: `No se encontró ninguna monta con el ID 999`
    })
  })

  // CREATE
  test('create agrega una nueva monta exitosamente', async () => {
    MontaModel.createMonta = jest.fn().mockResolvedValue(mockMontaPost)

    const req = { body: mockMontaPost }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await MontaController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(MontaModel.createMonta).toHaveBeenCalledWith(mockMontaPost)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockMontaPost
    })
  })

  test('create maneja errores de validación', async () => {
    const req = { body:
    {
      ServicioID: '123e4567-e89b-12d3-a456-426655440000',
      ToroID: 3
    }
    }
  // Cuerpo inválido para desencadenar error de validación
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await MontaController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 400,
      body: [
        {
          code: 'invalid_type',
          expected: 'string',
          message: 'Expected string, received number',
          path: ['ToroID'],
          received: 'number'
        }
      ]
    })
  })

  // UPDATE
  test('update actualiza una monta por ID', async () => {
    MontaModel.updateMonta = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    const req = { params: { id: 1 }, body: { Nombre: 'Monta Actualizada' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await MontaController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(MontaModel.updateMonta).toHaveBeenCalledWith(1, {})
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: { affectedRows: 1 }
    })
  })

  test('update maneja el caso cuando no se encuentra una monta para actualizar', async () => {
    MontaModel.updateMonta = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    const req = { params: { id: 999 }, body: { Nombre: 'Monta Inexistente' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await MontaController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: `No se encontro ninguna monta con el ID 999 para actualizar`
    })
  })

  // DELETE
  test('delete elimina una monta por ID', async () => {
    MontaModel.deleteMonta = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await MontaController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(MontaModel.deleteMonta).toHaveBeenCalledWith(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: `Monta con el ID 1 borrada`
    })
  })

  test('delete maneja el caso cuando no se encuentra una monta para eliminar', async () => {
    MontaModel.deleteMonta = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    const req = { params: { id: 999 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await MontaController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: `No se encontro ninguna monta con el ID 999 para borrar`
    })
  })
})
