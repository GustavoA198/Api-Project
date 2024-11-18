import { database } from '../database/db.js'

export class UsuarioModel {
  static async getAll () {
    return database.query('SELECT * FROM Usuario')
  }

  static async getUsuarioById (id) {
    return database.query('SELECT * FROM Usuario WHERE id = ?', [id])
  }

  static async getUsuarioByEmail (email) {
    return database.query('SELECT * FROM Usuario WHERE Email = ?', [email])
  }

  static async create (data) {
    const {Tipo, Identificacion, Nombre, Direccion, Telefono, Email, Contrasena} = data
    const [[{ id }]] = await database.query('SELECT UUID() id')
    const result = await database.query('INSERT INTO Usuario (id, Tipo, Identificacion, Nombre, Direccion, Telefono, Email, Contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, Tipo, Identificacion, Nombre, Direccion, Telefono, Email, Contrasena])
    return result
  }

  static async update (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE Usuario SET '
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
    return database.query('DELETE FROM Usuario WHERE id = ?', [id])
  }
}
