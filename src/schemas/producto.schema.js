import z from 'zod'

export const ProductoSchema = z.object({
  Nombre: z.string().max(100),
  Fecha: z.string().transform((str) => new Date(str)).optional(),
  Cantidad: z.number().int()
})

export function validateProducto (input) {
  return ProductoSchema.safeParse(input)
}

export function validatePartialProducto (input) {
  return ProductoSchema.partial().safeParse(input)
}
