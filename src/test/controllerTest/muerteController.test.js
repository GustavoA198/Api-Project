/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { MuerteController } from '../../controllers/muerte.controller.js'
import { MuerteModel } from '../../models/muerte.model.js'
import { ResModel } from '../../models/res.model.js'

// Mocks de respuesta
const mockMuertes = [
  { ID: 1, Fecha: '2024-11-01', Causa: 'Enfermedad' },
  { ID: 2, Fecha: '2024-11-10', Causa: 'Accidente' }
]
const mockMuerte = { ID: 1, Fecha: '2024-11-01', Causa: 'Enfermedad' }
const mockUpdateData = { Fecha: '2024-11-11', Causa: 'Nuevo accidente' }
const mockMuertePost = {
  Fecha: '2024-11-01',
  Causa: 'Enfermedad',
  ResID: '123e4567-e89b-12d3-a456-426655440000'
}

// Mock del modelo y validaciones
jest.mock('../../models/muerte.model.js')
jest.mock('../../models/res.model.js')

describe('Test del controlador de MuerteController', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // GETALL
  test('getAll retorna una lista de muertes', async () => {
    MuerteModel.getMuertes = jest.fn().mockResolvedValue([mockMuertes])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await MuerteController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(MuerteModel.getMuertes).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockMuertes
    })
  })

  test('getAll maneja errores de la base de datos', async () => {
    const errorMessage = 'Error de base de datos'
    MuerteModel.getMuertes = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await MuerteController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })

  // GET BY ID
  test('getMuerte retorna una muerte por ID', async () => {
    MuerteModel.getMuerteById = jest.fn().mockResolvedValue([mockMuerte])

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await MuerteController.getMuerte(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(MuerteModel.getMuerteById).toHaveBeenCalledTimes(1)
    expect(MuerteModel.getMuerteById).toHaveBeenCalledWith(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockMuerte
    })
  })

  test('getMuerte maneja cuando no se encuentra la muerte por ID', async () => {
    MuerteModel.getMuerteById = jest.fn().mockResolvedValue([])

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await MuerteController.getMuerte(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: `No se encontró ninguna muerte con el ID 1`
    })
  })

  // CREATE
  test('create añade una nueva muerte y elimina la res asociada', async () => {
    const mockUpdateResult = { affectedRows: 1 }
    ResModel.delete = jest.fn().mockResolvedValue([mockUpdateResult])
    MuerteModel.createMuerte = jest.fn().mockResolvedValue([mockMuerte])

    const req = { body: mockMuertePost }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await MuerteController.create(req, res)

    expect(ResModel.delete).toHaveBeenCalledWith(mockMuertePost.ResID)
    expect(MuerteModel.createMuerte).toHaveBeenCalledWith(mockMuertePost)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockMuerte
    })
  })

  test('create maneja errores de validación', async () => {
    const req = { body: {} }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await MuerteController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledTimes(1)
    // Aquí puedes personalizar más la comprobación del error de validación si es necesario
  })

   // UPDATE
  test('update actualiza una muerte correctamente', async () => {
    const mockUpdateResult = { affectedRows: 1 }
    MuerteModel.updateMuerte = jest.fn().mockResolvedValue([mockUpdateResult])

    const req = {
      params: { id: 1 },
      body: mockUpdateData
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await MuerteController.update(req, res)

    expect(MuerteModel.updateMuerte).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockUpdateResult
    })
  })

  test('update maneja cuando no se encuentra la muerte para actualizar', async () => {
    const mockUpdateResult = { affectedRows: 0 }
    MuerteModel.updateMuerte = jest.fn().mockResolvedValue([mockUpdateResult])

    const req = {
      params: { id: 1 },
      body: mockUpdateData
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await MuerteController.update(req, res)

    expect(MuerteModel.updateMuerte).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: `No se encontro ninguna muerte con el ID 1 para actualizar`
    })
  })

  test('update maneja errores de validación', async () => {
    const req = {
      params: { id: 1 },
      body: {Fecha: 12}
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await MuerteController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 400,
      body: [
        {
          code: 'invalid_type',
          expected: 'string',
          message: 'Expected string, received number',
          path: ['Fecha'],
          received: 'number'
        }
      ]
    })
  })

  // DELETE
  test('delete elimina una muerte correctamente', async () => {
    const mockDeleteResult = { affectedRows: 1 }
    MuerteModel.deleteMuerte = jest.fn().mockResolvedValue([mockDeleteResult])

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await MuerteController.delete(req, res)

    expect(MuerteModel.deleteMuerte).toHaveBeenCalledWith(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: `Muerte con el ID 1 eliminada`
    })
  })

  test('delete maneja cuando no se encuentra la muerte para eliminar', async () => {
    const mockDeleteResult = { affectedRows: 0 }
    MuerteModel.deleteMuerte = jest.fn().mockResolvedValue([mockDeleteResult])

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await MuerteController.delete(req, res)

    expect(MuerteModel.deleteMuerte).toHaveBeenCalledWith(1)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: `No se encontro ninguna muerte con el ID 1 para eliminar`
    })
  })

  test('delete maneja errores de base de datos', async () => {
    const errorMessage = 'Error al eliminar de la base de datos'
    MuerteModel.deleteMuerte = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await MuerteController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })
})
