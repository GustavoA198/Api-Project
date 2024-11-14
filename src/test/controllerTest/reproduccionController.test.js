/* eslint-disable no-undef */
import { jest } from '@jest/globals'
import { ReproduccionController } from '../../controllers/reproduccion.controller.js'
import { ReproduccionModel } from '../../models/reproduccion.model.js'

jest.mock('../../models/reproduccion.model.js')

describe('Test del controlador de ReproduccionController', () => {
  // GET EN GESTACION
  test('getEnGestacion devuelve todos los registros de Reproduccion correctamente', async () => {
    ReproduccionModel.getEnGestacion = jest.fn().mockResolvedValue([{ id: 1, nombre: 'Reproduccion 1' }])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ReproduccionController.getEnGestacion(req, res)

    expect(ReproduccionModel.getEnGestacion).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: [{ id: 1, nombre: 'Reproduccion 1' }]
    })
  })

  test('getEnGestacion maneja errores', async () => {
    const errorMessage = 'Error al obtener registros'
    ReproduccionModel.getEnGestacion = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ReproduccionController.getEnGestacion(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('getEnGestacion maneja registros vacios', async () => {
    ReproduccionModel.getEnGestacion = jest.fn().mockResolvedValue([])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ReproduccionController.getEnGestacion(req, res)

    expect(res.status).toHaveBeenCalledWith(204)
  })

  // GET PARA SECADO
  test('getParaSecado devuelve todos los registros de Reproduccion correctamente', async () => {
    ReproduccionModel.getParaSecado = jest.fn().mockResolvedValue([{ id: 1, nombre: 'Reproduccion 1' }])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ReproduccionController.getParaSecado(req, res)

    expect(ReproduccionModel.getParaSecado).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: [{ id: 1, nombre: 'Reproduccion 1' }]
    })
  })

  test('getParaSecado maneja errores', async () => {
    const errorMessage = 'Error al obtener registros'
    ReproduccionModel.getParaSecado = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ReproduccionController.getParaSecado(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('getParaSecado maneja registros vacios', async () => {
    ReproduccionModel.getParaSecado = jest.fn().mockResolvedValue([])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ReproduccionController.getParaSecado(req, res)

    expect(res.status).toHaveBeenCalledWith(204)
  })

  // GET POR CONFIRMAR
  test('getPorConfirmar devuelve todos los registros de Reproduccion correctamente', async () => {
    ReproduccionModel.getPorConfirmar = jest.fn().mockResolvedValue([{ id: 1, nombre: 'Reproduccion 1' }])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ReproduccionController.getPorConfirmar(req, res)

    expect(ReproduccionModel.getPorConfirmar).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: { id: 1, nombre: 'Reproduccion 1' }
    })
  })

  test('getPorConfirmar maneja errores', async () => {
    const errorMessage = 'Error al obtener registros'
    ReproduccionModel.getPorConfirmar = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ReproduccionController.getPorConfirmar(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('getPorConfirmar maneja registros vacios', async () => {
    ReproduccionModel.getPorConfirmar = jest.fn().mockResolvedValue([])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ReproduccionController.getPorConfirmar(req, res)

    expect(res.status).toHaveBeenCalledWith(204)
  })

  // CONFIRMAR INSEMINACION
  test('confirmarInseminacion devuelve un registro de Reproduccion correctamente', async () => {
    ReproduccionModel.confirmarInseminacion = jest.fn().mockResolvedValue({ id: 1, nombre: 'Reproduccion 1' })

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ReproduccionController.confirmarInseminacion(req, res)

    expect(ReproduccionModel.confirmarInseminacion).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: { id: 1, nombre: 'Reproduccion 1' }
    })
  })

  test('confirmarInseminacion maneja errores', async () => {
    const errorMessage = 'Error al obtener el registro'
    ReproduccionModel.confirmarInseminacion = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ReproduccionController.confirmarInseminacion(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('confirmarInseminacion maneja registros vacios', async () => {
    ReproduccionModel.confirmarInseminacion = jest.fn().mockResolvedValue(null)

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ReproduccionController.confirmarInseminacion(req, res)

    expect(res.status).toHaveBeenCalledWith(204)
  })

  // INSEMINACION FALLIDA
  test('inseminacionFallida devuelve un registro de Reproduccion correctamente', async () => {
    ReproduccionModel.inseminacionFallida = jest.fn().mockResolvedValue({ id: 1, nombre: 'Reproduccion 1' })

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ReproduccionController.inseminacionFallida(req, res)

    expect(ReproduccionModel.inseminacionFallida).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: { id: 1, nombre: 'Reproduccion 1' }
    })
  })

  test('inseminacionFallida maneja errores', async () => {
    const errorMessage = 'Error al obtener el registro'
    ReproduccionModel.inseminacionFallida = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ReproduccionController.inseminacionFallida(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('inseminacionFallida maneja registros vacios', async () => {
    ReproduccionModel.inseminacionFallida = jest.fn().mockResolvedValue(null)

    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ReproduccionController.inseminacionFallida(req, res)

    expect(res.status).toHaveBeenCalledWith(204)
  })

  // GET PARTOS
  test('getPartos devuelve todos los registros de Reproduccion correctamente', async () => {
    ReproduccionModel.getPartos = jest.fn().mockResolvedValue([{ id: 1, nombre: 'Reproduccion 1' }])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ReproduccionController.getPartos(req, res)

    expect(ReproduccionModel.getPartos).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 200,
      body: { id: 1, nombre: 'Reproduccion 1' }
    })
  })

  test('getPartos maneja errores', async () => {
    const errorMessage = 'Error al obtener registros'
    ReproduccionModel.getPartos = jest.fn().mockRejectedValue(new Error(errorMessage))

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ReproduccionController.getPartos(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('getPartos maneja registros vacios', async () => {
    ReproduccionModel.getPartos = jest.fn().mockResolvedValue([])

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await ReproduccionController.getPartos(req, res)

    expect(res.status).toHaveBeenCalledWith(204)
  })
})
