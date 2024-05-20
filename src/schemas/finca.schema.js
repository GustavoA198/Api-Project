import z from 'zod'

export const FincaSchema = z.object({
  Nombre: z.string().max(100),
  Direccion: z.string().max(200).optional(),
  Observaciones: z.string().optional()
})

export function validateFinca (input) {
  return FincaSchema.safeParse(input)
}

export function validatePartialFinca (input) {
  return FincaSchema.partial().safeParse(input)
}
