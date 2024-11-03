/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { ProduccionIndividualModel } from '../../models/produccionIndividual.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')

describe('ProduccionIndividualModel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getProduccionIndividuals obtiene todos los registros', async () => {
    const mockData = [{ id: 1, ResNombre: 'Res1' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await ProduccionIndividualModel.getProduccionIndividuals()

    expect(database.query).toHaveBeenCalledWith(expect.any(String))
    expect(result).toEqual(mockData)
  })

  test('getProduccionIndividualById obtiene un registro por ID', async () => {
    const mockData = [{ id: 1, ResNombre: 'Res1' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await ProduccionIndividualModel.getProduccionIndividualById(1)

    expect(database.query).toHaveBeenCalledWith(expect.any(String), [1])
    expect(result).toEqual(mockData)
  })

  test('updateProduccionIndividual actualiza un registro existente', async () => {
    const mockData = { Cantidad: 20 }
    const updateResult = { affectedRows: 1 }
    database.query.mockResolvedValue(updateResult)

    const result = await ProduccionIndividualModel.updateProduccionIndividual(1, mockData)

    expect(database.query).toHaveBeenCalled()
    expect(result).toEqual(updateResult)
  })

  test('deleteProduccionIndividual elimina un registro', async () => {
    const mockData = { affectedRows: 1 }
    database.query.mockResolvedValue(mockData)

    const result = await ProduccionIndividualModel.deleteProduccionIndividual(1)

    expect(database.query).toHaveBeenCalledWith(expect.any(String), [1])
    expect(result).toEqual(mockData)
  })
})
