/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { ProveedorModel } from '../../models/proveedor.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')

describe('ProveedorModel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getAll obtiene todos los proveedores', async () => {
    const mockData = [{ ID: 1, Identificacion: '123456', Nombre: 'Proveedor1', Direccion: 'Calle 1', Telefono: '123456789', Email: 'proveedor1@example.com' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await ProveedorModel.getAll()

    expect(result).toEqual(mockData)
    expect(database.query).toHaveBeenCalledWith(expect.stringContaining('SELECT p.ID, p.Identificacion'))
  })

  test('getProveedor obtiene un proveedor por ID', async () => {
    const mockData = [{ ID: 1, Identificacion: '123456', Nombre: 'Proveedor1', Direccion: 'Calle 1', Telefono: '123456789', Email: 'proveedor1@example.com' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await ProveedorModel.getProveedor(1)

    expect(database.query).toHaveBeenCalledWith(expect.stringContaining('WHERE p.ID = ?'), [1])
    expect(result).toEqual(mockData)
  })

  test('create crea un nuevo proveedor', async () => {
    const mockData = { Identificacion: '123456', Nombre: 'Proveedor1', Dirección: 'Calle 1', Telefono: '123456789', Email: 'proveedor1@example.com' }
    const uuidResult = [[{ id: 'some-uuid' }]]
    const insertResult = { affectedRows: 1 }
    const connection = { beginTransaction: jest.fn(), commit: jest.fn(), rollback: jest.fn(), query: jest.fn(), release: jest.fn() }

    database.query = jest.fn().mockResolvedValueOnce(uuidResult)
    database.getConnection = jest.fn().mockResolvedValue(connection)

    connection.query.mockResolvedValueOnce(insertResult)
    connection.query.mockResolvedValueOnce({ affectedRows: 1 })

    const result = await ProveedorModel.create(mockData)

    expect(database.getConnection).toHaveBeenCalled()
    expect(connection.beginTransaction).toHaveBeenCalled()
    expect(connection.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO Persona'),
      ['some-uuid', mockData.Identificacion, mockData.Nombre, mockData.Dirección, mockData.Telefono, mockData.Email]
    )
    expect(connection.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO Proveedor'),
      ['some-uuid']
    )
    expect(connection.commit).toHaveBeenCalled()
    expect(result).toEqual(insertResult)
  })

  test('update actualiza un proveedor', async () => {
    const updateResult = { affectedRows: 1 }
    database.query = jest.fn().mockResolvedValue(updateResult)

    const result = await ProveedorModel.update(1, { Nombre: 'Proveedor Actualizado' })

    expect(database.query).toHaveBeenCalled()
    expect(result).toEqual(updateResult)
  })

  test('delete elimina un proveedor', async () => {
    const connection = { beginTransaction: jest.fn(), commit: jest.fn(), rollback: jest.fn(), query: jest.fn(), release: jest.fn() }
    database.getConnection = jest.fn().mockResolvedValue(connection)
    connection.query.mockResolvedValueOnce({ affectedRows: 1 })
    connection.query.mockResolvedValueOnce({ affectedRows: 1 })

    const result = await ProveedorModel.delete(1)

    expect(database.getConnection).toHaveBeenCalled()
    expect(connection.beginTransaction).toHaveBeenCalled()
    expect(connection.query).toHaveBeenCalledWith('DELETE FROM Proveedor WHERE ID = ?', [1])
    expect(connection.query).toHaveBeenCalledWith('DELETE FROM Persona WHERE ID = ?', [1])
    expect(connection.commit).toHaveBeenCalled()
    expect(result).toEqual({ affectedRows: 1 })
  })
})
