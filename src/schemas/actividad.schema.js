import z from 'zod'

export const ActividadSchema = z.object({
  Fecha: z.string().transform((str) => new Date(str)),
  Tipo: z.string().max(100).optional(),
  TiempoCarencia: z.string().transform((str) => new Date(str)).optional(),
  LoteID: z.string().uuid(),
  Observaciones: z.string().optional()
})

export function validateActividad (input) {
  return ActividadSchema.safeParse(input)
}

export function validatePartialActividad (input) {
  return ActividadSchema.partial().safeParse(input)
}
