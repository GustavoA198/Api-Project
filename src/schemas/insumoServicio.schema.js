import z from 'zod'

export const InsumoServicioSchema = z.object({
  InsumoID: z.string().uuid(),
  ServicioID: z.string().uuid(),
  Cantidad: z.number().int().positive()
}).array()

export const InsumoServicioDeleteSchema = z.object({
  InsumoID: z.string().uuid(),
  ServicioID: z.string().uuid()
})

export function validateInsumoServicio (input) {
  return InsumoServicioSchema.safeParse(input)
}

export function validateInsumoServicioDelete (input) {
  return InsumoServicioDeleteSchema.safeParse(input)
}
