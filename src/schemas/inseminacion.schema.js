import z from 'zod'

export const InseminacionSchema = z.object({
  FechaParto: z.string().transform((str) => new Date(str)).optional(),
  ServicioID: z.string().uuid()
})

export function validateInseminacion (input) {
  return InseminacionSchema.safeParse(input)
}

export function validatePartialInseminacion (input) {
  return InseminacionSchema.partial().safeParse(input)
}
