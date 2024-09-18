import { database } from '../database/db.js'

export class ReproduccionModel {
  static async getEnGestacion () {
    const [idSeriviciosEngestacion] = await database.query(`
      SELECT s1.ID
      FROM Servicio s1
      WHERE 
        (s1.Tipo = 'Inseminacion' OR s1.Tipo = 'Monta') 
        AND 
        DATE_ADD(fecha, interval 285 day) >= CURDATE() 
        
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

    console.log(idSeriviciosEngestacion)

    let EnGestacion = []
    for (const id of idSeriviciosEngestacion) {
      const [[resp]] = await database.query(`
        SELECT r.ID as ResID, r.Nombre, r.Numero, i.FechaParto as FechaPartoI, m.FechaParto as FechaPartoM
        FROM Servicio s
        JOIN Res r ON s.ResID = r.ID
        LEFT JOIN Inseminacion i ON s.ID = i.ServicioID
        LEFT JOIN Monta m ON s.ID = m.ServicioID
        WHERE s.ID = ?`, [id.ID])
      EnGestacion.push(resp)
    }

    console.log(EnGestacion)
    return EnGestacion
  }

  static async getPorConfirmar () {
    return await database.query(`
      SELECT s.ID, 
        r.ID AS ResID, 
        r.Nombre AS ResNombre, 
        m.ID AS MontaID, 
        m.FechaParto AS FechaPartoM, 
        i.ID AS InseminacionID, 
        i.FechaParto AS FechaPartoI 
      FROM Servicio s
      INNER JOIN Res r ON s.ResID = r.ID
      LEFT JOIN Inseminacion i ON s.ID = i.ServicioID
      LEFT JOIN Monta m ON s.ID = m.ServicioID
      WHERE 
        s.Tipo = 'Inseminacion' OR s.Tipo = 'Monta'
        AND
        (i.Estado = 'Por Confirmar' OR m.Estado = 'Por Confirmar');
`
    )
  }
}
