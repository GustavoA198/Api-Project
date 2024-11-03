/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { AlimentoModel } from '../../models/alimento.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')

describe('AlimentoModel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getAlimentos obtiene todos los alimentos', async () => {
    const mockData = [{ id: 1, Nombre: 'Alimento1' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await AlimentoModel.getAlimentos()

    expect(database.query).toHaveBeenCalledWith(expect.any(String))
    expect(result).toEqual(mockData)
  })

  test('getAlimentoById obtiene un alimento por ID', async () => {
    const mockData = [{ id: 1, Nombre: 'Alimento1' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await AlimentoModel.getAlimentoById(1)

    expect(database.query).toHaveBeenCalledWith(expect.any(String), [1])
    expect(result).toEqual(mockData)
  })

  test('createAlimento agrega un nuevo alimento', async () => {
    const mockData = { Nombre: 'Alimento1', Tipo: 'Tipo1' }
    const insertResult = { affectedRows: 1 }
    database.query.mockResolvedValueOnce([[{ id: 'some-uuid' }]])
    database.query.mockResolvedValueOnce(insertResult)

    const result = await AlimentoModel.createAlimento(mockData)

    expect(database.query).toHaveBeenCalledTimes(2)
    expect(result).toEqual(insertResult)
  })

  test('updateAlimento actualiza un alimento existente', async () => {
    const mockData = { Nombre: 'Alimento Actualizado' }
    const updateResult = { affectedRows: 1 }
    database.query.mockResolvedValue(updateResult)

    const result = await AlimentoModel.updateAlimento(1, mockData)

    expect(database.query).toHaveBeenCalled()
    expect(result).toEqual(updateResult)
  })

  test('deleteAlimento elimina un alimento por ID', async () => {
    const mockData = { affectedRows: 1 }
    database.query.mockResolvedValue(mockData)

    const result = await AlimentoModel.deleteAlimento(1)

    expect(database.query).toHaveBeenCalledWith(expect.any(String), [1])
    expect(result).toEqual(mockData)
  })
})
