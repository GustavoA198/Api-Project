import z from 'zod'

export const TransaccionSchema = z.object({
  Descripcion: z.string().optional(),
  Tipo: z.enum(['Ingreso', 'Egreso']),
  Fecha: z.string().max(10),
  Valor: z.number().nonnegative().min(0).max(9999999.99), // decimal(10,2) equivale a un rango de 0 a 9999999.99
  Tercero: z.string().uuid().optional(),
  Productos: z.array(z.object({
    id: z.string().uuid(),
    cantidad: z.number().nonnegative().min(0),
    precio: z.number().nonnegative().min(0).max(9999999.99).optional()
  })).optional()
})

export function validateTransaccion (input) {
  return TransaccionSchema.safeParse(input)
}

export function validatePartialTransaccion (input) {
  return TransaccionSchema.partial().safeParse(input)
}
