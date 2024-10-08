import z from 'zod'

export const ServicioSchema = z.object({
  Tipo: z.enum(['Monta', 'Inseminacion', 'Podologia', 'Vacunacion', 'Desparasitacion', 'Control', 'Castracion', 'Topizado', 'Curación', 'Secado', 'Aborto', 'Otro']),
  Fecha: z.string().max(10),
  Veterinario: z.string().max(100).optional(),
  Observaciones: z.string().optional(),
  ResID: z.string().uuid(),
  listInsumos: z.object(
    {
      Cantidad: z.union([z.string(), z.number()]),
      InsumoID: z.string().uuid()
    }
  ).array().optional(),
  ToroID: z.string().uuid().optional(),
  FechaParto: z.string().max(10).optional()
})

export function validateServicio (input) {
  return ServicioSchema.safeParse(input)
}

export function validatePartialServicio (input) {
  return ServicioSchema.partial().safeParse(input)
}
