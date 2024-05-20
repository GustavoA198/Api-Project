import z from 'zod'

export const InsumoServicioSchema = z.object({
  InsumoID: z.string().uuid(),
  ServicioID: z.string().uuid()
})

export function validateInsumoServicio (input) {
  return InsumoServicioSchema.safeParse(input)
}

export function validatePartialInsumoServicio (input) {
  return InsumoServicioSchema.partial().safeParse(input)
}
