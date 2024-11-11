/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { InsumoController } from '../../controllers/insumoServicio.controller.js'
import { InsumosServicioModel } from '../../models/insumoServicio.model.js'

// Mock de modelos y validaciones
jest.mock('../../models/insumoServicio.model.js')
jest.mock('../../schemas/insumoServicio.schema.js')

describe('Test del controlador de InsumoController', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // Test para el método getAll
  test('getAll debe devolver una lista de insumos', async () => {
    const mockInsumos = [{ id: 1, nombre: 'Insumo 1' }, { id: 2, nombre: 'Insumo 2' }]
    InsumosServicioModel.getAll = jest.fn().mockResolvedValue([mockInsumos])

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

  // Test para el método getInsumoInsumoServicioById
  test('getInsumoInsumoServicioById debe devolver un insumo específico por ID', async () => {
    const mockInsumo = { id: 1, nombre: 'Insumo 1' }
    InsumosServicioModel.getInsumosServicioById = jest.fn().mockResolvedValue([[mockInsumo]])

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InsumoController.getInsumoInsumoServicioById(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: [mockInsumo]
    })
  })

  test('getInsumoInsumoServicioById debe devolver un error 204 si el insumo no se encuentra', async () => {
    InsumosServicioModel.getInsumosServicioById = jest.fn().mockResolvedValue([[]])

    const req = { params: { id: 999 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InsumoController.getInsumoInsumoServicioById(req, res)

    expect(res.status).toHaveBeenCalledWith(204)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 204,
      body: 'No se encontró ningún insumo con el ID 999'
    })
  })

  // Test para el método update
  test('update actualiza un insumo correctamente', async () => {
    const req = {
      params: { id: 1 },
      body: [{
        InsumoID: '123e4567-e89b-12d3-a456-426655440000',
        ServicioID: '123e4567-e89b-12d3-a456-426655440000',
        Cantidad: 200
      }]
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    InsumosServicioModel.update = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    await InsumoController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: [{ affectedRows: 1 }]
    })
  })

  test('update no encuentra el indumoServicio para actualizar', async () => {
    const req = {
      params: { id: null },
      body: [{
        InsumoID: '123e4567-e89b-12d3-a456-426655440000',
        ServicioID: '123e4567-e89b-12d3-a456-426655440000',
        Cantidad: 200
      }]
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    InsumosServicioModel.update = jest.fn().mockResolvedValue(false)

    await InsumoController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(204)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 204,
      body: `No se encontro ningún insumo con el ID ${req.params.id} para actualizar`
    })
  })

  test('update debe devolver un error 400 si el insumo no es válido', async () => {
    const req = {
      params: { id: 1 },
      body: [{
        InsumoID: '123e4567-e89b-12d3-a456-426655440000',
        Cantidad: 200
      }]
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InsumoController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 400,
      body: [
        {
          code: 'invalid_type',
          expected: 'string',
          message: 'Required',
          path: [0, 'ServicioID'],
          received: 'undefined'
        }
      ]
    })
  })

  // Test para el método delete
  test('delete debe eliminar un insumo con datos válidos', async () => {
    InsumosServicioModel.delete = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    const req = { params: { id: 1 },
      body: {
        InsumoID: '123e4567-e89b-12d3-a456-426655440000',
        ServicioID: '123e4567-e89b-12d3-a456-426655440000'
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InsumoController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: [{ affectedRows: 1 }]
    })
  })

  test('delete debe devolver un error 204 si el insumo no se encuentra', async () => {
    InsumosServicioModel.delete = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    const req = { params: { id: 999 }, body: { id: 999, InsumoID: '123e4567-e89b-12d3-a456-426655440000' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InsumoController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 400,
      body: [
        {
          code: 'invalid_type',
          expected: 'string',
          message: 'Required',
          path: ['ServicioID'],
          received: 'undefined'
        }
      ]
    })
  })

  // test para getInsumoInsumoServicioByIdServicio
  test('getInsumoInsumoServicioByIdServicio debe devolver un insumo específico por ID', async () => {
    const mockInsumo = { id: 1, nombre: 'Insumo 1' }
    InsumosServicioModel.getInsumosServicioByIdServicio = jest.fn().mockResolvedValue([[mockInsumo]])

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InsumoController.getInsumoInsumoServicioByIdServicio(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: [mockInsumo]
    })
  })

  test('getInsumoInsumoServicioByIdServicio debe devolver un error 204 si el insumo no se encuentra', async () => {
    InsumosServicioModel.getInsumosServicioByIdServicio = jest.fn().mockResolvedValue([[]])

    const req = { params: { id: 999 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InsumoController.getInsumoInsumoServicioByIdServicio(req, res)

    expect(res.status).toHaveBeenCalledWith(204)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 204,
      body: 'No se encontró ningún insumo con el ID 999'
    })
  })

  test('getInsumoInsumoServicioByIdServicio debe devolver un error 500 si hay un error', async () => {
    InsumosServicioModel.getInsumosServicioByIdServicio = jest.fn().mockRejectedValue(new Error('Error'))

    const req = { params: { id: 999 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await InsumoController.getInsumoInsumoServicioByIdServicio(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: 'Error'
    })
  })
})
