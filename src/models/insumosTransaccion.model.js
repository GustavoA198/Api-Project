import { database } from '../database/db.js'

export class InsumosTransaccionModel {
  static async getAll () {
    return database.query('SELECT * FROM InsumosTransaccion')
  }

  static async getInsumosTransaccionById (id) {
    return database.query('SELECT * FROM InsumosTransaccion WHERE id =  ?', [id])
  }

  static async create (data) {
    const {Cantidad, ValorUnitario, InsumoID, TransaccionID} = data
    const [[{ id }]] = await database.query('SELECT UUID() id')
    const result = await database.query('INSERT INTO InsumosTransaccion (id, Cantidad, ValorUnitario, InsumoID, TransaccionID) VALUES (?, ?, ?, ?, ?)',
      [id, Cantidad, ValorUnitario, InsumoID, TransaccionID])
    return result
  }

  static async update (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE InsumosTransaccion SET '
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
    return database.query('DELETE FROM InsumosTransaccion WHERE id = ?', [id])
  }
}
