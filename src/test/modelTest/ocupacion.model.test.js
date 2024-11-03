/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { OcupacionModel } from '../../models/ocupacion.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')

describe('OcupacionModel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getAll obtiene todas las ocupaciones', async () => {
    const mockData = [{ id: 1, NoAnimales: 10, FechaIngreso: '2024-01-01', TipoRebano: 'Tipo1', FechaSalida: '2024-01-10', LoteID: 1 }]
    database.execute = jest.fn().mockResolvedValue(mockData)

    const result = await OcupacionModel.getAll()

    expect(database.execute).toHaveBeenCalledWith('SELECT * FROM Ocupacion')
    expect(result).toEqual(mockData)
  })

  test('getOcupacion obtiene ocupacion por ID', async () => {
    const mockData = [{ id: 1, NoAnimales: 10, FechaIngreso: '2024-01-01', TipoRebano: 'Tipo1', FechaSalida: '2024-01-10', LoteID: 1 }]
    database.execute = jest.fn().mockResolvedValue(mockData)

    const result = await OcupacionModel.getOcupacion(1)

    expect(database.execute).toHaveBeenCalledWith('SELECT * FROM Ocupacion WHERE id = ?', [1])
    expect(result).toEqual(mockData)
  })

  test('create agrega una nueva ocupacion', async () => {
    const mockData = { NoAnimales: 10, FechaIngreso: '2024-01-01', TipoRebano: 'Tipo1', FechaSalida: '2024-01-10', LoteID: 1 }
    const insertResult =
      [
        {
          'FechaIngreso': '2024-01-01',
          'FechaSalida': '2024-01-10',
          'LoteID': 1,
          'NoAnimales': 10,
          'TipoRebano': 'Tipo1',
          'id': 1
        }
      ]

    database.query = jest.fn()
      .mockResolvedValueOnce([[{ id: 'some-uuid' }]])
      .mockResolvedValueOnce(insertResult)

    const result = await OcupacionModel.create(mockData)

    expect(database.query).toHaveBeenCalledTimes(1)
    expect(result).toEqual(insertResult)
  })

  test('update actualiza una ocupacion existente', async () => {
    const mockData = { NoAnimales: 15 }
    const updateResult = { affectedRows: 1 }
    database.execute = jest.fn().mockResolvedValue(updateResult)

    const result = await OcupacionModel.update(1, mockData)

    expect(database.execute).toHaveBeenCalled()
    expect(result).toEqual(updateResult)
  })

  test('delete elimina una ocupacion', async () => {
    const mockData = { affectedRows: 1 }
    database.execute = jest.fn().mockResolvedValue(mockData)

    const result = await OcupacionModel.delete(1)

    expect(database.execute).toHaveBeenCalledWith('DELETE FROM Ocupacion WHERE ID = ?', [1])
    expect(result).toEqual(mockData)
  })
})
