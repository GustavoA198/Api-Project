/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { ResController } from '../../controllers/res.controller.js'
import { ResModel } from '../../models/res.model.js'

// Mock de datos de prueba
const mockResList = [
  { id: '1', nombre: 'Res 1', ubicacion: 'Ubicación 1' },
  { id: '2', nombre: 'Res 2', ubicacion: 'Ubicación 2' }
]
const mockRes = { id: '1', nombre: 'Res 1', ubicacion: 'Ubicación 1' }
const mockCreateRes = { nombre: 'Res Nueva', Numero: 10, Sexo: 'M', FincaID: '123e4567-e89b-12d3-a456-426655440000', ubicacion: 'Ubicación Nueva' }
const mockCreateResponse = { insertId: '3' }

const mockError = {
  error: true,
  status: 400,
  body: [
    {
      code: 'invalid_type',
      expected: 'string',
      message: 'Required',
      path: ['FincaID'],
      received: 'undefined'
    }
  ]
}

// Mock de datos de prueba
const mockUpdateResponse = {
  affectedRows: 1,
  changedRows: 1
}

const mockNotFoundResponse = {
  affectedRows: 0
}

// Mock del modelo ResModel
jest.mock('../../models/res.model.js')

describe('Test del controlador de res', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // UPDATE
  test('update actualiza una res existente correctamente', async () => {
    ResModel.update = jest.fn().mockResolvedValue([mockUpdateResponse])

    const req = {
      params: { id: '1' },
      body: { Nombre: 'Res Actualizada' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ResController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockUpdateResponse
    })
  })

  test('update retorna un error 404 si no se encuentra la res', async () => {
    ResModel.update = jest.fn().mockResolvedValue([mockNotFoundResponse])

    const req = {
      params: { id: '999' },
      body: { Nombre: 'Res No Existente' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ResController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: "No se encontró ninguna 'res' con el ID 999 para actualizar"
    })
  })

  // GETALL
  test('getAll retorna una lista de reses', async () => {
    ResModel.getAll = jest.fn().mockResolvedValue([mockResList])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ResController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockResList
    })
  })

  // GETRES
  test('getRes retorna una res existente', async () => {
    ResModel.getRes = jest.fn().mockResolvedValue([[mockRes]])

    const req = {
      params: { id: '1' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ResController.getRes(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockRes
    })
  })

  test('getRes retorna un error 404 si no se encuentra la res', async () => {
    ResModel.getRes = jest.fn().mockResolvedValue([[]])

    const req = {
      params: { id: '999' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ResController.getRes(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: "No se encontró ninguna 'res' con el ID 999"
    })
  })

  // GETHIJOS
  test('getHijos retorna una lista de hijos de la res', async () => {
    const mockHijos = [{ id: '1', nombre: 'Hijo 1' }]
    ResModel.getHijos = jest.fn().mockResolvedValue([mockHijos])

    const req = {
      params: { id: '1' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ResController.getHijos(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockHijos
    })
  })

  test('getHijos retorna un 204 si no hay hijos para la res', async () => {
    ResModel.getHijos = jest.fn().mockResolvedValue([[]])

    const req = {
      params: { id: '999' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ResController.getHijos(req, res)

    expect(res.status).toHaveBeenCalledWith(204)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 204,
      body: 'No hay Contenido'
    })
  })

  // CREATE
  test('create agrega una nueva res correctamente', async () => {
    ResModel.create = jest.fn().mockResolvedValue(mockCreateResponse)

    const req = {
      body: mockCreateRes
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ResController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockCreateResponse
    })
  })

  test('create retorna un error 400 cuando la validación falla', async () => {
    ResModel.create = jest.fn().mockResolvedValue([mockError])

    const req = {
      body: {
        nombre: 'Res Nueva',
        Numero: 10,
        Sexo: 'M'
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ResController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith(mockError)
  })

  // DELETE
  test('delete elimina una res existente', async () => {
    ResModel.delete = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    const req = {
      params: { id: '1' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ResController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: { affectedRows: 1 }
    })
  })

  test('delete retorna un error 404 si no se encuentra la res', async () => {
    ResModel.delete = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    const req = {
      params: { id: '999' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ResController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: "No se encontró ninguna 'res' con el ID 999 para eliminar"
    })
  })
})
