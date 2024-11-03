/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { ServicioModel } from '../../models/servicio.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')

describe('ServicioModel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getServicios obtiene servicios sin inseminación ni monta', async () => {
    const mockData = [[{ ID: 1, Tipo: 'Otros', listInsumos: '' }]] // Ajuste aquí para incluir listInsumos
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await ServicioModel.getServicios()

    expect(database.query).toHaveBeenCalledWith(expect.any(String))
    expect(result).toEqual([{ ID: 1, Tipo: 'Otros', listInsumos: '' }])
  })

  test('getInseminacionOMonta obtiene servicios de inseminación o monta', async () => {
    const mockData = [[{ ID: 1, Tipo: 'Inseminacion', listInsumos: '' }]]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await ServicioModel.getInseminacionOMonta()
    expect(database.query).toHaveBeenCalledWith(expect.any(String))
    expect(result).toEqual([{ ID: 1, Tipo: 'Inseminacion', listInsumos: '' }])
  })
  test('createServicio agrega un nuevo servicio', async () => {
    const mockData = {
      Tipo: 'Inseminacion',
      Fecha: '2024-01-01',
      Veterinario: 'Dr. Smith',
      Observaciones: 'Observaciones de prueba',
      ResID: '1',
      listInsumos: [{ InsumoID: '2', Cantidad: 10 }]
    }
    const insertResult = { affectedRows: 1 }
    database.getConnection = jest.fn().mockResolvedValue({
      beginTransaction: jest.fn(),
      commit: jest.fn(),
      rollback: jest.fn(),
      release: jest.fn(),
      query: jest.fn().mockResolvedValue([[{ id: 'mocked-id' }], insertResult])
    })

    const result = await ServicioModel.createServicio(mockData)

    expect(database.getConnection).toHaveBeenCalled()
    expect(result).toEqual(true)
  })

  test('createServicio maneja error al agregar servicio', async () => {
    const mockData = {
      Tipo: 'Inseminacion',
      Fecha: '2024-01-01',
      Veterinario: 'Dr. Smith',
      Observaciones: 'Observaciones de prueba',
      ResID: '1',
      listInsumos: [{ InsumoID: '2', Cantidad: 10 }]
    }
    database.getConnection = jest.fn().mockResolvedValue({
      beginTransaction: jest.fn(),
      commit: jest.fn(),
      rollback: jest.fn(),
      release: jest.fn(),
      query: jest.fn().mockRejectedValue(new Error('Error al crear servicio'))
    })

    const result = await ServicioModel.createServicio(mockData)

    expect(result).toBe(false)
  })

  test('getServicios retorna un array vacío cuando no hay servicios', async () => {
    const mockData = [[]]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await ServicioModel.getServicios()

    expect(database.query).toHaveBeenCalled()
    expect(result).toEqual([])
  })

  test('getInseminacionOMonta retorna un array vacío cuando no hay servicios de inseminación o monta', async () => {
    const mockData = [[]]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await ServicioModel.getInseminacionOMonta()

    expect(database.query).toHaveBeenCalled()
    expect(result).toEqual([])
  })

  test('createServicio lanza error cuando hay un problema con la conexión', async () => {
    const mockData = {
      Tipo: 'Inseminacion',
      Fecha: '2024-01-01',
      Veterinario: 'Dr. Smith',
      Observaciones: 'Observaciones de prueba',
      ResID: '1',
      listInsumos: [{ InsumoID: '2', Cantidad: 10 }]
    }
    database.getConnection = jest.fn().mockRejectedValue(new Error('Error en la conexión'))

    await expect(ServicioModel.createServicio(mockData)).rejects.toThrow('Error en la conexión')
  })

  test('createServicio llama a rollback en caso de error', async () => {
    const mockData = {
      Tipo: 'Inseminacion',
      Fecha: '2024-01-01',
      Veterinario: 'Dr. Smith',
      Observaciones: 'Observaciones de prueba',
      ResID: '1',
      listInsumos: [{ InsumoID: '2', Cantidad: 10 }]
    }
    const mockConnection = {
      beginTransaction: jest.fn(),
      commit: jest.fn(),
      rollback: jest.fn(),
      release: jest.fn(),
      query: jest.fn().mockRejectedValue(new Error('Error al crear servicio'))
    }
    database.getConnection = jest.fn().mockResolvedValue(mockConnection)

    const result = await ServicioModel.createServicio(mockData)

    expect(mockConnection.rollback).toHaveBeenCalled()
    expect(result).toBe(false)
  })

  test('createServicio devuelve false si el servicio ya existe', async () => {
    const mockData = {
      Tipo: 'Inseminacion',
      Fecha: '2024-01-01',
      Veterinario: 'Dr. Smith',
      Observaciones: 'Observaciones de prueba',
      ResID: '1',
      listInsumos: [{ InsumoID: '2', Cantidad: 10 }]
    }
    const existingServiceCheck = jest.fn().mockResolvedValue([[{ id: 'existing-id' }]])
    database.query = jest.fn().mockImplementation((query) => {
      if (query.includes('SELECT')) {
        return existingServiceCheck()
      }
      return Promise.resolve([{ affectedRows: 1 }])
    })

    const result = await ServicioModel.createServicio(mockData)

    expect(result).toBe(false)
  })
})
