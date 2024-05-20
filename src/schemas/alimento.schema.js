import z from 'zod'

export const AlimentoSchema = z.object({
  Nombre: z.string().max(100),
  Tipo: z.string().max(100)
})

export function validateAlimento (input) {
  return AlimentoSchema.safeParse(input)
}

export function validatePartialAlimento (input) {
  return AlimentoSchema.partial().safeParse(input)
}
