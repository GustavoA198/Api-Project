/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { LoteModel } from '../../models/lote.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')

describe('LoteModel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getAll obtiene todos los lotes', async () => {
    const mockData = [{ ID: 1, Nombre: 'Lote1', Numero: 123 }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await LoteModel.getAll()

    expect(database.query).toHaveBeenCalledWith('SELECT * FROM Lote')
    expect(result).toEqual(mockData)
  })

  test('getLote obtiene lote por ID', async () => {
    const mockData = [{ ID: 1, Nombre: 'Lote1', Numero: 123 }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await LoteModel.getLote(1)

    expect(database.query).toHaveBeenCalledWith('SELECT * FROM Lote WHERE ID = ?', [1])
    expect(result).toEqual(mockData)
  })

  test('create agrega un nuevo lote', async () => {
    const mockData = { Nombre: 'Lote1', Numero: 123, Aforo: 100, FincaID: 1 }
    const insertResult = { affectedRows: 1 }
    
    database.query = jest.fn()
      .mockResolvedValueOnce([[{ id: 'some-uuid' }]])
      .mockResolvedValueOnce(insertResult)

    const result = await LoteModel.create(mockData)

    expect(database.query).toHaveBeenCalledTimes(2)
    expect(result).toEqual(insertResult)
  })

  test('update actualiza un lote existente', async () => {
    const mockData = { Nombre: 'Lote2' }
    const updateResult = { affectedRows: 1 }
    database.query = jest.fn().mockResolvedValue(updateResult)

    const result = await LoteModel.update(1, mockData)

    expect(database.query).toHaveBeenCalled()
    expect(result).toEqual(updateResult)
  })

  test('delete elimina un lote', async () => {
    const mockData = { affectedRows: 1 }
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await LoteModel.delete(1)

    expect(database.query).toHaveBeenCalledWith('DELETE FROM Lote WHERE ID = ?', [1])
    expect(result).toEqual(mockData)
  })
})
