/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { ParaInseminarModel } from '../../models/paraInseminar.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')

describe('ParaInseminarModel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getAll obtiene todas las inseminaciones pendientes', async () => {
    const mockData = [{ id: 1, ResID: 1, Fecha: '2024-01-01', Observaciones: 'Observación', Estado: 'Pendiente' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await ParaInseminarModel.getAll()

    expect(result).toEqual(mockData)
    expect(database.query).toHaveBeenCalledWith(
      expect.stringContaining('SELECT Pi.*, R.Nombre AS ResNombre'),
      ['Pendiente']
    )
  })

  test('getParaInseminar obtiene inseminación por ID', async () => {
    const mockData = [{ id: 1, ResID: 1, Fecha: '2024-01-01', Observaciones: 'Observación', Estado: 'Pendiente' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await ParaInseminarModel.getParaInseminar(1)

    expect(database.query).toHaveBeenCalledWith(expect.stringContaining('WHERE Pi.id = ?'), [1])
    expect(result).toEqual(mockData)
  })

  test('getSugeridos obtiene vacas sugeridas para inseminación', async () => {
    const mockData = [{ ID: 1, ResNombre: 'Vaca1' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await ParaInseminarModel.getSugeridos()

    expect(database.query).toHaveBeenCalled()
    expect(result).toEqual(mockData)
  })

  test('create agrega una nueva inseminación', async () => {
    const mockData = { Fecha: '2024-01-01', Observaciones: 'Observación', ResID: 1 }
    const insertResult = { affectedRows: 1 }
    database.query = jest.fn()
      .mockResolvedValueOnce([[{ id: 'some-uuid' }]])
      .mockResolvedValueOnce(insertResult)

    const result = await ParaInseminarModel.create(mockData)

    expect(database.query).toHaveBeenCalledTimes(2)
    expect(result).toEqual(insertResult)
  })

  test('update cambia el estado de la inseminación', async () => {
    const updateResult = { affectedRows: 1 }
    database.query = jest.fn().mockResolvedValue(updateResult)

    const result = await ParaInseminarModel.update(1)

    expect(database.query).toHaveBeenCalled()
    expect(result).toEqual(updateResult)
  })

  test('delete elimina una inseminación', async () => {
    const deleteResult = { affectedRows: 1 }
    database.query = jest.fn().mockResolvedValue(deleteResult)

    const result = await ParaInseminarModel.delete(1)

    expect(database.query).toHaveBeenCalledWith('DELETE FROM ParaInseminar WHERE ID = ?', [1])
    expect(result).toEqual(deleteResult)
  })
})
