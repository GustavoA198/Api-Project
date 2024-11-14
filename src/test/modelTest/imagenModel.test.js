/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { ImagenModel } from '../../models/imagen.model.js'
import { database } from '../../database/db.js'

jest.mock('../../database/db.js')

describe('Test para el modelo de imagen', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // getAll
  test('getAll obtiene todas las imagenes', async () => {
    const mockData = [{ id: 1, URL: 'Imagen1' }]
    database.query = jest.fn().mockResolvedValue(mockData)

    const result = await ImagenModel.getAll(1)

    expect(database.query).toHaveBeenCalledWith('SELECT * FROM Imagen WHERE resID = ?', [1])
    expect(result).toEqual(mockData)
  })
})
