/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { FincaController } from '../../controllers/finca.controller.js'
import { FincaModel } from '../../models/finca.model.js'

// Mock de datos de prueba
const mockFincas = [
  { id: '1', nombre: 'Finca 1', ubicacion: 'Ubicación 1' },
  { id: '2', nombre: 'Finca 2', ubicacion: 'Ubicación 2' }
]
const mockFinca = { id: '1', nombre: 'Finca 1', ubicacion: 'Ubicación 1' }
const mockFincaPost = { Nombre: 'Finca Nueva', ubicacion: 'Ubicación Nueva' }
const mockError = {
  error: true,
  status: 400,
  body: [
    {
      code: 'invalid_type',
      expected: 'string',
      message: 'Required',
      path: ['Nombre'],
      received: 'undefined'
    }
  ]
}

const mockUpdateResponse = {
  affectedRows: 1,
  changedRows: 1
}

const mockNotFoundResponse = {
  affectedRows: 0
}

// Mock del modelo FincaModel
jest.mock('../../models/finca.model.js')

describe('Test del controlador de finca', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // UPDATE
  test('update actualiza una finca existente correctamente', async () => {
    FincaModel.update = jest.fn().mockResolvedValue([mockUpdateResponse])

    const req = {
      params: { id: '1' },
      body: { Nombre: 'Finca Actualizada' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await FincaController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockUpdateResponse
    })
  })

  test('update retorna un error 404 si no se encuentra la finca', async () => {
    FincaModel.update = jest.fn().mockResolvedValue([mockNotFoundResponse])

    const req = {
      params: { id: '999' },
      body: { Nombre: 'Finca No Existente' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await FincaController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontro ninguna finca con el ID 999 para actualizar'
    })
  })

  // GETALL
  test('getAll retorna una lista de fincas', async () => {
    FincaModel.getAll = jest.fn().mockResolvedValue([mockFincas])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await FincaController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockFincas
    })
  })

  test('getAll retorna un error cuando falla la consulta', async () => {
    const errorMessage = 'Error al obtener fincas'
    FincaModel.getAll = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await FincaController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: expect.any(String)
    })
  })

  // GET
  test('getFinca retorna una finca existente', async () => {
    FincaModel.getFinca = jest.fn().mockResolvedValue([[mockFinca]])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await FincaController.getFinca(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockFinca
    })
  })

  test('getFinca retorna un error 404 si no se encuentra la finca', async () => {
    FincaModel.getFinca = jest.fn().mockResolvedValue([[]])

    const req = { params: { id: '999' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await FincaController.getFinca(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: `No se encontró ninguna finca con el ID ${req.params.id}`
    })
  })

  // POST
  test('create agrega una nueva finca exitosamente', async () => {
    FincaModel.create = jest.fn().mockResolvedValue(mockFincaPost)

    const req = {
      body: mockFincaPost
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await FincaController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockFincaPost
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

    await FincaController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith(mockError)
  })

  // DELETE
  test('delete elimina una finca existente exitosamente', async () => {
    FincaModel.delete = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await FincaController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: { affectedRows: 1 }
    })
  })

  test('delete retorna error 404 si la finca no existe', async () => {
    FincaModel.delete = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    const req = { params: { id: '999' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await FincaController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: `No se encontro ninguna finca con el ID ${req.params.id} para eliminar`
    })
  })
})
