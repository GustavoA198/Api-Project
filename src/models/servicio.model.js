import { database } from '../database/db.js'

export class ServicioModel {
  static async getServicios () {
    const [ids] = await database.query('SELECT ID FROM Servicio')

    let serviciosWithInsumos = []
    for (const id of ids) {
      const servicio = await this.getServicioById(id.ID)
      serviciosWithInsumos.push(servicio)
    }

    return serviciosWithInsumos
  }

  static async getInseminacionOMonta () {
    const [ids] = await database.query(
      `SELECT ID 
      FROM Servicio 
      WHERE Tipo = "Inseminacion" OR Tipo = "Monta"`)

    let serviciosWithInsumos = []
    for (const id of ids) {
      const servicio = await this.getInseminacionOMontaById(id.ID)
      serviciosWithInsumos.push(servicio)
    }

    return serviciosWithInsumos
  }

  static async getServicioById (id) {
    const [[servicio]] = await database.query(`SELECT s.*, r.Nombre as ResNombre
                                              FROM Servicio s
                                              INNER JOIN Res r ON r.ID = s.ResID 
                                              WHERE s.id = ?`, [id])

    const [listInsumos] = await database.query(`SELECT i.Nombre
                                FROM Servicio s INNER JOIN InsumoServicio  ins ON s.ID = ins.ServicioID
                                INNER JOIN Insumo i ON i.ID = ins.InsumoID                                
                                WHERE s.ID = ?`, [id])

    const listInsumosToString = listInsumos.map(insumo => insumo.Nombre).join(', ')

    return { ...servicio, listInsumos: listInsumosToString }
  }

  static async getInseminacionOMontaById (id) {
    const [[servicio]] = await database.query(`
        SELECT s.*, m.FechaParto, m.ToroID, i.FechaParto, r.Nombre as ResNombre, toro.Nombre as ToroNombre 
        FROM Servicio s
        LEFT JOIN Monta m ON s.ID = m.ServicioID
        LEFT JOIN Inseminacion i ON s.ID = i.ServicioID
        INNER JOIN Res r ON r.ID = s.ResID
        LEFT JOIN Res toro ON toro.ID = m.ToroID
        WHERE s.ID = ? AND (s.Tipo = "Inseminacion" OR s.Tipo = "Monta")`
        , [id])

    if (!servicio) {
      return null
    }

    const [listInsumos] = await database.query(
      `SELECT i.ID, i.Nombre, ins.Cantidad
      FROM Servicio s INNER JOIN InsumoServicio  ins ON s.ID = ins.ServicioID
      INNER JOIN Insumo i ON i.ID = ins.InsumoID
      WHERE s.ID = ?`, [id])

    const listInsumosToString = listInsumos.map(insumo => insumo.Nombre).join(', ')
    return { ...servicio, listInsumos: listInsumosToString }
  }

  static async getServicioByIdRes (ResID) {
    const [ids] = await database.query(`SELECT ID FROM Servicio WHERE ResID = ?`, [ResID])

    let serviciosWithInsumos = []
    for (const id of ids) {
      const servicio = await this.getServicioById(id.ID)
      serviciosWithInsumos.push(servicio)
    }

    return serviciosWithInsumos
  }

  static async getInseminacionOMontaByIdRes (ResID) {
    const [ids] = await database.query(
      `SELECT ID 
      FROM Servicio 
      WHERE ResID = ? AND (Tipo = "Inseminacion" OR Tipo = "Monta")`
      , [ResID])

    let serviciosWithInsumos = []
    for (const id of ids) {
      const servicio = await this.getInseminacionOMontaById(id.ID)
      serviciosWithInsumos.push(servicio)
    }

    return serviciosWithInsumos
  }

  static async getSecadoByIdRes (ResID) {
    const [ids] = await database.query('SELECT ID FROM Servicio WHERE ResID = ? and Tipo = "Secado"', [ResID])

    let serviciosWithInsumos = []
    for (const id of ids) {
      const servicio = await this.getServicioById(id.ID)
      serviciosWithInsumos.push(servicio)
    }

    return serviciosWithInsumos
  }

  static async createServicio (data) {
    const connection = await database.getConnection()
    try {
      const { Tipo, Fecha, Veterinario, Observaciones, ResID, listInsumos } = data

      await connection.beginTransaction()

      const [[{ id }]] = await connection.query('SELECT UUID() id')

      // Insertar servicio
      await connection.query(`
        INSERT INTO Servicio 
        (id, Tipo, Fecha, Veterinario, Observaciones, ResID) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [id, Tipo, Fecha, Veterinario, Observaciones, ResID])

      for (const insumo of listInsumos) {
        const [[{id: idRegistro}]] = await connection.query('SELECT UUID() id')

        // Insertar insumos
        await connection.query(
          'INSERT INTO InsumoServicio (id, InsumoID, ServicioID, Cantidad) VALUES (?, ?, ?, ?)',
          [idRegistro, insumo.InsumoID, id, insumo.Cantidad])

        // Actualizar cantidad de insumos
        await connection.query(`
          UPDATE Insumo 
          SET CantidadActual = CantidadActual - ? 
          WHERE ID = ?`,
          [insumo.Cantidad, insumo.InsumoID])
      }

      // insertar inseminacion
      if (Tipo === 'Inseminacion') {
        const [[{ id: idInseminacion }]] = await connection.query('SELECT UUID() id')
        const { FechaParto } = data
        await connection.query(
          'INSERT INTO Inseminacion (id, ServicioID, FechaParto) VALUES (?, ?, ?)',
          [idInseminacion, id, FechaParto])
      }

      // insertar monta
      if (Tipo === 'Monta') {
        const [[{ id: idMonta }]] = await connection.query('SELECT UUID() id')
        const { FechaParto, ToroID } = data
        await connection.query(
          'INSERT INTO Monta (id, ServicioID, FechaParto, ToroID) VALUES (?, ?, ?, ?)',
          [idMonta, id, FechaParto, ToroID])
      }
      // si todo salió bien se hace commit
      await connection.commit()
      return (true)
    } catch (e) {
      await connection.rollback()
      return (false)
    } finally {
      connection.release()
    }
  }

  static async updateServicio (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)

    if (data.FechaParto) {
      if (data.Tipo === 'Monta') {
        await database.query('UPDATE Monta SET FechaParto = ? WHERE ServicioID = ?', [data.FechaParto, id])
      } else if (data.Tipo === 'Inseminacion') {
        await database.query('UPDATE Inseminacion SET FechaParto = ? WHERE ServicioID = ?', [data.FechaParto, id])
      }
    }
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
