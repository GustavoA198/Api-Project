/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { InsumosTransaccionModel } from '../../models/insumosTransaccion.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')

describe('InsumosTransaccionModel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getAll obtiene todos los insumos de transacción', async () => {
    const mockData = [{ id: 1, Cantidad: 10, ValorUnitario: 5 }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await InsumosTransaccionModel.getAll()

    expect(database.query).toHaveBeenCalledWith('SELECT * FROM InsumosTransaccion')
    expect(result).toEqual(mockData)
  })

  test('getInsumosTransaccionById obtiene insumo por ID', async () => {
    const mockData = [{ id: 1, Cantidad: 10, ValorUnitario: 5 }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await InsumosTransaccionModel.getInsumosTransaccionById(1)

    expect(database.query).toHaveBeenCalledWith('SELECT * FROM InsumosTransaccion WHERE id =  ?', [1])
    expect(result).toEqual(mockData)
  })

  test('create agrega un nuevo insumo de transacción', async () => {
    const mockData = { Cantidad: 10, ValorUnitario: 5, InsumoID: 1, TransaccionID: 1 }
    const insertResult = { affectedRows: 1 }

    database.query = jest.fn()
      .mockResolvedValueOnce([[{ id: 'some-uuid' }]])
      .mockResolvedValueOnce(insertResult)

    const result = await InsumosTransaccionModel.create(mockData)

    expect(database.query).toHaveBeenCalledTimes(2)
    expect(result).toEqual(insertResult)
  })

  test('update actualiza un insumo de transacción existente', async () => {
    const mockData = { Cantidad: 20 }
    const updateResult = { affectedRows: 1 }
    database.query = jest.fn().mockResolvedValue(updateResult)

    const result = await InsumosTransaccionModel.update(1, mockData)

    expect(database.query).toHaveBeenCalled()
    expect(result).toEqual(updateResult)
  })

  test('delete elimina un insumo de transacción', async () => {
    const mockData = { affectedRows: 1 }
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await InsumosTransaccionModel.delete(1)

    expect(database.query).toHaveBeenCalledWith('DELETE FROM InsumosTransaccion WHERE id = ?', [1])
    expect(result).toEqual(mockData)
  })
})
