/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { ActividadController } from '../../controllers/actividad.controller.js'
import { ActividadModel } from '../../models/actividad.model.js'

// Mocks de respuesta
const mockActividades = [
  { Descripcion: 'Descripción 1', Fecha: '2024-10-31', ID: '1', Nombre: 'Actividad 1' },
  { Descripcion: 'Descripción 2', Fecha: '2024-11-01', ID: '2', Nombre: 'Actividad 2' }
]
const mockActividad = { Descripcion: 'Descripción 1', Fecha: '2024-10-31', ID: '1', Nombre: 'Actividad 1' }
const mockActividadPost = { Descripcion: 'Descripción 1', Fecha: '2024-10-31', ID: '1', Nombre: 'Actividad 1', LoteID: '123e4567-e89b-12d3-a456-426655440000' }
/* const mockActividadUpdate = { Tipo: 'Tipo 1' } */
const mockBadValidatorPost = {
  body: [
    {
      code: 'invalid_type',
      expected: 'string',
      message: 'Required',
      path: ['Fecha'],
      received: 'undefined'
    },
    {
      code: 'invalid_type',
      expected: 'string',
      message: 'Required',
      path: ['LoteID'],
      received: 'undefined'
    }
  ],
  'error': true,
  'status': 400
}

/* const mockActividadUpdateResponse = {
  body: {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "info": "Rows matched: 1  Changed: 1  Warnings: 0",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 1
  },
  'error': false,
  'status': 200
} */

// Mock del modelo ActividadModel
jest.mock('../../models/actividad.model.js')
jest.mock('../../schemas/actividad.schema.js')

describe('Test del controlador de actividad', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // GETALL
  test('getAll retorna una lista de actividades', async () => {
    ActividadModel.getAll = jest.fn().mockResolvedValue([mockActividades])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ActividadController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(ActividadModel.getAll).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockActividades
    })
  })

  test('getAll retorna un error cuando no hay actividades', async () => {
    const errorMessage = 'Error al obtener actividades'
    ActividadModel.getAll = jest.fn().mockResolvedValue(new Error(errorMessage))

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ActividadController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(ActividadModel.getAll).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: expect.any(String)
    })
  })

  // GET
  test('getActividad retorna una actividad existente', async () => {
    ActividadModel.getActividad = jest.fn().mockResolvedValue([mockActividad])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ActividadController.getActividad(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(ActividadModel.getActividad).toHaveBeenCalledWith(req.params.id)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockActividad
    })
  })

  test('getActividad retorna un error 404 si no se encuentra la actividad', async () => {
    ActividadModel.getActividad = jest.fn().mockResolvedValue([null])

    const req = { params: { id: '999' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ActividadController.getActividad(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(ActividadModel.getActividad).toHaveBeenCalledWith(req.params.id)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: `No se encontró ninguna actividad con el ID ${req.params.id}`
    })
  })

  test('getActividad maneja errores inesperados', async () => {
    const errorMessage = 'Error al obtener la actividad'
    ActividadModel.getActividad = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ActividadController.getActividad(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(ActividadModel.getActividad).toHaveBeenCalledWith(req.params.id)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: expect.any(String)
    })
  })

  // POST
  test('create agrega una nueva actividad exitosamente', async () => {
    const req = {
      body: mockActividadPost
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    ActividadModel.create = jest.fn().mockResolvedValue(mockActividadPost)

    await ActividadController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockActividadPost
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

    await ActividadController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(ActividadModel.create).not.toHaveBeenCalled() // Asegurarse de que no se llame a create
    expect(res.send).toHaveBeenCalledWith(mockBadValidatorPost)
  })

  test('create maneja errores inesperados', async () => {
    const req = {
      body: mockActividad
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    const errorMessage = 'Error al agregar la actividad'
    ActividadModel.create = jest.fn().mockRejectedValue(new Error(errorMessage))

    await ActividadController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 400,
      body: [
        {
          code: 'invalid_type',
          expected: 'string',
          message: 'Required',
          path: ['LoteID'],
          received: 'undefined'
        }
      ]
    })
  })

  // DELETE
  test('delete elimina una actividad existente exitosamente', async () => {
    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    ActividadModel.delete = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    await ActividadController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: expect.any(Object)
    })
  })

  test('delete retorna error 404 si la actividad no existe', async () => {
    const req = { params: { id: '999' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    ActividadModel.delete = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    await ActividadController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: `No se encontro ninguna actividad con el ID ${req.params.id} para eliminar`
    })
  })

  test('delete maneja errores inesperados con status 500', async () => {
    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    ActividadModel.delete = jest.fn().mockRejectedValue(new Error('Error inesperado'))

    await ActividadController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: expect.any(String)
    })
  })

  /* // UPDATE
  test('update falla actualizando una actividad ', async () => {
    const req = {
      params: { id: '1' },
      body: mockActividadUpdate
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    ActividadModel.update = jest.fn().mockResolvedValue([mockActividadUpdateResponse])

    await ActividadController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(ActividadModel.update).toHaveBeenCalledWith(req.params.id, req.body)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 400,
      body: mockActividadUpdateResponse
    })
  }) */
})
