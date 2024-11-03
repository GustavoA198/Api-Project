/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { MontaModel } from '../../models/monta.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')

describe('MontaModel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getMontas obtiene todas las montas', async () => {
    const mockData = [{ id: 1, FechaParto: '2024-01-01', ServicioID: 1, ToroID: 1 }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await MontaModel.getMontas()

    expect(database.query).toHaveBeenCalledWith('SELECT * FROM Monta')
    expect(result).toEqual(mockData)
  })

  test('getMontaById obtiene monta por ID', async () => {
    const mockData = [{ id: 1, FechaParto: '2024-01-01', ServicioID: 1, ToroID: 1 }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await MontaModel.getMontaById(1)

    expect(database.query).toHaveBeenCalledWith('SELECT * FROM Monta WHERE id = ?', [1])
    expect(result).toEqual(mockData)
  })

  test('createMonta agrega una nueva monta', async () => {
    const mockData = { FechaParto: '2024-01-01', ServicioID: 1, ToroID: 1 }
    const insertResult = { affectedRows: 1 }

    database.query = jest.fn()
      .mockResolvedValueOnce([[{ id: 'some-uuid' }]])
      .mockResolvedValueOnce(insertResult)

    const result = await MontaModel.createMonta(mockData)

    expect(database.query).toHaveBeenCalledTimes(2)
    expect(result).toEqual(insertResult)
  })

  test('updateMonta actualiza una monta existente', async () => {
    const mockData = { FechaParto: '2024-02-01' }
    const updateResult = { affectedRows: 1 }
    database.query = jest.fn().mockResolvedValue(updateResult)

    const result = await MontaModel.updateMonta(1, mockData)

    expect(database.query).toHaveBeenCalled()
    expect(result).toEqual(updateResult)
  })

  test('deleteMonta elimina una monta', async () => {
    const mockData = { affectedRows: 1 }
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await MontaModel.deleteMonta(1)

    expect(database.query).toHaveBeenCalledWith('DELETE FROM Monta WHERE id = ?', [1])
    expect(result).toEqual(mockData)
  })
})
