import { database } from '../database/db.js'

export class ServicioModel {
  static async getServicios () {
    return await database.query('SELECT * FROM Servicio')
  }

  static async getServicioById (id) {
    return await database.query('SELECT * FROM Servicio WHERE id = ?', [id])
  }

  static async createServicio (data) {
    const { Tipo, Fecha, Veterinario, Observaciones } = data
    const [[{ id }]] = await database.query('SELECT UUID() id')
    const result = await database.query('INSERT INTO Servicio (id, Tipo, Fecha, Veterinario, Observaciones) VALUES (?, ?, ?, ?, ?)',
      [id, Tipo, Fecha, Veterinario, Observaciones])
    return result
  }

  static async updateServicio (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE Servicio SET '
    keys.forEach((key, index) => {
      query += `${key} = ?`
      if (index < keys.length - 1) {
        query += ', '
      }
    })
    query += ' WHERE id = ?'
    values.push(id)
    return await database.query(query, values)
  }

  static async deleteServicio (id) {
    return await database.query('DELETE FROM Servicio WHERE id = ?', [id])
  }
}
