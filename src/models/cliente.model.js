import { database } from '../database/db.js'

export class ClienteModel {
  static async getAll () {
    return await database.query('SELECT * FROM Cliente')
  }

  static async getCliente (id) {
    return await database.query('SELECT * FROM Cliente WHERE ID = ?', [id])
  }

  static async create (data) {
    const { Identificacion, Nombre, Dirección, Telefono, Email } = data
    const [[{id}]] = await database.query('SELECT UUID() id')
    const result = await database.query(
      'INSERT INTO Cliente (ID, Identificacion, Nombre, Direccion, Telefono, Email) VALUES (?, ?, ?, ?, ?, ?)', [
        id, Identificacion, Nombre, Dirección, Telefono, Email])
    return result
  }

  static async update (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE Cliente SET '
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
    return await database.query('DELETE FROM Cliente WHERE ID = ?', [id])
  }
}
