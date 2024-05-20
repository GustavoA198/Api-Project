import z from 'zod'

export const LoteSchema = z.object({
  Nombre: z.string().max(36),
  Numero: z.number().int(),
  Aforo: z.number().int().optional(),
  FincaID: z.string().uuid()
})

export function validateLote (input) {
  return LoteSchema.safeParse(input)
}

export function validatePartialLote (input) {
  return LoteSchema.partial().safeParse(input)
}
