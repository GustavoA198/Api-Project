import z from 'zod'

export const MontaSchema = z.object({
  FechaParto: z.string().transform((str) => new Date(str)).optional(),
  ServicioID: z.string().uuid(),
  ToroID: z.string().uuid()
})

export function validateMonta (input) {
  return MontaSchema.safeParse(input)
}

export function validatePartialMonta (input) {
  return MontaSchema.partial().safeParse(input)
}
