import { database } from '../database/db.js'

export class ReproduccionModel {
  static async getEnGestacion () {
    const [idSeriviciosEngestacion] = await database.query(`
      SELECT s1.ID
      FROM Servicio s1
      WHERE 
        (s1.Tipo = 'Inseminacion' OR s1.Tipo = 'Monta') 
        AND 
        DATE_ADD(s1.Fecha, interval 285 day) >= CURDATE() 
        
        AND

        ((SELECT COUNT(*)
        FROM Monta m
        WHERE 
          m.ServicioID = s1.ID AND
          m.Estado = 'Confirmado') > 0
          
        OR

        (SELECT COUNT(*)
        FROM Inseminacion i
        WHERE 
          i.ServicioID = s1.ID AND
          i.Estado = 'Confirmado') > 0)
          
        AND

        (SELECT COUNT(*) 
        FROM Servicio s2 
        WHERE
          Tipo = 'Aborto' AND 
          s2.ResID = s1.ResID AND 
          s2.Fecha > s1.Fecha) = 0 
          
        AND

        (SELECT COUNT(*)
        FROM Res r
        WHERE 
          r.Madre = s1.ResID AND
          r.FechaNacimiento > s1.Fecha           
          ) = 0
        `)

    let EnGestacion = []
    for (const id of idSeriviciosEngestacion) {
      const [[resp]] = await database.query(`
        SELECT 
          r.ID as ResID,
          r.Nombre as ResNombre,
          r.Numero,
          m.ToroID,
          DATEDIFF(CURDATE(), s.Fecha) AS DiasGestacion,
          COALESCE(i.FechaParto, m.FechaParto) AS FechaParto
        FROM Servicio s
        JOIN Res r ON s.ResID = r.ID
        LEFT JOIN Inseminacion i ON s.ID = i.ServicioID
        LEFT JOIN Monta m ON s.ID = m.ServicioID
        WHERE s.ID = ?`, [id.ID])
      EnGestacion.push(resp)
    }

    return EnGestacion
  }

  static async getParaSecado () {
    const EnGestacion = await this.getEnGestacion()
    const ParaSecado = []
    for (const res of EnGestacion) {
      if (res.DiasGestacion >= 220) {
        ParaSecado.push(res)
      }
    }
    return ParaSecado
  }

  static async getPorConfirmar () {
    return await database.query(`
      SELECT 
        s.ID,
        r.ID AS ResID,
        r.Nombre AS ResNombre,
        COALESCE(m.ID, i.ID) AS InseminacionOMontaID,
        COALESCE(i.FechaParto, m.FechaParto) AS FechaParto
      FROM Servicio s
      INNER JOIN Res r ON s.ResID = r.ID
      LEFT JOIN Inseminacion i ON s.ID = i.ServicioID
      LEFT JOIN Monta m ON s.ID = m.ServicioID
      WHERE 
        (s.Tipo = 'Inseminacion' OR s.Tipo = 'Monta')
        AND
        (i.Estado = 'No Confirmado' OR m.Estado = 'No Confirmado') 
      ORDER BY COALESCE(i.FechaParto, m.FechaParto) DESC`
    )
  }

  static async confirmarInseminacion (id) {
    const connection = await database.getConnection()
    try {
      await connection.beginTransaction()
      await connection.query(`
        UPDATE Inseminacion
        SET Estado = 'Confirmado'
        WHERE ServicioID = ?`,
        [id])

      await connection.query(`
        UPDATE Monta
        SET Estado = 'Confirmado'
        WHERE ServicioID = ?`,
        [id])
      connection.commit()
      return true
    } catch (e) {
      connection.rollback()
      return false
    } finally {
      connection.release()
    }
  }

  static async inseminacionFallida (id) {
    const connection = await database.getConnection()
    try {
      await connection.beginTransaction()
      await connection.query(`
        UPDATE Inseminacion
        SET Estado = 'Fallido'
        WHERE ServicioID = ?`,
        [id])

      await connection.query(`
        UPDATE Monta
        SET Estado = 'Fallido'
        WHERE ServicioID = ?`,
        [id])
      connection.commit()
      return true
    } catch (e) {
      connection.rollback()
      return false
    } finally {
      connection.release()
    }
  }

  static async getPartos () {
    return await database.query(`
      SELECT 
        r.ID,
        r.Nombre AS ResNombre,
        r.Numero,
        hijo.FechaNacimiento as FechaParto,
        hijo.Nombre AS HijoNombre,
        hijo.ID AS HijoID
      FROM Res r
      JOIN Res hijo ON hijo.Madre = r.ID
      WHERE hijo.FechaNacimiento IS NOT NULL
      ORDER BY hijo.FechaNacimiento DESC`)
  }
}
