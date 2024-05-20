import z from 'zod'

export const MuerteSchema = z.object({
  Fecha: z.string().transform((str) => new Date(str)),
  Causa: z.string().max(200).optional(),
  Observaciones: z.string().optional(),
  ResID: z.string().uuid()
})

export function validateMuerte (input) {
  return MuerteSchema.safeParse(input)
}

export function validatePartialMuerte (input) {
  return MuerteSchema.partial().safeParse(input)
}
