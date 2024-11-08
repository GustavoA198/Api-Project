/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { AlimentoController } from '../../controllers/alimento.controller.js'
import { AlimentoModel } from '../../models/alimento.model.js'

// Mocks de respuesta
const mockAlimentos = [
  { Descripcion: 'Manzana', Fecha: '2024-10-31', ID: '1', Nombre: 'Alimento 1' },
  { Descripcion: 'Pera', Fecha: '2024-11-01', ID: '2', Nombre: 'Alimento 2' }
]
const mockAlimento = { Descripcion: 'Manzana', Fecha: '2024-10-31', ID: '1', Nombre: 'Alimento 1' }
const mockAlimentoPost = { Descripcion: 'Manzana', Nombre: 'nombre', ID: '1', Tipo: 'tipo1' }

const mockBadValidatorPost = {
  body: [
    {
      code: 'invalid_type',
      expected: 'string',
      message: 'Required',
      path: ['Nombre'],
      received: 'undefined'
    },
    {
      code: 'invalid_type',
      expected: 'string',
      message: 'Required',
      path: ['Tipo'],
      received: 'undefined'
    }
  ],
  error: true,
  status: 400
}

// Mock del modelo AlimentoModel
jest.mock('../../models/alimento.model.js')
jest.mock('../../schemas/alimento.schema.js')

describe('Test del controlador de alimento', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // GETALL
  test('getAll retorna una lista de alimentos', async () => {
    AlimentoModel.getAlimentos = jest.fn().mockResolvedValue([mockAlimentos])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await AlimentoController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(AlimentoModel.getAlimentos).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockAlimentos
    })
  })

  test('getAll retorna un error cuando no hay alimentos', async () => {
    const errorMessage = 'Error al obtener alimentos'
    AlimentoModel.getAlimentos = jest.fn().mockResolvedValue(new Error(errorMessage))

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await AlimentoController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledTimes(1)
    expect(AlimentoModel.getAlimentos).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: expect.any(String)
    })
  })

  // GET
  test('getAlimento retorna un alimento existente', async () => {
    AlimentoModel.getAlimentoById = jest.fn().mockResolvedValue([mockAlimento])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await AlimentoController.getAlimento(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockAlimento
    })
  })

  test('getAlimento retorna un error 404 si no se encuentra el alimento', async () => {
    AlimentoModel.getAlimentoById = jest.fn().mockResolvedValue([null])

    const req = { params: { id: '999' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await AlimentoController.getAlimento(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: `No se encontró ningún alimento con el ID ${req.params.id}`
    })
  })

  test('getAlimento maneja errores inesperados', async () => {
    const errorMessage = 'Error al obtener el alimento'
    AlimentoModel.getAlimentoById = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await AlimentoController.getAlimento(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: expect.any(String)
    })
  })

  // POST
  test('create agrega un nuevo alimento exitosamente', async () => {
    const req = {
      body: mockAlimentoPost
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    AlimentoModel.createAlimento = jest.fn().mockResolvedValue(mockAlimentoPost)

    await AlimentoController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockAlimentoPost
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

    await AlimentoController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith(mockBadValidatorPost)
  })

  test('create maneja errores inesperados', async () => {
    const req = {
      body: mockAlimento
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    const errorMessage = 'Error al agregar el alimento'
    AlimentoModel.createAlimento = jest.fn().mockRejectedValue(new Error(errorMessage))

    await AlimentoController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 400,
      body: [
        {
          code: 'invalid_type',
          expected: 'string',
          message: 'Required',
          path: ['Tipo'],
          received: 'undefined'
        }
      ]
    })
  })

  // DELETE
  test('delete elimina un alimento existente exitosamente', async () => {
    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    AlimentoModel.deleteAlimento = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    await AlimentoController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(AlimentoModel.deleteAlimento).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: `Alimento con el ID ${req.params.id} eliminado correctamente`
    })
  })

  test('delete retorna error 404 si el alimento no existe', async () => {
    const req = { params: { id: '999' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    AlimentoModel.deleteAlimento = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    await AlimentoController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(AlimentoModel.deleteAlimento).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: `No se encontro ningún alimento con el ID ${req.params.id} para eliminar`
    })
  })

  test('delete maneja errores inesperados con status 500', async () => {
    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    AlimentoModel.deleteAlimento = jest.fn().mockRejectedValue(new Error('Error inesperado'))

    await AlimentoController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(AlimentoModel.deleteAlimento).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: expect.any(String)
    })
  })

  // UPDATE
  test('update actualiza un alimento existente exitosamente', async () => {
    const req = {
      body: mockAlimentoPost,
      params: { id: '1' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    AlimentoModel.updateAlimento = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    await AlimentoController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(AlimentoModel.updateAlimento).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: {affectedRows: 1}
    })
  })

  test('update retorna error 404 si el alimento no existe', async () => {
    const req = {
      body: mockAlimentoPost,
      params: { id: '999' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    AlimentoModel.updateAlimento = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    await AlimentoController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(AlimentoModel.updateAlimento).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: `No se encontro ningún alimento con el ID ${req.params.id} para actualizar`
    })
  })
})
