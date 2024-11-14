/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { ClienteModel } from '../../models/cliente.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')

describe('ClienteModel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getAll obtiene todos los clientes', async () => {
    const mockData = [{ id: 1, Nombre: 'Cliente1' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await ClienteModel.getAll()

    expect(database.query).toHaveBeenCalledWith(expect.any(String))
    expect(result).toEqual(mockData)
  })

  test('getCliente obtiene un cliente por ID', async () => {
    const mockData = [{ id: 1, Nombre: 'Cliente1' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await ClienteModel.getCliente(1)

    expect(database.query).toHaveBeenCalledWith(expect.any(String), [1])
    expect(result).toEqual(mockData)
  })

  // update
  test('update actualiza un cliente existente', async () => {
    const mockData = { Nombre: 'Cliente Actualizado' }
    const updateResult = { affectedRows: 1 }
    database.query.mockResolvedValue(updateResult)

    const result = await ClienteModel.update(1, mockData)

    expect(database.query).toHaveBeenCalled()
    expect(result).toEqual(updateResult)
  })
})
