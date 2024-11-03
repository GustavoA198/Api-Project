/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { ProductoModel } from '../../models/producto.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')

describe('ProductoModel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getAll obtiene todos los productos', async () => {
    const mockData = [{ ID: 1, Nombre: 'Producto1', Fecha: '2024-01-01', Cantidad: 100 }]
    database.execute = jest.fn().mockResolvedValue(mockData)

    const result = await ProductoModel.getAll()

    expect(result).toEqual(mockData)
    expect(database.execute).toHaveBeenCalledWith('SELECT * FROM Producto')
  })

  test('getProducto obtiene un producto por ID', async () => {
    const mockData = [{ ID: 1, Nombre: 'Producto1', Fecha: '2024-01-01', Cantidad: 100 }]
    database.execute = jest.fn().mockResolvedValue(mockData)

    const result = await ProductoModel.getProducto(1)

    expect(database.execute).toHaveBeenCalledWith('SELECT * FROM Producto WHERE ID = ?', [1])
    expect(result).toEqual(mockData)
  })

  test('create crea un nuevo producto', async () => {
    const mockData = { Nombre: 'Producto1', Fecha: '2024-01-01', Cantidad: 100 }
    const uuidResult = [[{ id: 'some-uuid' }]]
    const insertResult = { affectedRows: 1 }

    database.query = jest.fn().mockResolvedValueOnce(uuidResult) // Para UUID
    database.execute = jest.fn().mockResolvedValue(insertResult) // Para insertar Producto

    const result = await ProductoModel.create(mockData)

    expect(database.query).toHaveBeenCalledWith('SELECT UUID() id')
    expect(database.execute).toHaveBeenCalledWith(
      'INSERT INTO Producto (ID, Nombre, Fecha, Cantidad) VALUES (?, ?, ?, ?)',
      ['some-uuid', mockData.Nombre, mockData.Fecha, mockData.Cantidad]
    )
    expect(result).toEqual(insertResult)
  })

  test('update actualiza un producto', async () => {
    const updateResult = { affectedRows: 1 }
    database.execute = jest.fn().mockResolvedValue(updateResult)

    const result = await ProductoModel.update(1, { Cantidad: 150 })

    expect(database.execute).toHaveBeenCalled()
    expect(result).toEqual(updateResult)
  })

  test('delete elimina un producto', async () => {
    const deleteResult = { affectedRows: 1 }
    database.execute = jest.fn().mockResolvedValue(deleteResult)

    const result = await ProductoModel.delete(1)

    expect(database.execute).toHaveBeenCalledWith('DELETE FROM Producto WHERE ID = ?', [1])
    expect(result).toEqual(deleteResult)
  })
})
