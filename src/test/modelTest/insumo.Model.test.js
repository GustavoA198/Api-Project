/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { InsumoModel } from '../../models/insumo.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')

describe('InsumoModel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getAll obtiene todos los insumos', async () => {
    const mockData = [{ ID: '1', Nombre: 'Insumo1', CantidadActual: 100 }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await InsumoModel.getAll()

    expect(database.query).toHaveBeenCalledWith(expect.any(String))
    expect(result).toEqual(mockData)
  })

  test('getInsumo obtiene un insumo por ID', async () => {
    const mockData = [{ ID: '1', Nombre: 'Insumo1', CantidadActual: 100 }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await InsumoModel.getInsumo('1')

    expect(database.query).toHaveBeenCalledWith(expect.any(String), ['1'])
    expect(result).toEqual(mockData)
  })

  test('create agrega un nuevo insumo', async () => {
    const mockData = { Nombre: 'Insumo1', FechaIngreso: '2024-01-01', CantidadActual: 100, FechaVencimiento: '2025-01-01', Observaciones: 'Ninguna' }
    const insertResult = { affectedRows: 1 }
    database.query.mockResolvedValueOnce([[{ id: 'some-uuid' }]])
    database.query.mockResolvedValueOnce(insertResult)

    const result = await InsumoModel.create(mockData)

    expect(database.query).toHaveBeenCalledTimes(2)
    expect(result).toEqual(insertResult)
  })

  test('update actualiza un insumo existente', async () => {
    const mockData = { Nombre: 'Insumo1 Actualizado' }
    const updateResult = { affectedRows: 1 }
    database.query.mockResolvedValue(updateResult)

    const result = await InsumoModel.update('1', mockData)

    expect(database.query).toHaveBeenCalled()
    expect(result).toEqual(updateResult)
  })

  test('delete elimina un insumo por ID', async () => {
    const mockData = { affectedRows: 1 }
    database.query.mockResolvedValue(mockData)

    const result = await InsumoModel.delete('1')

    expect(database.query).toHaveBeenCalledWith(expect.any(String), ['1'])
    expect(result).toEqual(mockData)
  })
})
