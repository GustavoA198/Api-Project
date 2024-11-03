/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { FincaModel } from '../../models/finca.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')

describe('FincaModel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getAll obtiene todos los registros de finca', async () => {
    const mockData = [{ ID: 1, Nombre: 'Finca1', Direccion: 'Direccion1', Observaciones: 'Ninguna' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await FincaModel.getAll()

    expect(database.query).toHaveBeenCalledWith(expect.any(String))
    expect(result).toEqual(mockData)
  })

  test('getFinca obtiene un registro de finca por ID', async () => {
    const mockData = [{ ID: 1, Nombre: 'Finca1', Direccion: 'Direccion1', Observaciones: 'Ninguna' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await FincaModel.getFinca(1)

    expect(database.query).toHaveBeenCalledWith(expect.any(String), [1])
    expect(result).toEqual(mockData)
  })

  test('create agrega un nuevo registro de finca', async () => {
    const mockData = { Nombre: 'Finca1', Direccion: 'Direccion1', Observaciones: 'Ninguna' }
    const insertResult = { affectedRows: 1 }
    database.query.mockResolvedValueOnce([[{ id: 'some-uuid' }]])
    database.query.mockResolvedValueOnce(insertResult)

    const result = await FincaModel.create(mockData)

    expect(database.query).toHaveBeenCalledTimes(2)
    expect(result).toEqual(insertResult)
  })

  test('update actualiza un registro de finca existente', async () => {
    const mockData = { Nombre: 'Finca1 Actualizada' }
    const updateResult = { affectedRows: 1 }
    database.query.mockResolvedValue(updateResult)

    const result = await FincaModel.update(1, mockData)

    expect(database.query).toHaveBeenCalled()
    expect(result).toEqual(updateResult)
  })

  test('delete elimina un registro de finca por ID', async () => {
    const mockData = { affectedRows: 1 }
    database.query.mockResolvedValue(mockData)

    const result = await FincaModel.delete(1)

    expect(database.query).toHaveBeenCalledWith(expect.any(String), [1])
    expect(result).toEqual(mockData)
  })
})
