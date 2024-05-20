import z from 'zod'

export const InsumosTransaccionSchema = z.object({
  Cantidad: z.number().int().nonnegative().min(0).max(9999999999), // INT(10) equivale a un rango de 0 a 9999999999
  ValorUnitario: z.number().nonnegative().min(0).max(9999999.99).optional(), // DECIMAL(10,2) equivale a un rango de 0 a 9999999.99
  InsumoID: z.string().uuid(),
  TransaccionID: z.string().uuid()
})

export function validateInsumosTransaccion (input) {
  return InsumosTransaccionSchema.safeParse(input)
}

export function validatePartialInsumosTransaccion (input) {
  return InsumosTransaccionSchema.partial().safeParse(input)
}
