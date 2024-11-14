/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { TransaccionModel } from '../../models/transaccion.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')

describe('Test para el modelo de transaccion', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getResumen obtiene el resumen de las transacciones', async () => {
    const mockData = [{ Tipo: 'Ingreso', Total: 100 }, { Tipo: 'Egreso', Total: 50 }]
    database.query = jest.fn().mockResolvedValue([mockData])

    const result = await TransaccionModel.getResumen()

    expect(database.query).toHaveBeenCalledWith(expect.any(String))
    expect(result).toEqual({ Ingreso: 100, Egreso: 50, Total: 50 })
  })

  // getTransaccionById
  test('getTransaccionById obtiene una transaccion por ID', async () => {
    const mockData = { id: 1, Nombre: 'Transaccion1' }
    database.query = jest.fn().mockResolvedValue([[mockData]])

    const result = await TransaccionModel.getTransaccionById(1)

    expect(database.query).toHaveBeenCalledWith(expect.any(String), [1])
    expect(result).toEqual({Nombre: 'Transaccion1', Productos: [{Nombre: 'Transaccion1', id: 1}], ProductosString: 'undefined', id: 1})
  })

  // getResumen
  test('getResumen obtiene el resumen de las transacciones', async () => {
    const mockData = [{ Tipo: 'Ingreso', Total: 100 }, { Tipo: 'Egreso', Total: 50 }]
    database.query = jest.fn().mockResolvedValue([mockData])

    const result = await TransaccionModel.getResumen()

    expect(database.query).toHaveBeenCalledWith(expect.any(String))
    expect(result).toEqual({ Ingreso: 100, Egreso: 50, Total: 50 })
  })

  // update
  test('update actualiza una transaccion existente', async () => {
    const mockData = { Nombre: 'Transaccion Actualizada' }
    const updateResult = { affectedRows: 1 }
    database.query.mockResolvedValue(updateResult)

    const result = await TransaccionModel.update(1, mockData)

    expect(database.query).toHaveBeenCalled()
    expect(result).toEqual(updateResult)
  })

  // delete
  test('delete elimina una transaccion existente', async () => {
    const deleteResult = { affectedRows: 1 }
    database.query.mockResolvedValue(deleteResult)

    const result = await TransaccionModel.delete(1)

    expect(database.query).toHaveBeenCalled()
    expect(result).toEqual(deleteResult)
  })
})
