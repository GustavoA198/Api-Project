/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { InsumosServicioModel } from '../../models/insumoServicio.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')

describe('Test para el modelo de insumoServicio', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // getAll
  test('getAll obtiene todos los insumosServicio', async () => {
    const mockData = [{ id: 1, Nombre: 'InsumoServicio1' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await InsumosServicioModel.getAll()

    expect(database.query).toHaveBeenCalledWith('SELECT * FROM InsumoServicio')
    expect(result).toEqual(mockData)
  })

  // getInsumosServicioById
  test('getInsumosServicioById obtiene un insumoServicio por ID', async () => {
    const mockData = [{ id: 1, Nombre: 'InsumoServicio1' }]
    database.query = jest.fn().mockResolvedValue([mockData])

    const result = await InsumosServicioModel.getInsumosServicioById(1)

    expect(database.query).toHaveBeenCalledWith(expect.any(String), [1])
    expect(result).toEqual([mockData])
  })

  // getInsumosServicioByIdServicio
  test('getInsumosServicioByIdServicio obtiene un insumoServicio por ID de servicio', async () => {
    const mockData = [{ id: 1, Nombre: 'InsumoServicio1' }]
    database.query = jest.fn().mockResolvedValue([mockData])

    const result = await InsumosServicioModel.getInsumosServicioByIdServicio(1)

    expect(database.query).toHaveBeenCalledWith(expect.any(String), [1])
    expect(result).toEqual([mockData])
  })
})
