/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { InseminacionModel } from '../../models/inseminacion.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')

describe('InseminacionModel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getInseminaciones obtiene todas las inseminaciones', async () => {
    const mockData = [{ id: '12345', FechaParto: '2024-11-01', ServicioID: '67890' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await InseminacionModel.getInseminaciones()

    expect(database.query).toHaveBeenCalledWith(expect.any(String))
    expect(result).toEqual(mockData)
  })

  test('getInseminacionById obtiene una inseminación por ID', async () => {
    const mockData = [{ id: '12345', FechaParto: '2024-11-01', ServicioID: '67890' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await InseminacionModel.getInseminacionById('12345')

    expect(database.query).toHaveBeenCalledWith(expect.any(String), ['12345'])
    expect(result).toEqual(mockData)
  })

  test('create crea una nueva inseminación', async () => {
    const mockData = { FechaParto: '2024-11-01', ServicioID: '67890' }
    const insertResult = { affectedRows: 1 }
    database.query.mockResolvedValueOnce([[{ id: 'some-uuid' }]])
    database.query.mockResolvedValueOnce(insertResult)

    const result = await InseminacionModel.createInseminacion(mockData)

    expect(database.query).toHaveBeenCalledTimes(2)
    expect(result).toEqual(insertResult)
  })

  test('update actualiza una inseminación existente', async () => {
    const mockData = { FechaParto: '2024-12-01' }
    const updateResult = { affectedRows: 1 }
    database.query.mockResolvedValue(updateResult)

    const result = await InseminacionModel.updateInseminacion('12345', mockData)

    expect(database.query).toHaveBeenCalled()
    expect(result).toEqual(updateResult)
  })

  test('delete elimina una inseminación por ID', async () => {
    const mockData = { affectedRows: 1 }
    database.query.mockResolvedValue(mockData)

    const result = await InseminacionModel.deleteInseminacion('12345')

    expect(database.query).toHaveBeenCalledWith(expect.any(String), ['12345'])
    expect(result).toEqual(mockData)
  })
})
