/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { UsoModel } from '../../models/uso.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')

describe('UsoModel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getAll obtiene todos los registros de uso', async () => {
    const mockData = [{ id: 1, Justificacion: 'Uso 1', Fecha: '2024-01-01', Cantidad: 10, ProductoID: 1 }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await UsoModel.getAll()

    expect(database.query).toHaveBeenCalledWith(expect.any(String))
    expect(result).toEqual(mockData)
  })

  test('getUsoById obtiene un registro por ID', async () => {
    const mockData = [{ id: 1, Justificacion: 'Uso 1', Fecha: '2024-01-01', Cantidad: 10, ProductoID: 1 }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await UsoModel.getUsoById(1)

    expect(database.query).toHaveBeenCalledWith(expect.any(String), [1])
    expect(result).toEqual(mockData)
  })

  test('create agrega un nuevo registro', async () => {
    const mockData = { Justificacion: 'Uso 1', Fecha: '2024-01-01', Cantidad: 10, ProductoID: 1 }
    const insertResult = { affectedRows: 1 }
    database.query.mockResolvedValueOnce([[{ id: 'some-uuid' }]])
    database.query.mockResolvedValueOnce(insertResult)

    const result = await UsoModel.create(mockData)

    expect(database.query).toHaveBeenCalledTimes(2)
    expect(result).toEqual(insertResult)
  })

  test('update actualiza un registro existente', async () => {
    const mockData = { Justificacion: 'Uso Actualizado' }
    const updateResult = { affectedRows: 1 }
    database.query.mockResolvedValue(updateResult)

    const result = await UsoModel.update(1, mockData)

    expect(database.query).toHaveBeenCalled()
    expect(result).toEqual(updateResult)
  })

  test('delete elimina un registro', async () => {
    const mockData = { affectedRows: 1 }
    database.query.mockResolvedValue(mockData)

    const result = await UsoModel.delete(1)

    expect(database.query).toHaveBeenCalledWith(expect.any(String), [1])
    expect(result).toEqual(mockData)
  })
})
