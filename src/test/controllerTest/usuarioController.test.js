/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { UsuarioController } from '../../controllers/usuario.controller.js'
import { UsuarioModel } from '../../models/usuario.model.js'

jest.mock('../../models/usuario.model.js')

const mockUsuario = { Tipo: 'admin', Nombre: 'Juan', Email: 'juanperez@gmail.com', Contrasena: '123456' }
const badResponse = {
  body: [
    {
      code: 'invalid_type',
      expected: 'string',
      message: 'Expected string, received number',
      path: ['Contrasena'],
      received: 'number'
    }
  ]
}

describe('test del controlador de usuario', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // GET ALL
  test('debería obtener todos los usuarios', async () => {
    UsuarioModel.getAll = jest.fn().mockResolvedValue([mockUsuario])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsuarioController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      'error': false,
      'status': 200,
      'body': mockUsuario
    })
  })

  test('debería obtener un error al obtener todos los usuarios', async () => {
    UsuarioModel.getAll = jest.fn().mockRejectedValue(new Error('Error al obtener los usuarios'))

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsuarioController.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      'error': true,
      'status': 500,
      'body': 'Error al obtener los usuarios'
    })
  })

  // getUsuario
  test('debería obtener un error al obtener un usuario por id', async () => {
    UsuarioModel.getUsuarioById = jest.fn().mockRejectedValue(new Error('Error al obtener el usuario'))

    const req = {
      params: {
        id: 1
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsuarioController.getUsuario(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      'error': true,
      'status': 500,
      'body': 'Error al obtener el usuario'
    })
  })

  test('debería obtener un error al obtener un usuario por id', async () => {
    UsuarioModel.getUsuarioById = jest.fn().mockResolvedValue([])

    const req = {
      params: {
        id: 1
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsuarioController.getUsuario(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      'error': true,
      'status': 404,
      'body': 'No se encontró ningun usuario con el ID 1'
    })
  })

  test('debería obtener un usuario por id', async () => {
    UsuarioModel.getUsuarioById = jest.fn().mockResolvedValue([mockUsuario])

    const req = {
      params: {
        id: 1
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsuarioController.getUsuario(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      'error': false,
      'status': 200,
      'body': mockUsuario
    })
  })

  // create
  test('debería crear un nuevo usuario', async () => {
    UsuarioModel.create = jest.fn().mockResolvedValue([mockUsuario])

    const req = {
      body: mockUsuario
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsuarioController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      'error': false,
      'status': 200,
      'body': [mockUsuario]
    })
  })

  test('debería obtener un error al crear un usuario', async () => {
    UsuarioModel.create = jest.fn().mockRejectedValue(new Error('Error al crear el usuario'))

    const req = {
      body: mockUsuario
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsuarioController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      'error': true,
      'status': 500,
      'body': 'Error al crear el usuario'
    })
  })

  test('debería obtener un error al crear un usuario con datos incorrectos', async () => {
    UsuarioModel.create = jest.fn().mockRejectedValue(new Error('Error al crear el usuario'))

    const req = {
      body: { Tipo: 'admin', Nombre: 'Juan', Email: 'juan@gmail.com', Contrasena: 123456 }
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsuarioController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      'error': true,
      'status': 400,
      'body': badResponse.body
    })
  })

  // update
  test('debería actualizar un usuario existente', async () => {
    const responseModel = { affectedRows: 1, changedRows: 1 }
    UsuarioModel.update = jest.fn().mockResolvedValue([responseModel])

    const req = {
      params: {
        id: 1
      },
      body: mockUsuario
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsuarioController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      'error': false,
      'status': 200,
      'body': responseModel
    })
  })

  test('debería obtener un error al actualizar un usuario', async () => {
    UsuarioModel.update = jest.fn().mockRejectedValue(new Error('Error al actualizar el usuario'))

    const req = {
      params: {
        id: 1
      },
      body: mockUsuario
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsuarioController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      'error': true,
      'status': 500,
      'body': 'Error al actualizar el usuario'
    })
  })

  test('debería obtener un error al no encontrar un usuario para actualizar', async () => {
    UsuarioModel.update = jest.fn().mockResolvedValue([{ affectedRows: 0, changedRows: null }])

    const req = {
      params: {
        id: 1
      },
      body: mockUsuario
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsuarioController.update(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      'error': true,
      'status': 404,
      'body': 'No se encontro ningun usuario con el ID 1 para actualizar'
    })
  })

  // delete
  test('debería obtener un error al eliminar un usuario', async () => {
    UsuarioModel.delete = jest.fn().mockRejectedValue(new Error('Error al eliminar el usuario'))

    const req = {
      params: {
        id: 1
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await UsuarioController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      'error': true,
      'status': 500,
      'body': 'Error al eliminar el usuario'
    })
  })
})
