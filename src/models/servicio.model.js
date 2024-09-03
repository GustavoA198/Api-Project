import { database } from '../database/db.js'

export class ServicioModel {
  static async getServicios () {
    return await database.query('SELECT * FROM Servicio')
  }

  static async getServicioById (id) {
    return await database.query('SELECT * FROM Servicio WHERE id = ?', [id])
  }

  static async getServicioByIdRes (ResID) {
    return await database.query('SELECT * FROM Servicio WHERE ResID = ?', [ResID])
  }

  static async getInseminacionOMontaByIdRes (ResID) {
    const result = await database.query(`
        SELECT s.*, m.*, i.* 
        FROM Servicio s
        LEFT JOIN Monta m ON s.ID = m.ServicioID
        LEFT JOIN Inseminacion i ON s.ID = i.ServicioID
        WHERE s.ResID = ? AND (s.Tipo = "Inseminacion" OR s.Tipo = "Monta")
    `, [ResID])

    return result
  }

  static async getSecadoByIdRes (ResID) {
    return await database.query('SELECT * FROM Servicio WHERE ResID = ? and Tipo = "Secado"', [ResID])
  }

  static async createServicio (data) {
    console.log(data)
    const { Tipo, Fecha, Veterinario, Observaciones, ResID } = data
    const [[{ id }]] = await database.query('SELECT UUID() id')
    const result = await database.query('INSERT INTO Servicio (id, Tipo, Fecha, Veterinario, Observaciones, ResID) VALUES (?, ?, ?, ?, ?, ?)',
      [id, Tipo, Fecha, Veterinario, Observaciones, ResID])
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
