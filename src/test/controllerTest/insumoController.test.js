/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { InsumoController } from '../../controllers/insumo.controller.js'
import { InsumoModel } from '../../models/insumo.model.js'

// Mock del modelo y validaciones
jest.mock('../../models/insumo.model.js')
jest.mock('../../schemas/insumo.schema.js')

describe('Test del controlador de Insumo', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // Test para el método getAll
  test('getAll retorna una lista de insumos', async () => {
    const mockInsumos = [
      { id: '1', Nombre: 'Insumo 1', FechaIngreso: '2023-01-01' },
      { id: '2', Nombre: 'Insumo 2', FechaIngreso: '2023-02-01' }
    ]
    InsumoModel.getAll = jest.fn().mockResolvedValue([mockInsumos])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InsumoController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockInsumos
    })
  })

  // Test para el método getInsumo
  test('getInsumo retorna un insumo específico por ID', async () => {
    const mockInsumo = { id: '1', Nombre: 'Insumo 1', FechaIngreso: '2023-01-01' }
    InsumoModel.getInsumo = jest.fn().mockResolvedValue([[mockInsumo]])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InsumoController.getInsumo(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockInsumo
    })
  })

  test('getInsumo retorna un error 404 si no se encuentra el insumo', async () => {
    InsumoModel.getInsumo = jest.fn().mockResolvedValue([[null]])

    const req = { params: { id: '999' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InsumoController.getInsumo(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontró ningún insumo con el ID 999'
    })
  })

  // Test para el método create
  test('create crea un insumo correctamente', async () => {
    InsumoModel.create = jest.fn().mockResolvedValue({ insertId: '3' })

    const req = { body: { Nombre: 'Nuevo Insumo', FechaIngreso: '2023-03-01', UnidadMedida: 'cm2' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InsumoController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: { insertId: '3' }
    })
  })

  test('create retorna un error 400 si la validación falla', async () => {
    const validationError = [
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
        path: ['UnidadMedida'],
        received: 'undefined'
      }
    ]
    const req = { body: { FechaIngreso: '2023-03-01' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InsumoController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 400,
      body: validationError
    })
  })

  // Test para el método update
  test('update actualiza un insumo correctamente', async () => {
    InsumoModel.update = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    const req = { params: { id: '1' }, body: { Nombre: 'Insumo Actualizado' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InsumoController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: { affectedRows: 1 }
    })
  })

  test('update retorna un error 404 si no se encuentra el insumo para actualizar', async () => {
    InsumoModel.update = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    const req = { params: { id: '999' }, body: { Nombre: 'Insumo Actualizado' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InsumoController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontro ningún insumo con el ID 999 para actualizar'
    })
  })

  // Test para el método delete
  test('delete elimina un insumo correctamente', async () => {
    InsumoModel.delete = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    const req = { params: { id: '1' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InsumoController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: { affectedRows: 1 }
    })
  })

  test('delete retorna un error 404 si no se encuentra el insumo para eliminar', async () => {
    InsumoModel.delete = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    const req = { params: { id: '999' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InsumoController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontro ningún insumo con el ID 999 para eliminar'
    })
  })
})
