/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { ReproduccionModel } from '../../models/reproduccion.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')
jest.mock('../../utils/IncludeInListObject.js')

describe('ReproduccionModel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getPorConfirmar obtiene servicios por confirmar', async () => {
    const mockData = [{ ID: 1, ResID: 1, ResNombre: 'Res1', InseminacionOMontaID: 1, FechaParto: '2024-01-01' }]

    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await ReproduccionModel.getPorConfirmar()

    expect(result).toEqual(mockData)
  })

  test('confirmarInseminacion actualiza estado a Confirmado', async () => {
    const connection = { beginTransaction: jest.fn(), commit: jest.fn(), rollback: jest.fn(), query: jest.fn(), release: jest.fn() }
    database.getConnection = jest.fn().mockResolvedValue(connection)

    const result = await ReproduccionModel.confirmarInseminacion(1)

    expect(connection.beginTransaction).toHaveBeenCalled()
    expect(connection.commit).toHaveBeenCalled()
    expect(result).toBe(true)
  })

  test('inseminacionFallida actualiza estado a Fallido', async () => {
    const connection = { beginTransaction: jest.fn(), commit: jest.fn(), rollback: jest.fn(), query: jest.fn(), release: jest.fn() }
    database.getConnection = jest.fn().mockResolvedValue(connection)

    const result = await ReproduccionModel.inseminacionFallida(1)

    expect(connection.beginTransaction).toHaveBeenCalled()
    expect(connection.commit).toHaveBeenCalled()
    expect(result).toBe(true)
  })

  test('getPartos obtiene todos los partos', async () => {
    const mockData = [{ ID: 1, ResNombre: 'Res1', Numero: '123', FechaParto: '2024-01-01', HijoNombre: 'Hijo1', HijoID: 1 }]

    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await ReproduccionModel.getPartos()

    expect(result).toEqual(mockData)
  })
})
