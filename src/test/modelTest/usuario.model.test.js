/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { UsuarioModel } from '../../models/usuario.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')

describe('UsuarioModel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getAll obtiene todos los registros de usuario', async () => {
    const mockData = [{ id: 1, Nombre: 'Usuario 1', Email: 'usuario1@example.com' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await UsuarioModel.getAll()

    expect(database.query).toHaveBeenCalledWith(expect.any(String))
    expect(result).toEqual(mockData)
  })

  test('getUsuarioById obtiene un registro por ID', async () => {
    const mockData = [{ id: 1, Nombre: 'Usuario 1', Email: 'usuario1@example.com' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await UsuarioModel.getUsuarioById(1)

    expect(database.query).toHaveBeenCalledWith(expect.any(String), [1])
    expect(result).toEqual(mockData)
  })

  test('create agrega un nuevo registro', async () => {
    const mockData = { Tipo: 'Admin', Identificacion: '123456', Nombre: 'Usuario 1', Direccion: 'Direccion 1', Telefono: '1234567890', Email: 'usuario1@example.com', Contrasena: 'password' }
    const insertResult = { affectedRows: 1 }
    database.query.mockResolvedValueOnce([[{ id: 'some-uuid' }]])
    database.query.mockResolvedValueOnce(insertResult)

    const result = await UsuarioModel.create(mockData)

    expect(database.query).toHaveBeenCalledTimes(2)
    expect(result).toEqual(insertResult)
  })

  test('update actualiza un registro existente', async () => {
    const mockData = { Nombre: 'Usuario Actualizado' }
    const updateResult = { affectedRows: 1 }
    database.query.mockResolvedValue(updateResult)

    const result = await UsuarioModel.update(1, mockData)

    expect(database.query).toHaveBeenCalled()
    expect(result).toEqual(updateResult)
  })

  test('delete elimina un registro', async () => {
    const mockData = { affectedRows: 1 }
    database.query.mockResolvedValue(mockData)

    const result = await UsuarioModel.delete(1)

    expect(database.query).toHaveBeenCalledWith(expect.any(String), [1])
    expect(result).toEqual(mockData)
  })
})
