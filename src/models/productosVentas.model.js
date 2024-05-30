import { database } from '../database/db.js'

export class ProductosVentasModel {
  static async getAll () {
    return await database.execute('SELECT * FROM ProductosVentas')
  }

  static async getProductosVentas (id) {
    return await database.execute('SELECT * FROM ProductosVentas WHERE id = ?', [id])
  }

  static async create (data) {
    const { PrecioUnitario, Cantidad, ProductoID, VentaID } = data
    const [[{ id }]] = await database.query('SELECT UUID() id')
    const result = await database.execute(
      'INSERT INTO ProductosVentas (ID, PrecioUnitario, Cantidad, ProductoID, VentaID) VALUES (?, ?, ?, ?, ?)', [
        id, PrecioUnitario, Cantidad, ProductoID, VentaID])
    return result
  }

  static async update (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE ProductosVentas SET '
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
    return await database.execute('DELETE FROM ProductosVentas WHERE ID = ?', [id])
  }
}
