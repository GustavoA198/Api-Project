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

  static async getSugeridos () {
    /* TO DO
     Vacas despues 45 dias despues del parto
     o vacas que tengan entre 18 y 24 meses
     que no tenga inseminaciones en estado no confirmado o confirmado
     que no tenga insemianciones fallida en los ultimos "NO SE" Dias */

    return await database.query(`
      SELECT r.ID
      FROM Res r
      WHERE  
      -- Condición para vacas que son madres de alguna vaca que tiene menos de 45 días
      (
        SELECT COUNT(*)
        FROM Res hijo
        WHERE hijo.Madre = r.ID
          AND DATE_ADD(hijo.FechaNacimiento, INTERVAL 45 DAY) >= CURDATE()
      ) = 0
      
      OR
      
      -- Vacas entre 18 y 24 meses
      (TIMESTAMPDIFF(MONTH, r.FechaNacimiento, CURDATE()) BETWEEN 18 AND 24)
      
      -- Que no tengan inseminaciones o montas exitosas
      AND (
        (SELECT COUNT(*)
        FROM Servicio s
        INNER JOIN Inseminacion i ON s.ID = i.ServicioID
        WHERE 
          s.ResID = r.ID AND
          s.Tipo = 'Inseminacion' AND
          DATE_ADD(i.Fecha, INTERVAL 285 DAY) >= CURDATE() AND
          i.Estado != 'Fallido') = 0
        OR
        (SELECT COUNT(*)
        FROM Servicio s
        INNER JOIN Monta m ON s.ID = m.ServicioID
        WHERE 
        s.ResID = r.ID AND
        s.Tipo = 'Monta' AND
        DATE_ADD(m.Fecha, INTERVAL 285 DAY) >= CURDATE() AND
        m.Estado != 'Fallido') = 0
      )`
    )
  }

  static async create (data) {
    const { Fecha, Observaciones, ResID } = data
    const [[{ id }]] = await database.query('SELECT UUID() id')
    const result = await database.query(
      'INSERT INTO paraInseminar (ID, Fecha, Observaciones, ResID, Estado) VALUES (?, ?, ?, ?, ?)',
      [ id, Fecha, Observaciones, ResID, 'Pendiente' ])
    return result
  }

  static async update (id) {
    return await database.query(`
      UPDATE paraInseminar
      SET Estado = 'Realizado'
      WHERE ID = ?`, [id])
  }

  static async delete (id) {
    return await database.query('DELETE FROM ParaInseminar WHERE ID = ?', [id])
  }
}
