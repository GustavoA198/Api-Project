import z from 'zod'

export const InsumosActividadSchema = z.object({
  InsumoID: z.string().uuid(),
  ActividadID: z.string().uuid()
})

export function validateInsumosActividad (input) {
  return InsumosActividadSchema.safeParse(input)
}

export function validatePartialInsumosActividad (input) {
  return InsumosActividadSchema.partial().safeParse(input)
}
