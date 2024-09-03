import z from 'zod'

export const ServicioSchema = z.object({
  Tipo: z.string().max(100).optional(),
  Fecha: z.string().max(10),
  Veterinario: z.string().max(100).optional(),
  Observaciones: z.string().optional(),
  ResID: z.string().uuid(),
  listInsumos: z.array(z.object({
    InsumoID: z.string().uuid(),
    Cantidad: z.number().int()
  })).optional()
})

export function validateServicio (input) {
  return ServicioSchema.safeParse(input)
}

export function validatePartialServicio (input) {
  return ServicioSchema.partial().safeParse(input)
}
