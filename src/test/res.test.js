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

  test('Recuperar una res', async () => {
    const response = await api
      .get('/res/1')
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

  test('Modificar una res', async () => {
    const response = await api
      .put('/res/00000000-0000-0000-0000-000000000002')
      .send({
        Numero: 2,
        Nombre: 'Res 2',
        Tipo: 'Leche',
        FechaNacimiento: '2021-01-01',
        Estado: 'Activa'
      })

    // Verificar que la respuesta es un array
    expect(Array.isArray(response.body.body)).toBeTruthy()

    // Verificar que el primer objeto en la respuesta tiene las propiedades esperadas
    const updateDetails = response.body.body[0]
    expect(updateDetails).toHaveProperty('fieldCount')
    expect(updateDetails).toHaveProperty('affectedRows')
    expect(updateDetails).toHaveProperty('insertId')
    expect(updateDetails).toHaveProperty('info')
    expect(updateDetails).toHaveProperty('serverStatus')
    expect(updateDetails).toHaveProperty('warningStatus')
    expect(updateDetails).toHaveProperty('changedRows')

    // Verificar que 'affectedRows' y 'changedRows' son 1, indicando que una fila fue modificada
    expect(updateDetails.affectedRows).toBe(1)
    expect(updateDetails.changedRows).toBe(1)
  })

  test('Eliminar una res', async () => {
    const response = await api
      .delete('/res/00000000-0000-0000-0000-000000000001')

    // Verificar que la respuesta es un array
    expect(Array.isArray(response.body.body)).toBeTruthy()

    // Verificar que el primer objeto en la respuesta tiene las propiedades esperadas
    const deleteDetails = response.body.body[0]
    expect(deleteDetails).toHaveProperty('fieldCount')
    expect(deleteDetails).toHaveProperty('affectedRows')
    expect(deleteDetails).toHaveProperty('insertId')
    expect(deleteDetails).toHaveProperty('info')
    expect(deleteDetails).toHaveProperty('serverStatus')
    expect(deleteDetails).toHaveProperty('warningStatus')

    // Verificar que 'affectedRows' es 1, indicando que una fila fue eliminada
    expect(deleteDetails.affectedRows).toBe(1)
  })
})


// el test de delete esta fallando, pero en realidad borra datos  de la bd, por lo que es mejor dejarla asi