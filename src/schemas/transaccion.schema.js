import z from 'zod'

export const TransaccionSchema = z.object({
  Descripcion: z.string().optional(),
  Fecha: z.string().transform((str) => new Date(str)),
  Valor: z.number().nonnegative().min(0).max(9999999.99) // decimal(10,2) equivale a un rango de 0 a 9999999.99
})

export function validateTransaccion (input) {
  return TransaccionSchema.safeParse(input)
}

export function validatePartialTransaccion (input) {
  return TransaccionSchema.partial().safeParse(input)
}
