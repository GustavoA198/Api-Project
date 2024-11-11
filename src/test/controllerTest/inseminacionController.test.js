/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { InseminacionController } from '../../controllers/inseminacion.controller.js'
import { InseminacionModel } from '../../models/inseminacion.model.js'

// Mock del modelo y validación
jest.mock('../../models/inseminacion.model.js')
jest.mock('../../schemas/inseminacion.schema.js')

describe('Test del controlador de inseminacion', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // Test para el método getAll
  test('getAll retorna una lista de inseminaciones', async () => {
    const mockInseminaciones = [
      { id: '1', tipo: 'Natural', resID: '123' },
      { id: '2', tipo: 'Artificial', resID: '456' }
    ]
    InseminacionModel.getInseminaciones = jest.fn().mockResolvedValue([mockInseminaciones])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InseminacionController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockInseminaciones
    })
  })

  test('getAll retorna un error 500 si falla el modelo', async () => {
    InseminacionModel.getInseminaciones = jest.fn().mockRejectedValue(new Error('Error del modelo'))

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InseminacionController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: 'Error del modelo'
    })
  })

  // Test para el método getInseminacion
  test('getInseminacion retorna una inseminacion', async () => {
    const mockInseminacion = { id: '1', tipo: 'Natural', resID: '123' }
    InseminacionModel.getInseminacionById = jest.fn().mockResolvedValue([mockInseminacion])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InseminacionController.getInseminacion(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockInseminacion
    })
  })

  test('getInseminacion retorna un error 404 si no se encuentra la inseminacion', async () => {
    InseminacionModel.getInseminacionById = jest.fn().mockResolvedValue([[]])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InseminacionController.getInseminacion(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontró ninguna inseminacion con el ID 1'
    })
  })

  test('getInseminacion retorna un error 500 si falla el modelo', async () => {
    InseminacionModel.getInseminacionById = jest.fn().mockRejectedValue(new Error('Error del modelo'))

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InseminacionController.getInseminacion(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: 'Error del modelo'
    })
  })

  // Test para el método create
  test('create agrega una nueva inseminación correctamente', async () => {
    const mockCreateResponse = { ServicioID: '00000000-0000-0000-0000-000000000001' }

    InseminacionModel.createInseminacion = jest.fn().mockResolvedValue(mockCreateResponse)

    const req = { body: mockCreateResponse }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InseminacionController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockCreateResponse
    })
  })

  test('create retorna un error 400 si falla la validación', async () => {
    const mockInseminacionResponseError = [
      {
        'code': 'invalid_string',
        'message': 'Invalid uuid',
        'path': ['ServicioID'],
        'validation': 'uuid'
      }
    ]
    const mockCreateResponse = { ServicioID: '00000000' }

    InseminacionModel.createInseminacion = jest.fn().mockResolvedValue(mockCreateResponse)

    const req = { body: mockCreateResponse }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InseminacionController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 400,
      body: mockInseminacionResponseError
    })
  })

  // Test para el método update
  test('update actualiza una inseminación correctamente', async () => {
    const mockUpdateResponse = { affectedRows: 1 }

    InseminacionModel.updateInseminacion = jest.fn().mockResolvedValue([mockUpdateResponse])

    const req = { params: { id: '1' }, body: { ServicioID: '00000000-0000-0000-0000-000000000001' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InseminacionController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockUpdateResponse
    })
  })

  test('update retorna un error 404 si no se encuentra la inseminación', async () => {
    const mockUpdateResponse = { affectedRows: 0 }

    InseminacionModel.updateInseminacion = jest.fn().mockResolvedValue([mockUpdateResponse])

    const req = { params: { id: '1' }, body: { ServicioID: '00000000-0000-0000-0000-000000000001' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InseminacionController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontro ninguna inseminacion con el ID 1 para actualizar'
    })
  })

  test('update retorna un error 400 si falla la validación', async () => {
    const mockInseminacionResponseError = [
      {
        'code': 'invalid_string',
        'message': 'Invalid uuid',
        'path': ['ServicioID'],
        'validation': 'uuid'
      }
    ]

    InseminacionModel.updateInseminacion = jest.fn().mockResolvedValue([])

    const req = { params: { id: '1' }, body: { ServicioID: '00000000' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InseminacionController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 400,
      body: mockInseminacionResponseError
    })
  })

  // Test para el método delete
  test('delete elimina una inseminación correctamente', async () => {
    const mockDeleteResponse = { affectedRows: 1 }

    InseminacionModel.deleteInseminacion = jest.fn().mockResolvedValue([mockDeleteResponse])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InseminacionController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockDeleteResponse
    })
  })

  test('delete retorna un error 404 si no se encuentra la inseminación', async () => {
    const mockDeleteResponse = { affectedRows: 0 }

    InseminacionModel.deleteInseminacion = jest.fn().mockResolvedValue([mockDeleteResponse])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InseminacionController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontro ninguna inseminacion con el ID 1 para borrar'
    })
  })
})
