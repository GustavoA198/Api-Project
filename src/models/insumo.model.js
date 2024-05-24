import { database } from '../database/db.js'

export class InsumoModel {
  static async getAll () {
    return await database.query('SELECT * FROM Insumo')
  }

  static async getInsumo (id) {
    return await database.query('SELECT * FROM Insumo WHERE ID = ?', [id])
  }

  static async create (data) {
    const { Nombre, FechaIngreso, CantidadActual, FechaVencimiento, Observaciones } = data
    const [[{ id }]] = await database.query('SELECT UUID() id')
    const result = await database.query(
      'INSERT INTO Insumo (ID, Nombre, FechaIngreso, CantidadActual, FechaVencimiento, Observaciones) VALUES (?, ?, ?, ?, ?, ?)',
      [id, Nombre, FechaIngreso, CantidadActual, FechaVencimiento, Observaciones]
    )
    return result
  }

  static async update (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE Insumo SET '
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
    return await database.query('DELETE FROM Insumo WHERE ID = ?', [id])
  }
}
