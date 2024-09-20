import { database } from '../database/db.js'

export class ParaInseminarModel {
  static async getAll () {
    return await database.query(`
      SELECT Pi.*, R.Nombre AS ResNombre 
      FROM ParaInseminar Pi
      JOIN Res R ON Pi.ResID = R.ID
      WHERE Pi.Estado =  ?`,
      ['Pendiente'])
  }

  static async getParaInseminar (id) {
    return await database.query(`
      SELECT Pi.*, R.Nombre AS ResNombre 
      FROM ParaInseminar Pi
      JOIN Res R ON Pi.ResID = R.ID 
      WHERE Pi.id = ?`, [id])
  }

  static async create (data) {
    const { Fecha, Observaciones, ResID, Estado } = data
    const [[{ id }]] = await database.query('SELECT UUID() id')
    const result = await database.query(
      'INSERT INTO ParaInseminar (ID, Fecha, Observaciones, ResID, Estado ) VALUES (?, ?, ?, ?, ?)',
      [ id, Fecha, Observaciones, ResID, Estado ])
    return result
  }

  static async update (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE ParaInseminar SET '
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
    return await database.query('DELETE FROM ParaInseminar WHERE ID = ?', [id])
  }
}
