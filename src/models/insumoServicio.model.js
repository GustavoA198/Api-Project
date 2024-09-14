import { database } from '../database/db.js'

// const [listInsumos] = await database.query(`SELECT i.ID, i.Nombre, ins.Cantidad
//   FROM SERVICIO s INNER JOIN INSUMOSERVICIO ins ON s.ID = ins.ServicioID
//   INNER JOIN insumo i ON i.ID = ins.InsumoID
//   WHERE s.ID = ?`, [id])

export class InsumosServicioModel {
  static async getAll () {
    return database.query('SELECT * FROM InsumoServicio')
  }

  static async getInsumosServicioById (id) {
    return database.query(`
      SELECT I.ID, I.Nombre, I.Numero, I.UnidadMedida, InSe.Cantidad 
      FROM InsumoServicio InSe
      INNER JOIN Insumo I ON InSe.InsumoID = I.ID
      WHERE InSe.ID = ?`, [id])
  }

  static async getInsumosServicioByIdServicio (id) {
    return database.query(`
      SELECT I.ID, I.Nombre, I.Numero, I.UnidadMedida, InSe.Cantidad 
      FROM InsumoServicio InSe
      INNER JOIN Insumo I ON InSe.InsumoID = I.ID
      WHERE InSe.ServicioID = ?`, [id])
  }

  static async update (data) {
    const connection = await database.getConnection()
    await connection.beginTransaction()
    try {
      for (const {InsumoID, ServicioID, Cantidad} of data) {
        const [[{ Cantidad: oldCantidad }]] = await connection.query(`
          SELECT Cantidad
          FROM InsumoServicio
          WHERE InsumoID = ? AND ServicioID = ?`,
          [InsumoID, ServicioID]
        )
        if (oldCantidad === Cantidad) {
          return (false)
        }

        await connection.query(`
          UPDATE InsumoServicio 
          SET Cantidad = ?
          WHERE InsumoID = ? AND ServicioID = ?`,
          [Cantidad, InsumoID, ServicioID]
        )

        let diferencia
        if (Cantidad > oldCantidad) {
          diferencia = `- ${Cantidad - oldCantidad}`
        } else {
          diferencia = `+ ${oldCantidad - Cantidad}`
        }

        await connection.query(`
          UPDATE Insumo 
          SET CantidadActual = CantidadActual ${diferencia}
          WHERE ID = ?`, [InsumoID]
        )
      }

      await connection.commit()
      return (true)
    } catch (error) {
      // Si algo falla, revertir
      await connection.rollback()
      console.log('Error en la transacción, se ha hecho rollback:', error)
    } finally {
      // Desconexión
      connection.release()
    }
  }

  static async delete (data) {
    const connection = await database.getConnection()

    console.log(data.InsumoID, data.ServicioID)
    const {InsumoID, ServicioID} = data

    const [result] = await database.query(`
      SELECT * FROM InsumoServicio
      WHERE InsumoID = ? AND ServicioID = ?`, [InsumoID, ServicioID]
    )

    if (!result || result.length <= 0) {
      return (false)
    }

    try {
      // Iniciar la transacción
      await connection.beginTransaction()

      // Ejecuta consulta
      await connection.query(`
        UPDATE insumo 
        SET CantidadActual = CantidadActual + (SELECT Cantidad FROM InsumoServicio WHERE InsumoID = ? AND ServicioID = ?)
        WHERE ID = ?`,
        [InsumoID, ServicioID, InsumoID]
      )

      // Ejecutar la segunda consulta
      await connection.query(`
        DELETE FROM InsumoServicio 
        WHERE InsumoID = ? AND ServicioID = ?`,
        [InsumoID, ServicioID]
      )

      // Si ambas exitosas, confirma
      await connection.commit()
      return (true)
    } catch (error) {
      // Si algo falla, revertir
      await connection.rollback()
      console.log('Error en la transacción, se ha hecho rollback:', error)
    } finally {
      // Desconexión
      connection.release()
    }
  }
}
