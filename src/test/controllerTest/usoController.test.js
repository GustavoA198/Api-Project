/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { UsoController } from '../../controllers/uso.controller.js'
import { UsoModel } from '../../models/uso.model.js'

jest.mock('../../models/uso.model.js')

const mockUso = { Fecha: '10-10-2024', Cantidad: 10, ProductoID: '123e4567-e89b-12d3-a456-426655440000' }
const badResponse = {
  body: [
    {
      code: 'invalid_type',
      expected: 'number',
      message: 'Expected number, received string',
      path: ['Cantidad'],
      received: 'string'
    }
  ]
}

describe('test del controlador de uso', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // GET ALL
  test('debería obtener todos los usos', async () => {
    UsoModel.getAll = jest.fn().mockResolvedValue([mockUso])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsoController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      'error': false,
      'status': 200,
      'body': mockUso
    })
  })

  test('debería obtener un error al obtener todos los usos', async () => {
    UsoModel.getAll = jest.fn().mockRejectedValue(new Error('Error al obtener los usos'))

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsoController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      'error': true,
      'status': 500,
      'body': 'Error al obtener los usos'
    })
  })

  // GET BY ID
  test('debería obtener un uso por ID', async () => {
    UsoModel.getUsoById = jest.fn().mockResolvedValue([mockUso])

    const req = { params: { id: '123e4567-e89b-12d3-a456-426655440000' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsoController.getUsoById(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      'error': false,
      'status': 200,
      'body': mockUso
    })
  })

  test('debería obtener un error al obtener un uso por ID', async () => {
    UsoModel.getUsoById = jest.fn().mockRejectedValue(new Error('Error al obtener el uso por ID'))

    const req = { params: { id: '123e4567-e89b-12d3-a456-426655440000' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsoController.getUsoById(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      'error': true,
      'status': 500,
      'body': 'Error al obtener el uso por ID'
    })
  })

  test('debería obtener un error al no encontrar un uso por ID', async () => {
    UsoModel.getUsoById = jest.fn().mockResolvedValue([])

    const req = { params: { id: '123e4567-e89b-12d3-a456-426655440000' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsoController.getUsoById(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      'error': true,
      'status': 404,
      'body': 'No se encontró ninguna \'uso\' con el ID 123e4567-e89b-12d3-a456-426655440000'
    })
  })

  // CREATE
  test('debería crear un nuevo uso', async () => {
    UsoModel.create = jest.fn().mockResolvedValue([mockUso])

    const req = { body: mockUso }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsoController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      'error': false,
      'status': 200,
      'body': [mockUso]
    })
  })

  test('debería obtener un error al crear un nuevo uso', async () => {
    UsoModel.create = jest.fn().mockRejectedValue(new Error('Error al crear un nuevo uso'))

    const req = { body: mockUso }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsoController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      'error': true,
      'status': 500,
      'body': 'Error al crear un nuevo uso'
    })
  })

  test('debería obtener un error al crear un nuevo uso con datos incorrectos', async () => {
    UsoModel.create = jest.fn().mockRejectedValue(new Error('Error al crear un nuevo uso'))

    const req = { body: { Fecha: '10-10-2024', Cantidad: '10', ProductoID: '123e4567-e89b-12d3-a456-426655440000' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsoController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      'error': true,
      'status': 400,
      'body': badResponse.body
    })
  })

  // UPDATE
  test('debería actualizar un uso existente', async () => {
    UsoModel.update = jest.fn().mockResolvedValue([mockUso])

    const req = { params: { id: '123e4567-e89b-12d3-a456-426655440000' }, body: { Cantidad: 15 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsoController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      'error': false,
      'status': 200,
      'body': mockUso
    })
  })

  test('debería obtener un error al actualizar un uso existente', async () => {
    UsoModel.update = jest.fn().mockRejectedValue(new Error('Error al actualizar un uso'))

    const req = { params: { id: '123e4567-e89b-12d3-a456-426655440000' }, body: { Cantidad: 15 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsoController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      'error': true,
      'status': 500,
      'body': 'Error al actualizar un uso'
    })
  })

  test('debería obtener un error al no encontrar un uso para actualizar', async () => {
    UsoModel.update = jest.fn().mockResolvedValue([{ affectedRows: 0, changedRows: null }])

    const req = { params: { id: '123e4567-e89b-12d3-a456-426655440000' }, body: { Cantidad: 15 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsoController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      'error': true,
      'status': 404,
      'body': 'No se encontró ninguna \'uso\' con el ID 123e4567-e89b-12d3-a456-426655440000 para actualizar'
    })
  })

  // DELETE
  test('debería eliminar un uso existente', async () => {
    const responseDelete = { affetedRows: '1' }
    UsoModel.delete = jest.fn().mockResolvedValue([ responseDelete ])

    const req = { params: { id: '123e4567-e89b-12d3-a456-426655440000' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsoController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      'error': false,
      'status': 200,
      'body': responseDelete
    })
  })

  test('debería obtener un error al eliminar un uso existente', async () => {
    UsoModel.delete = jest.fn().mockRejectedValue(new Error('Error al eliminar un uso'))

    const req = { params: { id: '123e4567-e89b-12d3-a456-426655440000' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsoController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      'error': true,
      'status': 500,
      'body': 'Error al eliminar un uso'
    })
  })

  test('debería obtener un error al no encontrar un uso para eliminar', async () => {
    UsoModel.delete = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    const req = { params: { id: '123e4567-e89b-12d3-a456-426655440000' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsoController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      'error': true,
      'status': 404,
      'body': 'No se encontró ninguna \'uso\' con el ID 123e4567-e89b-12d3-a456-426655440000 para eliminar'
    })
  })
})
