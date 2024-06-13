import { database } from '../database/db.js'

export class TransaccionModel {
  static async getAll () {
    return database.query('SELECT * FROM Transaccion')
  }

  static async getTransaccionById (id) {
    return database.query('SELECT * FROM Transaccion WHERE id = ?', [id])
  }

  static async create (data) {
    const {Descripcion, Fecha, Valor} = data
    const [[{ id }]] = await database.query('SELECT UUID() id')
    const result = await database.query('INSERT INTO Transaccion (id, Descripcion, Fecha, Valor) VALUES (?, ?, ?, ?)',
      [id, Descripcion, Fecha, Valor])
    return result
  }

  static async update (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE Transaccion SET '
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
    return database.query('DELETE FROM Transaccion WHERE id = ?', [id])
  }
}
