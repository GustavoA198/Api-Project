import { database } from '../database/db.js'

export class ActividadModel {
  static async getAll () {
    return await database.query('SELECT * FROM Actividad')
  }

  static async getActividad (id) {
    return await database.query('SELECT * FROM Actividad WHERE ID = ?', [id])
  }

  static async create (data) {
    const { Fecha, Tipo, TiempoCarencia, LoteID, Observaciones } = data
    const [[{id}]] = await database.query('SELECT UUID() id')
    const result = await database.query(
      'INSERT INTO Actividad (ID, Fecha, Tipo, TiempoCarencia, LoteID, Observaciones) VALUES (?, ?, ?, ?, ?, ?)', [
        id, Fecha, Tipo, TiempoCarencia, LoteID, Observaciones])
    return result
  }

  static async update (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE Actividad SET '
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
    return await database.query('DELETE FROM Actividad WHERE ID = ?', [id])
  }
}
