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
     -- Recomendar fecha de inseminacion adecuada
     */

    return await database.query(`

      SELECT r.ID, r.Nombre as ResNombre
      FROM Res r
      WHERE  
      -- Que pesen más de 200 kg
      r.PesoActual >= 200

      AND
      -- Que sea femenino
      r.Sexo = 'F'

      AND
      -- Que este activa
      r.Estado = 'Activa'

      AND
      -- Que no esten el registros de para inseminar
      r.ID NOT IN (SELECT ResID FROM paraInseminar)

      AND

      -- Condición para vacas que son madres de alguna vaca que tiene menos de 45 días
       (
        SELECT COUNT(*)
        FROM Res hijo
        WHERE 
          hijo.Madre = r.ID AND
          DATE_ADD(hijo.FechaNacimiento, INTERVAL 45 DAY) >= CURDATE()
        ) = 0

      AND
        -- Vacas mayores a 18 meses
        (TIMESTAMPDIFF(MONTH, r.FechaNacimiento, CURDATE())) > 18

      AND
       -- que no tenga abortos en los ultimos 40 dias
        (
          SELECT COUNT(*)
          FROM Servicio s
          WHERE
            s.ResID = r.ID AND
            s.Tipo = 'Aborto' AND
            DATE_ADD(s.Fecha, INTERVAL 40 DAY) >= CURDATE()
          ) = 0
      
      AND 
      -- Que no tengan inseminaciones o montas exitosas
      (
        (SELECT COUNT(*)
        FROM Servicio s
        INNER JOIN Inseminacion i ON s.ID = i.ServicioID
        WHERE 
          s.ResID = r.ID AND
          s.Tipo = 'Inseminacion' AND
          DATE_ADD(s.Fecha, INTERVAL 285 DAY) >= CURDATE() AND
          i.Estado != 'Fallido') = 0
        AND
        (SELECT COUNT(*)
        FROM Servicio s
        INNER JOIN Monta m ON s.ID = m.ServicioID
        WHERE 
          s.ResID = r.ID AND
          s.Tipo = 'Monta' AND
          DATE_ADD(s.Fecha, INTERVAL 285 DAY) >= CURDATE() AND
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
      WHERE ResID = ?`, [id])
  }

  static async delete (id) {
    return await database.query('DELETE FROM ParaInseminar WHERE ID = ?', [id])
  }
}
