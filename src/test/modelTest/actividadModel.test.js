/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { ActividadModel } from '../../models/actividad.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')

describe('ActividadModel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getAll obtiene todas las actividades', async () => {
    const mockData = [{ ID: 1, Tipo: 'Tipo1' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await ActividadModel.getAll()

    expect(database.query).toHaveBeenCalledWith(expect.any(String))
    expect(result).toEqual(mockData)
  })

  test('getActividad obtiene una actividad por ID', async () => {
    const mockData = [{ ID: 1, Tipo: 'Tipo1' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await ActividadModel.getActividad(1)

    expect(database.query).toHaveBeenCalledWith(expect.any(String), [1])
    expect(result).toEqual(mockData)
  })

  test('create agrega una nueva actividad', async () => {
    const mockData = { Fecha: '2023-11-01', Tipo: 'Tipo1', TiempoCarencia: 10, LoteID: 1, Observaciones: 'Ninguna' }
    const insertResult = { affectedRows: 1 }
    database.query.mockResolvedValueOnce([[{ id: 'some-uuid' }]])
    database.query.mockResolvedValueOnce(insertResult)

    const result = await ActividadModel.create(mockData)

    expect(database.query).toHaveBeenCalledTimes(2)
    expect(result).toEqual(insertResult)
  })

  test('update actualiza una actividad existente', async () => {
    const mockData = { Tipo: 'Tipo Actualizado' }
    const updateResult = { affectedRows: 1 }
    database.query.mockResolvedValue(updateResult)

    const result = await ActividadModel.update(1, mockData)

    expect(database.query).toHaveBeenCalled()
    expect(result).toEqual(updateResult)
  })

  test('delete elimina una actividad por ID', async () => {
    const mockData = { affectedRows: 1 }
    database.query.mockResolvedValue(mockData)

    const result = await ActividadModel.delete(1)

    expect(database.query).toHaveBeenCalledWith(expect.any(String), [1])
    expect(result).toEqual(mockData)
  })
})
