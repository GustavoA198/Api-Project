import z from 'zod'

export const ParaInseminarSchema = z.object({
  Fecha: z.string().max(10),
  Observaciones: z.string().max(255),
  ResID: z.string().uuid()
})

export function validateParaInseminar (input) {
  return ParaInseminarSchema.safeParse(input)
}

export function validatePartialParaInseminar (input) {
  return ParaInseminarSchema.partial().safeParse(input)
}
