import { database } from '../database/db.js'

export class ClienteModel {
  static async getAll () {
    return await database.query(`
      SELECT p.ID, p.Identificacion, p.Nombre, p.Direccion, p.Telefono, p.Email
      FROM Cliente c
      JOIN Persona p ON c.ID = p.ID`)
  }

  static async getCliente (id) {
    return await database.query(`
      SELECT p.ID, p.Identificacion, p.Nombre, p.Direccion, p.Telefono, p.Email
      FROM Cliente c
      JOIN Persona p ON c.ID = p.ID
      WHERE p.ID = ?`, [id])
  }

  static async create (data) {
    const { Identificacion, Nombre, Dirección, Telefono, Email } = data
    const [[{id}]] = await database.query('SELECT UUID() id')
    const connection = await database.getConnection()

    await connection.beginTransaction()
    try {
      const result = await connection.query(
        `INSERT INTO Persona (ID, Identificacion, Nombre, Direccion, Telefono, Email) 
         VALUES (?, ?, ?, ?, ?, ?)`,
         [id, Identificacion, Nombre, Dirección, Telefono, Email])

      await connection.query(
      `INSERT INTO Cliente (ID)
        VALUES (?)`,
        [id])

      await connection.commit()
      return result
    } catch (e) {
      await connection.rollback()
      throw e
    } finally {
      connection.release()
    }
  }

  static async update (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE Persona SET '
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
    const connection = await database.getConnection()
    await connection.beginTransaction()
    try {
      await connection.query('DELETE FROM Cliente WHERE ID = ?', [id])
      const result = await connection.query('DELETE FROM Persona WHERE ID = ?', [id])
      await connection.commit()
      return result
    } catch (e) {
      await connection.rollback()
      throw e
    } finally {
      connection.release()
    }
  }

}
