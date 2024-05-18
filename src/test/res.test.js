/* eslint-disable no-undef */
import supertest from 'supertest'
import app from '../../app.js'

const api = supertest(app)

describe('GET /res', () => {
  test('Recuperar todos las reses', async () => {
    const response = await api
      .get('/res')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // Verificar que la respuesta es un array
    expect(Array.isArray(response.body.body)).toBeTruthy()

    // Verificar que cada objeto en la respuesta tiene las propiedades esperadas
    response.body.body.forEach(res => {
      expect(res).toHaveProperty('ID')
      expect(res).toHaveProperty('Numero')
      expect(res).toHaveProperty('Nombre')
      expect(res).toHaveProperty('Tipo')
      expect(res).toHaveProperty('FechaNacimiento')
      expect(res).toHaveProperty('Estado')
      expect(res).toHaveProperty('Madre')
      expect(res).toHaveProperty('Padre')
      expect(res).toHaveProperty('PesoActual')
      expect(res).toHaveProperty('PesoNacimiento')
      expect(res).toHaveProperty('Sexo')
      expect(res).toHaveProperty('Raza')
      expect(res).toHaveProperty('NumeroPartos')
      expect(res).toHaveProperty('RegistroICA')
      expect(res).toHaveProperty('Observaciones')
      expect(res).toHaveProperty('FincaID')
    })
  })
})
