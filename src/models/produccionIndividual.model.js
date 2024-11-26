import { database } from '../database/db.js'

export class ProduccionIndividualModel {
  static async getProduccionIndividuals () {
    return await database.query(`
      SELECT p.*, r.Nombre as ResNombre
      FROM ProduccionIndividual p
      INNER JOIN Res r ON p.ResID = r.ID`)
  }

  static async getProduccionIndividualById (id) {
    return await database.query(`
      SELECT p.*, r.Nombre as ResNombre 
      FROM ProduccionIndividual p
      INNER JOIN Res r ON p.ResID = r.ID
      WHERE p.id = ?`, [id])
  }

  static async getProduccionIndividualByFecha (id, FechaInicio, FechaFin) {
    return await database.query(`
      SELECT p.Fecha, p.Cantidad
      FROM ProduccionIndividual p
      WHERE p.ResID = ? AND p.Fecha BETWEEN ? AND ?`, [id, FechaInicio, FechaFin])
  }

  static async createProduccionIndividual ({Fecha, Tipo, Cantidad, ResID}) {
    if (Tipo === 'Carne') {
      await database.query('UPDATE Res SET Estado = "Vendida" WHERE id = ?', [ResID])
    }
    const [[{ id }]] = await database.query('SELECT UUID() id')
    await database.query('UPDATE producto SET Cantidad = Cantidad + ? WHERE Nombre = ?', [Cantidad, Tipo])
    const result = await database.query('INSERT INTO ProduccionIndividual (id, Fecha, Tipo, Cantidad, ResID) VALUES (?, ?, ?, ?, ?)',
      [id, Fecha, Tipo, Cantidad, ResID])
    return result
  }

  static async updateProduccionIndividual (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE ProduccionIndividual SET '
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

  static async deleteProduccionIndividual (id) {
    return await database.query('DELETE FROM ProduccionIndividual WHERE id = ?', [id])
  }
}
