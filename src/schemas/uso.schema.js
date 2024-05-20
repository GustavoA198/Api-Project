import z from 'zod'

export const UsoSchema = z.object({
  Justificacion: z.string().optional(),
  Fecha: z.string().transform((str) => new Date(str)),
  Cantidad: z.number().int().optional(),
  ProductoID: z.string().uuid().optional()
})

export function validateUso (input) {
  return UsoSchema.safeParse(input)
}

export function validatePartialUso (input) {
  return UsoSchema.partial().safeParse(input)
}
