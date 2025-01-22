import { database } from '../database/db.js'

export class InformesModel {

  /* sección inicial */

  static async getResesPorFecha (fechaInicio, fechaFin) {
    return await database.query(
      `SELECT Res.*
       FROM Res
       LEFT JOIN Muerte ON Res.ID = Muerte.ResID
       WHERE STR_TO_DATE(Res.FechaNacimiento, '%Y-%m-%d') <= ?
         AND (Muerte.Fecha IS NULL OR STR_TO_DATE(Muerte.Fecha, '%Y-%m-%d') >= ?)
         AND (
           Res.Estado = 'Activa'
           OR (Res.Estado = 'Vendida' AND (Muerte.Fecha IS NULL OR STR_TO_DATE(Muerte.Fecha, '%Y-%m-%d') >= ?))
         )`,
      [fechaFin, fechaInicio, fechaInicio]
    )
  }

  static async getNumeroResesPorFecha (fechaInicio, fechaFin) {
    return await database.query(
      `SELECT COUNT(*) AS numeroReses
       FROM Res
       LEFT JOIN Muerte ON Res.ID = Muerte.ResID
       WHERE STR_TO_DATE(Res.FechaNacimiento, '%Y-%m-%d') <= ?
         AND (Muerte.Fecha IS NULL OR Muerte.Fecha >= ?)
         AND (
           Res.Estado = 'Activa'
           OR (Res.Estado = 'Vendida' AND (Muerte.Fecha IS NULL OR Muerte.Fecha >= ?))
         )`,
      [fechaFin, fechaInicio, fechaInicio]
    )
  }

  static async getNumeroNacimientosPorFecha (fechaInicio, fechaFin) {
    return await database.query(
      `SELECT COUNT(*) AS numeroNacimientos
       FROM Res
       WHERE STR_TO_DATE(Res.FechaNacimiento, '%Y-%m-%d') BETWEEN ? AND ?`,
      [fechaInicio, fechaFin]
    )
  }

  static async getProduccionTotalPorTipo (fechaInicio, fechaFin, tipo) {
    return await database.query(
      `SELECT 
          CASE 
            WHEN MOD(COALESCE(SUM(Cantidad), 0), 1) = 0 THEN CAST(COALESCE(SUM(Cantidad), 0) AS UNSIGNED)
            ELSE TRUNCATE(COALESCE(SUM(Cantidad), 0), 1)
          END AS produccionTotal
       FROM ProduccionIndividual
       WHERE STR_TO_DATE(Fecha, '%Y-%m-%d') BETWEEN ? AND ?
         AND Tipo = ?`,
      [fechaInicio, fechaFin, tipo]
    )
  }

  /* Sección de las gráficas */

  static async getProduccionLechePorFecha (fechaInicio, fechaFin) {
    return await database.query(
      `SELECT 
          Fecha, 
          SUM(Cantidad) AS produccionTotal
       FROM ProduccionIndividual
       WHERE STR_TO_DATE(Fecha, '%Y-%m-%d') BETWEEN ? AND ?
         AND Tipo = 'Leche'
       GROUP BY Fecha
       ORDER BY STR_TO_DATE(Fecha, '%Y-%m-%d') ASC`,
      [fechaInicio, fechaFin]
    )
  }

  static async getBalancePorFecha (fechaInicio, fechaFin) {
    return await database.query(
      `WITH TransaccionesPorFecha AS (
         SELECT 
             STR_TO_DATE(Fecha, '%Y-%m-%d') AS Fecha,
             SUM(CASE WHEN Tipo = 'Ingreso' THEN Valor ELSE -Valor END) AS TotalDia
         FROM Transaccion
         WHERE STR_TO_DATE(Fecha, '%Y-%m-%d') BETWEEN ? AND ?
         GROUP BY STR_TO_DATE(Fecha, '%Y-%m-%d')
       )
       SELECT 
           Fecha,
           TotalDia,
           SUM(TotalDia) OVER (ORDER BY Fecha ASC) AS Balance
       FROM TransaccionesPorFecha
       ORDER BY Fecha ASC`,
      [fechaInicio, fechaFin]
    )
  }

  /* Sección final */

  static async getDistribucionPorSexo (fechaInicio, fechaFin) {
    return await database.query(
      `SELECT Res.Sexo, COUNT(*) AS numeroReses
       FROM Res
       LEFT JOIN Muerte ON Res.ID = Muerte.ResID
       WHERE STR_TO_DATE(Res.FechaNacimiento, '%Y-%m-%d') <= ?
         AND (Muerte.Fecha IS NULL OR Muerte.Fecha >= ?)
         AND (
           Res.Estado = 'Activa'
           OR (Res.Estado = 'Vendida' AND (Muerte.Fecha IS NULL OR Muerte.Fecha >= ?))
         )
       GROUP BY Res.Sexo`,
      [fechaFin, fechaInicio, fechaInicio]
    )
  }

  static async getDistribucionPorTipo (fechaInicio, fechaFin) {
    return await database.query(
      `SELECT Res.Tipo, COUNT(*) AS numeroReses
       FROM Res
       LEFT JOIN Muerte ON Res.ID = Muerte.ResID
       WHERE STR_TO_DATE(Res.FechaNacimiento, '%Y-%m-%d') <= ?
         AND (Muerte.Fecha IS NULL OR Muerte.Fecha >= ?)
         AND (
           Res.Estado = 'Activa'
           OR (Res.Estado = 'Vendida' AND (Muerte.Fecha IS NULL OR Muerte.Fecha >= ?))
         )
       GROUP BY Res.Tipo`,
      [fechaFin, fechaInicio, fechaInicio]
    )
  }

  static async getDistribucionPorRaza (fechaInicio, fechaFin) {
    return await database.query(
      `SELECT 
          IFNULL(Res.Raza, 'Otros') AS Raza,
          COUNT(*) AS numeroReses
       FROM Res
       LEFT JOIN Muerte ON Res.ID = Muerte.ResID
       WHERE STR_TO_DATE(Res.FechaNacimiento, '%Y-%m-%d') <= ?
         AND (Muerte.Fecha IS NULL OR Muerte.Fecha >= ?)
         AND (
           Res.Estado = 'Activa'
           OR (Res.Estado = 'Vendida' AND (Muerte.Fecha IS NULL OR Muerte.Fecha >= ?))
         )
       GROUP BY IFNULL(Res.Raza, 'Otros')
       HAVING COUNT(*) > 0
       LIMIT 4`,
      [fechaFin, fechaInicio, fechaInicio]
    )
  }

  static async getDistribucionPorEdad (fechaInicio, fechaFin) {
    return await database.query(
      `SELECT 
          CASE 
            WHEN TIMESTAMPDIFF(MONTH, STR_TO_DATE(Res.FechaNacimiento, '%Y-%m-%d'), ?) < 3 THEN 'Menores de 3 meses'
            WHEN TIMESTAMPDIFF(MONTH, STR_TO_DATE(Res.FechaNacimiento, '%Y-%m-%d'), ?) BETWEEN 3 AND 8 THEN 'Entre 3 y 9 meses'
            WHEN TIMESTAMPDIFF(MONTH, STR_TO_DATE(Res.FechaNacimiento, '%Y-%m-%d'), ?) BETWEEN 9 AND 11 THEN 'Entre 9 y 12 meses'
            WHEN TIMESTAMPDIFF(YEAR, STR_TO_DATE(Res.FechaNacimiento, '%Y-%m-%d'), ?) = 1 THEN 'De 1 a 2 años'
            WHEN TIMESTAMPDIFF(YEAR, STR_TO_DATE(Res.FechaNacimiento, '%Y-%m-%d'), ?) = 2 THEN 'De 2 a 3 años'
            WHEN TIMESTAMPDIFF(YEAR, STR_TO_DATE(Res.FechaNacimiento, '%Y-%m-%d'), ?) BETWEEN 3 AND 4 THEN 'De 3 a 5 años'
            ELSE 'Mayores de 5 años'
          END AS rangoEdad,
          COUNT(*) AS numeroReses
       FROM Res
       LEFT JOIN Muerte ON Res.ID = Muerte.ResID
       WHERE STR_TO_DATE(Res.FechaNacimiento, '%Y-%m-%d') <= ?
         AND (Muerte.Fecha IS NULL OR Muerte.Fecha >= ?)
         AND (
           Res.Estado = 'Activa'
           OR (Res.Estado = 'Vendida' AND (Muerte.Fecha IS NULL OR Muerte.Fecha >= ?))
         )
       GROUP BY rangoEdad`,
      [fechaFin, fechaFin, fechaFin, fechaFin, fechaFin, fechaFin, fechaFin, fechaInicio, fechaInicio]
    )
  }

}
