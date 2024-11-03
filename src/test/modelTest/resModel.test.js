/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { ResModel } from '../../models/res.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')

describe('ResModel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getAll obtiene todos los registros activos', async () => {
    const mockData = [{ ID: 1, Nombre: 'Res1', Estado: 'Activa' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await ResModel.getAll()

    expect(database.query).toHaveBeenCalledWith(expect.any(String))
    expect(result).toEqual(mockData)
  })

  test('getRes obtiene un registro por ID', async () => {
    const mockData = [{ ID: 1, Nombre: 'Res1', Estado: 'Activa' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await ResModel.getRes(1)

    expect(database.query).toHaveBeenCalledWith(expect.any(String), [1])
    expect(result).toEqual(mockData)
  })

  test('getHijos obtiene hijos de un registro', async () => {
    const mockData = [{ ID: 2, Madre: 1 }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await ResModel.getHijos(1)

    expect(database.query).toHaveBeenCalledWith(expect.any(String), [1, 1])
    expect(result).toEqual(mockData)
  })

  test('create agrega un nuevo registro', async () => {
    const mockData = { Numero: 1, Nombre: 'Res1', Estado: 'Activa' }
    const insertResult = { affectedRows: 1 }
    database.query.mockResolvedValueOnce([[{ id: 'some-uuid' }]])
    database.query.mockResolvedValueOnce(insertResult)

    const result = await ResModel.create(mockData)

    expect(database.query).toHaveBeenCalledTimes(2)
    expect(result).toEqual(insertResult)
  })

  test('update actualiza un registro existente', async () => {
    const mockData = { Nombre: 'Res1 Actualizado' }
    const updateResult = { affectedRows: 1 }
    database.query.mockResolvedValue(updateResult)

    const result = await ResModel.update(1, mockData)

    expect(database.query).toHaveBeenCalled()
    expect(result).toEqual(updateResult)
  })

  test('delete elimina un registro cambiando su estado', async () => {
    const mockData = { affectedRows: 1 }
    database.query.mockResolvedValue(mockData)

    const result = await ResModel.delete(1)

    expect(database.query).toHaveBeenCalledWith(expect.any(String), ['Muerte', 1])
    expect(result).toEqual(mockData)
  })
})
