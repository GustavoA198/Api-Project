import z from 'zod'

export const UsoSchema = z.object({
  Justificacion: z.string().optional(),
  Fecha: z.string().max(10),
  Cantidad: z.number().int(),
  ProductoID: z.string().uuid()
})

export function validateUso (input) {
  return UsoSchema.safeParse(input)
}

export function validatePartialUso (input) {
  return UsoSchema.partial().safeParse(input)
}
