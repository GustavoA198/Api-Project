/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { MuerteModel } from '../../models/muerte.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')

describe('MuerteModel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getMuertes obtiene todas las muertes', async () => {
    const mockData = [{ id: 1, Fecha: '2024-01-01', Causa: 'Natural', Observaciones: 'Ninguna', ResID: 1 }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await MuerteModel.getMuertes()

    expect(database.query).toHaveBeenCalledWith('SELECT * FROM Muerte')
    expect(result).toEqual(mockData)
  })

  test('getMuerteById obtiene muerte por ID', async () => {
    const mockData = [{ id: 1, Fecha: '2024-01-01', Causa: 'Natural', Observaciones: 'Ninguna', ResID: 1 }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await MuerteModel.getMuerteById(1)

    expect(database.query).toHaveBeenCalledWith('SELECT * FROM Muerte WHERE id = ?', [1])
    expect(result).toEqual(mockData)
  })

  test('createMuerte agrega una nueva muerte', async () => {
    const mockData = { Fecha: '2024-01-01', Causa: 'Natural', Observaciones: 'Ninguna', ResID: 1 }
    const insertResult = { affectedRows: 1 }

    database.query = jest.fn()
      .mockResolvedValueOnce([[{ id: 'some-uuid' }]])
      .mockResolvedValueOnce(insertResult)

    const result = await MuerteModel.createMuerte(mockData)

    expect(database.query).toHaveBeenCalledTimes(2)
    expect(result).toEqual(insertResult)
  })

  test('updateMuerte actualiza una muerte existente', async () => {
    const mockData = { Causa: 'Accidente' }
    const updateResult = { affectedRows: 1 }
    database.query = jest.fn().mockResolvedValue(updateResult)

    const result = await MuerteModel.updateMuerte(1, mockData)

    expect(database.query).toHaveBeenCalled()
    expect(result).toEqual(updateResult)
  })

  test('deleteMuerte elimina una muerte', async () => {
    const mockData = { affectedRows: 1 }
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await MuerteModel.deleteMuerte(1)

    expect(database.query).toHaveBeenCalledWith('DELETE FROM Muerte WHERE id = ?', [1])
    expect(result).toEqual(mockData)
  })
})
