import { database } from '../database/db.js'

export class ResModel {
  static async getAll () {
    return await database.query('SELECT * FROM Res')
  }

  static async create (data) {
    const { nombre, fechaNacimiento, madre, padre, pesoActual, pesoNacimiento, sexo, raza, numeroPartos, registroICA, fincaID } = data
    const [[{id}]] = await database.query('SELECT UUID() id')
    const result = await database.query(
      'INSERT INTO res VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
      [id, nombre, fechaNacimiento, madre, padre, pesoActual, pesoNacimiento, sexo, raza, numeroPartos, registroICA, fincaID])
    return result
  }
}
