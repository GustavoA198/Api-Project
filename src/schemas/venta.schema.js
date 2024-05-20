import z from 'zod'

export const VentaSchema = z.object({
  Total: z.number().nonnegative().min(0).max(9999999.99), // decimal(10,2) equivale a un rango de 0 a 9999999.99
  Observaciones: z.string().optional(),
  ClienteID: z.string().uuid()
})

export function validateVenta (input) {
  return VentaSchema.safeParse(input)
}

export function validatePartialVenta (input) {
  return VentaSchema.partial().safeParse(input)
}
