import z from 'zod'

export const ServicioSchema = z.object({
  Tipo: z.string().max(100).optional(),
  Fecha: z.string().max(10),
  Veterinario: z.string().max(100).optional(),
  Observaciones: z.string().optional(),
  ResID: z.string().uuid(),
  listInsumos: z.object(
    {
      Cantidad: z.string(),
      InsumoID: z.string().uuid()
    }
  ).array().optional()
})

export function validateServicio (input) {
  return ServicioSchema.safeParse(input)
}

export function validatePartialServicio (input) {
  return ServicioSchema.partial().safeParse(input)
}
