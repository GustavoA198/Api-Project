import { database } from '../database/db.js'

export class ProduccionIndividualModel {
  static async getProduccionIndividuals () {
    return await database.query('SELECT * FROM ProduccionIndividual')
  }

  static async getProduccionIndividualById (id) {
    return await database.query('SELECT * FROM ProduccionIndividual WHERE id = ?', [id])
  }

  static async createProduccionIndividual (data) {
    const { Fecha, Tipo, Cantidad, ResID } = data
    const [[{ id }]] = await database.query('SELECT UUID() id')
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
