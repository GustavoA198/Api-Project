/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { ServicioController } from '../../controllers/servicio.controller.js'
import { ServicioModel } from '../../models/servicio.model.js'

// Mock de datos de prueba
const mockServicioList = [
  { id: '1', nombre: 'Servicio 1', descripcion: 'Descripción 1' },
  { id: '2', nombre: 'Servicio 2', descripcion: 'Descripción 2' }
]
const mockServicio = { id: '1', nombre: 'Servicio 1', descripcion: 'Descripción 1' }
const mockCreateServicio = { Fecha: '10-10-2021', ResID: '123e4567-e89b-12d3-a456-426655440000', Tipo: 'Inseminacion' }
const mockCreateResponse = { insertId: '3' }

const mockError = {
  error: true,
  status: 400,
  body: [
    {
      code: 'invalid_type',
      expected: 'string',
      message: 'Required',
      path: ['Fecha'],
      received: 'undefined'
    }
  ]
}

const mockUpdateResponse = {
  affectedRows: 1,
  changedRows: 1
}

const mockNotFoundResponse = {
  affectedRows: 0
}

// Mock del modelo ServicioModel
jest.mock('../../models/servicio.model.js')

describe('Test del controlador de servicio', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // UPDATE
  test('update actualiza un servicio existente correctamente', async () => {
    ServicioModel.updateServicio = jest.fn().mockResolvedValue([mockUpdateResponse])

    const req = {
      params: { id: '1' },
      body: { nombre: 'Servicio Actualizado' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ServicioController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockUpdateResponse
    })
  })

  test('update retorna un error 404 si no se encuentra el servicio', async () => {
    ServicioModel.updateServicio = jest.fn().mockResolvedValue([mockNotFoundResponse])

    const req = {
      params: { id: '999' },
      body: { nombre: 'Servicio No Existente' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ServicioController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontro ningun servicio con el ID 999 para actualizar'
    })
  })

  // GETServicios
  test('getAll retorna una lista de servicios', async () => {
    ServicioModel.getServicios = jest.fn().mockResolvedValue(mockServicioList)

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ServicioController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockServicioList
    })
  })

  test('getServicio retorna un error 404 si no se encuentra el servicio', async () => {
    ServicioModel.getServicios = jest.fn().mockResolvedValue(null)

    const req = {
      params: { id: '999' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ServicioController.getServicio(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: ''
    })
  })

  // CREATE
  test('create agrega un nuevo servicio correctamente', async () => {
    ServicioModel.createServicio = jest.fn().mockResolvedValue(mockCreateResponse)

    const req = {
      body: mockCreateServicio
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ServicioController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockCreateResponse
    })
  })

  test('create retorna un error 400 cuando la validación falla', async () => {
    ServicioModel.createServicio = jest.fn().mockResolvedValue([mockError])

    const req = {
      body: {
        Tipo: 'Inseminacion',
        ResID: '123e4567-e89b-12d3-a456-426655440000'
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ServicioController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith(mockError)
  })

  test('ocurre un error y se va por el try catch', async () => {
    ServicioModel.createServicio = jest.fn().mockRejectedValue(new Error('Error'))

    const req = {
      body: mockCreateServicio
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ServicioController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: 'Error'
    })
  })

  // DELETE
  test('delete elimina un servicio existente', async () => {
    ServicioModel.deleteServicio = jest.fn().mockResolvedValue([{ affectedRows: 1 }])

    const req = {
      params: { id: '1' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ServicioController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: { affectedRows: 1 }
    })
  })

  test('delete retorna un error 404 si no se encuentra el servicio', async () => {
    ServicioModel.deleteServicio = jest.fn().mockResolvedValue([{ affectedRows: 0 }])

    const req = {
      params: { id: '999' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ServicioController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 404,
      body: 'No se encontro ningun servicio con el ID 999 para eliminar'
    })
  })

  // getInseminacionOMonta
  test('getAllInseminacionOMonta retorna una lista de servicios de inseminación o monta', async () => {
    ServicioModel.getInseminacionOMonta = jest.fn().mockResolvedValue(mockServicioList)

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ServicioController.getAllInseminacionOMonta(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockServicioList
    })
  })

  // getAllSecado
  test('getAllSecado retorna una lista de servicios de secado', async () => {
    ServicioModel.getSecado = jest.fn().mockResolvedValue(mockServicioList)

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ServicioController.getAllSecado(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockServicioList
    })
  })

  // getServicioByIdRes
  test('getServicioByIdRes retorna un servicio por ID de res', async () => {
    ServicioModel.getServicioByIdRes = jest.fn().mockResolvedValue(mockServicio)

    const req = {
      params: { id: '1' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ServicioController.getServicioByIdRes(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockServicio
    })
  })

  test('getServicioByIdRes retorna error 404 si no se encuentra el servicio', async () => {
    ServicioModel.getServicioByIdRes = jest.fn().mockResolvedValue(null)

    const req = {
      params: { id: '999' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ServicioController.getServicioByIdRes(req, res)

    expect(res.status).toHaveBeenCalledWith(204)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 204,
      body: 'No se encontró ningun servicio con el ID  de la res999'
    })
  })

  // getInseminacionOMontaById
  test('getInseminacionOMontaById retorna un servicio de inseminación o monta por ID', async () => {
    ServicioModel.getInseminacionOMontaById = jest.fn().mockResolvedValue(mockServicio)

    const req = {
      params: { id: '1' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ServicioController.getInseminacionOMontaById(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockServicio
    })
  })

  test('getInseminacionOMontaById retorna error 404 si no se encuentra el servicio', async () => {
    ServicioModel.getInseminacionOMontaById = jest.fn().mockResolvedValue(null)

    const req = {
      params: { id: '999' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ServicioController.getInseminacionOMontaById(req, res)

    expect(res.status).toHaveBeenCalledWith(204)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 204,
      body: 'No se encontró ningun servicio de inseminación o monta con el ID 999'
    })
  })

  test('getInseminacionOMontaById retorna error 500 si se produce un error', async () => {
    ServicioModel.getInseminacionOMontaById = jest.fn().mockRejectedValue(new Error('Error'))

    const req = {
      params: { id: '1' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ServicioController.getInseminacionOMontaById(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      status: 500,
      body: 'Error'
    })
  })

  // getSecadoByIdRes
  test('getSecadoByIdRes retorna un servicio de secado por ID de res', async () => {
    ServicioModel.getSecadoByIdRes = jest.fn().mockResolvedValue(mockServicio)

    const req = {
      params: { id: '1' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ServicioController.getSecadoByIdRes(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockServicio
    })
  })

  test('getSecadoByIdRes retorna error 404 si no se encuentra el servicio', async () => {
    ServicioModel.getSecadoByIdRes = jest.fn().mockResolvedValue(null)

    const req = {
      params: { id: '999' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ServicioController.getSecadoByIdRes(req, res)

    expect(res.status).toHaveBeenCalledWith(204)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 204,
      body: 'No se encontró ningun servicio de secado con el ID  de la res999'
    })
  })

  // getInseminacionOMontaByIdRes
  test('getInseminacionOMontaByIdRes retorna un servicio de inseminación o monta por ID de res', async () => {
    ServicioModel.getInseminacionOMontaByIdRes = jest.fn().mockResolvedValue(mockServicio)

    const req = {
      params: { id: '1' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ServicioController.getInseminacionOMontaByIdRes(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: mockServicio
    })
  })

  test('getInseminacionOMontaByIdRes retorna error 404 si no se encuentra el servicio', async () => {
    ServicioModel.getInseminacionOMontaByIdRes = jest.fn().mockResolvedValue(null)

    const req = {
      params: { id: '999' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ServicioController.getInseminacionOMontaByIdRes(req, res)

    expect(res.status).toHaveBeenCalledWith(204)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 204,
      body: 'No se encontró ningun servicio de inseminación o monta con el ID  de la res999'
    })
  })
})
