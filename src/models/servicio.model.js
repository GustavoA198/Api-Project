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

  static async getServicioById (id) {
    const [[servicio]] = await database.query(`SELECT s.*, r.Nombre as ResNombre
                                              FROM Servicio s
                                              INNER JOIN res r ON r.ID = s.ResID 
                                              WHERE s.id = ?`, [id])

    const [listInsumos] = await database.query(`SELECT i.ID, i.Nombre, ins.Cantidad
                                FROM SERVICIO s INNER JOIN INSUMOSERVICIO ins ON s.ID = ins.ServicioID
                                INNER JOIN insumo i ON i.ID = ins.InsumoID                                
                                WHERE s.ID = ?`, [id])
    return { ...servicio, listInsumos }
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

  static async getInseminacionOMontaById (id) {
    const [[servicio]] = await database.query(`
        SELECT s.*, m.FechaParto, m.ToroID, i.FechaParto, r.Nombre as ResNombre, toro.Nombre as ToroNombre 
        FROM Servicio s
        LEFT JOIN Monta m ON s.ID = m.ServicioID
        LEFT JOIN Inseminacion i ON s.ID = i.ServicioID
        INNER JOIN res r ON r.ID = s.ResID
        LEFT JOIN res toro ON toro.ID = m.ToroID
        WHERE s.ID = ? AND (s.Tipo = "Inseminacion" OR s.Tipo = "Monta")`
        , [id])

    if (!servicio) {
      return null
    }

    const [listInsumos] = await database.query(
      `SELECT i.ID, i.Nombre, ins.Cantidad
      FROM SERVICIO s INNER JOIN INSUMOSERVICIO ins ON s.ID = ins.ServicioID
      INNER JOIN insumo i ON i.ID = ins.InsumoID
      WHERE s.ID = ?`, [id])

    return { ...servicio, listInsumos }
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
    const { Tipo, Fecha, Veterinario, Observaciones, ResID, listInsumos } = data
    let result = []

    // Insertar servicio
    const [[{ id }]] = await database.query('SELECT UUID() id')
    const resultServicio = await database.query('INSERT INTO Servicio (id, Tipo, Fecha, Veterinario, Observaciones, ResID) VALUES (?, ?, ?, ?, ?, ?)',
      [id, Tipo, Fecha, Veterinario, Observaciones, ResID])

    result.push(resultServicio)

    // Insertar insumos
    for (const insumo of listInsumos) {
      const [[{id: idRegistro}]] = await database.query('SELECT UUID() id')

      const resultInsumo = await database.query(
        'INSERT INTO InsumoServicio (id, InsumoID, ServicioID, Cantidad) VALUES (?, ?, ?, ?)',
        [idRegistro, insumo.InsumoID, id, insumo.Cantidad])

      await database.query('UPDATE Insumo SET CantidadActual = CantidadActual - ? WHERE ID = ?', [insumo.Cantidad, insumo.InsumoID])
      result.push(resultInsumo)
    }

    // insertar inseminacion
    if (Tipo === 'Inseminación') {
      const [[{ id: idInseminacion }]] = await database.query('SELECT UUID() id')
      const { FechaParto } = data
      await database.query('INSERT INTO Inseminacion (id, ServicioID, FechaParto) VALUES (?, ?, ?)',
        [idInseminacion, id, FechaParto])
    }

    // insertar monta
    if (Tipo === 'Monta') {
      const [[{ id: idMonta }]] = await database.query('SELECT UUID() id')
      const { FechaParto, ToroID } = data
      await database.query('INSERT INTO Monta (id, ServicioID, FechaParto, ToroID) VALUES (?, ?, ?, ?)',
        [idMonta, id, FechaParto, ToroID])
    }
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
