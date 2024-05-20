import z from 'zod'

export const ServicioSchema = z.object({
  Tipo: z.string().max(100).optional(),
  Fecha: z.string().transform((str) => new Date(str)),
  Veterinario: z.string().max(100).optional(),
  Observaciones: z.string().optional()
})

export function validateServicio (input) {
  return ServicioSchema.safeParse(input)
}

export function validatePartialServicio (input) {
  return ServicioSchema.partial().safeParse(input)
}
