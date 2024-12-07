import { database } from '../database/db.js'

export class InformesModel {

  static async getResesPorFecha (fechaInicio, fechaFin) {
    return await database.query(
      `SELECT Res.*
       FROM Res
       LEFT JOIN Muerte ON Res.ID = Muerte.ResID
       WHERE Res.FechaNacimiento <= ?
         AND (Muerte.Fecha IS NULL OR Muerte.Fecha >= ?)
         AND (
           Res.Estado = 'Activa'
           OR (Res.Estado = 'Vendida' AND (Muerte.Fecha IS NULL OR Muerte.Fecha >= ?))
         )`,
      [fechaFin, fechaInicio, fechaInicio]
    )
  }

  static async getNumeroResesPorFecha (fechaInicio, fechaFin) {
    return await database.query(
      `SELECT COUNT(*) AS numeroReses
       FROM Res
       LEFT JOIN Muerte ON Res.ID = Muerte.ResID
       WHERE Res.FechaNacimiento <= ?
         AND (Muerte.Fecha IS NULL OR Muerte.Fecha >= ?)
         AND (
           Res.Estado = 'Activa'
           OR (Res.Estado = 'Vendida' AND (Muerte.Fecha IS NULL OR Muerte.Fecha >= ?))
         )`,
      [fechaFin, fechaInicio, fechaInicio]
    )
  }

  static async getDistribucionPorSexo (fechaInicio, fechaFin) {
    return await database.query(
      `SELECT Res.Sexo, COUNT(*) AS numeroReses
       FROM Res
       LEFT JOIN Muerte ON Res.ID = Muerte.ResID
       WHERE Res.FechaNacimiento <= ?
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
       WHERE Res.FechaNacimiento <= ?
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
       WHERE Res.FechaNacimiento <= ?
         AND (Muerte.Fecha IS NULL OR Muerte.Fecha >= ?)
         AND (
           Res.Estado = 'Activa'
           OR (Res.Estado = 'Vendida' AND (Muerte.Fecha IS NULL OR Muerte.Fecha >= ?))
         )
       GROUP BY IFNULL(Res.Raza, 'Otros')
       HAVING COUNT(*) > 0
       LIMIT 4`, // Limita a las primeras 3 razas y una categoría "Otros"
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
       WHERE Res.FechaNacimiento <= ?
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
