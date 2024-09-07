import { database } from '../database/db.js'

export class ResModel {
  static async getAll () {
    return await database.query(
      `SELECT r.*, f.Nombre as FincaNombre
       FROM Res r
       INNER JOIN Finca f ON r.FincaID = f.ID 
       WHERE r.Estado = ?`, ['Activa'])
  }

  static async getRes (id) {
    return await database.query(`
      SELECT r.*, f.Nombre as FincaNombre 
      FROM Res r
      INNER JOIN Finca f ON r.FincaID = f.ID
      WHERE r.ID = ? `, [id])
  }

  static async getHijos (id) {
    return await database.query('SELECT * FROM Res WHERE Madre = ? OR Padre = ?', [id, id])
  }

  static async create (data) {
    const { Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID } = data
    const [[{id}]] = await database.query('SELECT UUID() id')
    const result = await database.query(
      'INSERT INTO Res (ID, Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        id, Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID])
    return result
  }

  static async update (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE Res SET '
    keys.forEach((key, index) => {
      query += `${key} = ?`
      if (index < keys.length - 1) {
        query += ', '
      }
    })
    query += ' WHERE ID = ?'
    values.push(id)
    return await database.query(query, values)
  }

  static async delete (id) {
    return await database.query('UPDATE Res SET Estado = ? WHERE ID = ? ', ['Muerte', id])
  }
}
