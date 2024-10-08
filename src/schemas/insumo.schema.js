import z from 'zod'

export const InsumoSchema = z.object({
  Nombre: z.string().max(100),
  FechaIngreso: z.string().transform((str) => new Date(str)),
  UnidadMedida: z.string().max(100),
  CantidadActual: z.number().int().optional(),
  FechaVencimiento: z.string().transform((str) => new Date(str)).optional(),
  Observaciones: z.string().optional()
})

export function validateInsumo (input) {
  return InsumoSchema.safeParse(input)
}

export function validatePartialInsumo (input) {
  return InsumoSchema.partial().safeParse(input)
}
