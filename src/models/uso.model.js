import { database } from '../database/db.js'

export class UsoModel {
  static async getAll () {
    return database.query('SELECT * FROM Uso')
  }

  static async getUsoById (id) {
    return database.query('SELECT * FROM Uso WHERE id = ?', [id])
  }

  static async getUsoByIdServicio (ServicioID) {
    return database.query('SELECT * FROM Uso WHERE ServicioID = ?', [ServicioID])
  }

  static async create (data) {
    const {Justificacion, Fecha, Cantidad, ProductoID} = data
    const [[{ id }]] = await database.query('SELECT UUID() id')
    const result = await database.query('INSERT INTO Uso (id, Justificacion, Fecha, Cantidad, ProductoID) VALUES (?, ?, ?, ?, ?)',
      [id, Justificacion, Fecha, Cantidad, ProductoID])
    return result
  }

  static async update (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE Uso SET '
    keys.forEach((key, index) => {
      query += `${key} = ?`
      if (index < keys.length - 1) {
        query += ', '
      }
    })
    query += ' WHERE id = ?'
    values.push(id)
    return database.query(query, values)
  }

  static async delete (id) {
    return database.query('DELETE FROM Uso WHERE id = ?', [id])
  }
}
