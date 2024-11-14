/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { TransaccionController } from '../../controllers/transaccion.controller.js'
import { TransaccionModel } from '../../models/transaccion.model.js'

jest.mock('../../models/transaccion.model.js')

const mockTransaccion = { Tipo: 'Ingreso', Fecha: '2021-01-01', Valor: 1000, Productos: [{ id: '123e4567-e89b-12d3-a456-426655440000', cantidad: 1 }] }
const mockBadTransaccion = { Tipo: 'Ingreso', Fecha: '2021-01-01', Valor: -1, Productos: [{ id: '123e4567-e89b-12d3-a456-426655440000', cantidad: -1 }] }
const mockBadPostTransaccion = {
  Tipo: 'Ingresos',
  Fecha: '2021-01-01',
  Valor: 100,
  Productos: [{ id: '123e4567-e89b-12d3-a456-426655440000', cantidad: 1, precio: 100 }]
}
const mockResponseBadPostTransaccion = {
  'body': [
    {
      'code': 'invalid_enum_value',
      'message': 'Invalid enum value. Expected \'Ingreso\' | \'Egreso\', received \'Ingresos\'',
      'options': [
        'Ingreso',
        'Egreso'
      ],
      'path': [
        'Tipo'
      ],
      'received': 'Ingresos'
    }
  ]
}

describe('Test del controlador de TransaccionController', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // GET ALL
  test('getAll devuelve todos los registros de Transaccion correctamente', async () => {
    TransaccionModel.getAll = jest.fn().mockResolvedValue([mockTransaccion])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await TransaccionController.getAll(req, res)

    expect(TransaccionModel.getAll).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: [mockTransaccion]
    })
  })

  test('getAll maneja errores', async () => {
    const errorMessage = 'Error al obtener registros'
    TransaccionModel.getAll = jest.fn().mockRejectedValue(new Error(errorMessage))
    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await TransaccionController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })

  // GET RESUMEN
  test('getResumen devuelve el resumen de Transaccion correctamente', async () => {
    TransaccionModel.getResumen = jest.fn().mockResolvedValue([mockTransaccion])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await TransaccionController.getResumen(req, res)

    expect(TransaccionModel.getResumen).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: [mockTransaccion]
    })
  })

  test('getResumen maneja errores', async () => {
    const errorMessage = 'Error al obtener resumen'
    TransaccionModel.getResumen = jest.fn().mockRejectedValue(new Error(errorMessage))
    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await TransaccionController.getResumen(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })

  // GET TRANSACCION
  test('getTransaccion devuelve una Transaccion por ID correctamente', async () => {
    const mockID = { ID: 1 }
    TransaccionModel.getTransaccionById = jest.fn().mockResolvedValue(mockID)

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await TransaccionController.getTransaccion(req, res)

    expect(TransaccionModel.getTransaccionById).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockID
    })
  })

  test('getTransaccion maneja errores', async () => {
    const errorMessage = 'Error al obtener Transaccion'
    TransaccionModel.getTransaccionById = jest.fn().mockRejectedValue(new Error(errorMessage))
    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await TransaccionController.getTransaccion(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })

  test('getTransaccion devuelve un mensaje si no encuentra la Transaccion', async () => {
    TransaccionModel.getTransaccionById = jest.fn().mockResolvedValue({})

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await TransaccionController.getTransaccion(req, res)

    expect(res.status).toHaveBeenCalledWith(204)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 204,
      body: 'No se encontró ninguna transaccion con el ID 1'
    })
  })

  // CREATE
  test('create crea una Transaccion correctamente', async () => {
    TransaccionModel.create = jest.fn().mockResolvedValue(true)

    const req = { body: mockTransaccion }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await TransaccionController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(TransaccionModel.create).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: true
    })
  })

  test('create maneja errores', async () => {
    const errorMessage = 'Error al crear Transaccion'
    TransaccionModel.create = jest.fn().mockRejectedValue(new Error(errorMessage))
    const req = { body: mockTransaccion }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await TransaccionController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })

  test('create maneja errores en la validación', async () => {
    const req = { body: mockBadPostTransaccion }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await TransaccionController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 400,
      body: mockResponseBadPostTransaccion.body
    })
  })

  // UPDATE
  test('update actualiza una Transaccion correctamente', async () => {
    TransaccionModel.update = jest.fn().mockResolvedValue([{ affectedRows: 1, changedRows: 1 }])

    const req = { params: { id: 1 }, body: mockTransaccion }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await TransaccionController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(TransaccionModel.update).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: { affectedRows: 1, changedRows: 1 }
    })
  })

  test('update maneja errores', async () => {
    const errorMessage = 'Error al actualizar Transaccion'
    TransaccionModel.update = jest.fn().mockRejectedValue(new Error(errorMessage))
    const req = { params: { id: 1 }, body: mockTransaccion }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await TransaccionController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })

  // Delete
  test('No se encuentra ninguna transaccion para eliminar', async () => {
    TransaccionModel.delete = jest.fn().mockResolvedValue([{affectedRows: 1}])
    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await TransaccionController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: { affectedRows: 1 }
    })
  })

  test('delete maneja errores', async () => {
    const errorMessage = 'Error al eliminar transacción'
    TransaccionModel.delete = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await TransaccionController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: errorMessage
    })
  })

  test('delete maneja transacciones no encontrados', async () => {
    TransaccionModel.delete = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await TransaccionController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontro ninguna transaccion con el ID 1 para eliminar'
    })
  })
})
