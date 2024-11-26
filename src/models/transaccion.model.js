import { database } from '../database/db.js'

export class TransaccionModel {
  static async getAll () {
    const [listIDs] = await database.query('SELECT ID FROM Transaccion')

    let listTransaccion = []

    for (const { ID } of listIDs) {
      const transaccion = await this.getTransaccionById(ID)
      listTransaccion.push(transaccion)
    }
    return listTransaccion
  }

  static async getResumen () {
    const [resumen] = await database.query(`
      SELECT 
          t.Tipo, 
          SUM(t.Valor) AS Total
      FROM 
          Transaccion t
      GROUP BY 
          t.Tipo
      ORDER BY 
          t.Tipo`)

    let ResumenResponse = { Ingreso: 0, Egreso: 0, Total: 0 }
    for (const { Tipo, Total } of resumen) {
      if (Tipo === 'Ingreso') {
        ResumenResponse.Ingreso = Total
      } else {
        ResumenResponse.Egreso = Total
      }
    }

    ResumenResponse.Total = ResumenResponse.Ingreso - ResumenResponse.Egreso
    return ResumenResponse
  }

  static async getTransaccionById (id) {
    const [[transaccion]] = await database.query(`
      SELECT * 
      FROM Transaccion
      WHERE id = ?`, [id])

    const [listProducto] = await database.query(`
      SELECT 
          IFNULL(p.ID, i.ID) AS ProductoInsumoID,                 -- ID del producto o insumo
          IFNULL(p.Nombre, i.Nombre) AS ProductoInsumoNombre,     -- Nombre del producto o insumo
          IFNULL(pt.Cantidad, it.Cantidad) AS Cantidad,           -- Cantidad del producto o insumo
          IFNULL(pt.PrecioUnitario, it.ValorUnitario) AS Precio   -- Precio del producto o insumo
      FROM
          Transaccion t
      LEFT JOIN 
          InsumosTransaccion it ON t.ID = it.TransaccionID
      LEFT JOIN 
          ProductoTransaccion pt ON t.ID = pt.TransaccionID
      LEFT JOIN 
          Insumo i ON it.InsumoID = i.ID
      LEFT JOIN 
          Producto p ON pt.ProductoID = p.ID
      WHERE 
          t.ID = ?`, [id])

    let stringListProductos = ''
    for (let i = 0; i < listProducto.length; i++) {
      stringListProductos += `${listProducto[i].ProductoInsumoNombre}`
      if (i < listProducto.length - 1) {
        stringListProductos += `, `
      }
    }

    return { ...transaccion, ProductosString: stringListProductos, Productos: listProducto }
  }

  static async create (data) {
    const {Descripcion, Tipo, Fecha, Valor, Tercero, Productos} = data
    const connection = await database.getConnection()
    await connection.beginTransaction()
    const [[{ id: transaccionId }]] = await connection.query('SELECT UUID() id')

    try {
      await connection.query('INSERT INTO Transaccion (id, Descripcion, Tipo, Fecha, Tercero, Valor) VALUES (?, ?, ?, ?, ?, ?)',
          [transaccionId, Descripcion, Tipo, Fecha, Tercero, Valor])

      if (Productos && Tipo === 'Egreso') {
        for (const { id: InsumoID, cantidad, precio } of Productos) {
          // insertar en tabla insumoTransaccion el ID, ProductoID, TransaccionID,Precio, Cantidad
          await connection.query(`
            INSERT INTO InsumosTransaccion
            (ID, InsumoID, TransaccionID, ValorUnitario, Cantidad) 
            VALUES (UUID(), ?, ?, ?, ?)`,
            [InsumoID, transaccionId, precio, cantidad])

          // actualizar la cantidad de insumo en la tabla Insumo
          await connection.query(`
            UPDATE Insumo
            SET CantidadActual = CantidadActual - ?
            WHERE id = ?`,
            [cantidad, InsumoID])
        }
      } else if (Productos && Tipo === 'Ingreso') {
        for (const { id: ProductoID, cantidad, precio } of Productos) {
          // insertar en tabla productoTransaccion el ID, ProductoID, TransaccionID,Precio, Cantidad
          await connection.query(`
            INSERT INTO ProductoTransaccion
            (ID, ProductoID, TransaccionID, PrecioUnitario, Cantidad)
            VALUES (UUID(), ?, ?, ?, ?)`,
            [ProductoID, transaccionId, precio, cantidad])

          // actualizar la cantidad de producto en la tabla Producto
          await connection.query(`
            UPDATE Producto
            SET Cantidad = Cantidad + ?
            WHERE id = ?`,
            [cantidad, ProductoID])
        }
      }
      await connection.commit()
      return true
    } catch (e) {
      await connection.rollback()
      throw e
    } finally {
      connection.release()
    }
  }

  static async getTransaccionesByFecha (fechaInicio, fechaFin) {
    const [transacciones] = await database.query(`
      SELECT t.Fecha, t.Tipo, t.Valor 
      FROM Transaccion t
      WHERE t.Fecha BETWEEN ? AND ?
      ORDER BY t.Fecha`, [fechaInicio, fechaFin])
    return transacciones
  }

  static async update (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE Transaccion SET '
    keys.forEach((key, index) => {
      query += `${key} = ?`
      if (index < keys.length - 1) {
        query += ', '
      }
    })
    query += ' WHERE id = ?'
    values.push(id)
    return database.query(query, values)
  }

  static async delete (id) {
    return database.query('DELETE FROM Transaccion WHERE id = ?', [id])
  }
}
