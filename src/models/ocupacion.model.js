import { database } from '../database/db.js'

export class OcupacionModel {
  static async getAll () {
    return await database.execute('SELECT * FROM Ocupacion')
  }

  static async getOcupacion (id) {
    return await database.execute('SELECT * FROM Ocupacion WHERE id = ?', [id])
  }

  static async create (data) {
    const { NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID } = data
    const [[{ id }]] = await database.query('SELECT UUID() id')
    const result = await database.execute(
      'INSERT INTO Ocupacion (ID, NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID) VALUES (?, ?, ?, ?, ?, ?)', [
        id, NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID])
    return result
  }

  static async update (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE Ocupacion SET '
    keys.forEach((key, index) => {
      query += `${key} = ?`
      if (index < keys.length - 1) {
        query += ', '
      }
    })
    query += ' WHERE ID = ?'
    values.push(id)
    return await database.execute(query, values)
  }

  static async delete (id) {
    return await database.execute('DELETE FROM Ocupacion WHERE ID = ?', [id])
  }
}
