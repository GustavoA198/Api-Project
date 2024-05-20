import z from 'zod'

export const ProductosVentasSchema = z.object({
  PrecioUnitario: z.number().nonnegative().min(0).max(9999999.99).optional(), // decimal(10,2) equivale a un rango de 0 a 9999999.99
  Cantidad: z.number().int().nonnegative().min(0),
  ProductoID: z.string().uuid(),
  VentaID: z.string().uuid()
})

export function validateProductosVentas (input) {
  return ProductosVentasSchema.safeParse(input)
}

export function validatePartialProductosVentas (input) {
  return ProductosVentasSchema.partial().safeParse(input)
}
