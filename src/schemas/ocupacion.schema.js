import z from 'zod'

export const OcupacionSchema = z.object({
  NoAnimales: z.number().int(),
  FechaIngreso: z.string().transform((str) => new Date(str)).optional(),
  TipoRebano: z.enum(['Lecheras', 'Secas', 'Engorde', 'Novillas', 'Novillos', 'Otro']),
  FechaSalida: z.string().transform((str) => new Date(str)).optional(),
  LoteID: z.string().uuid()
})

export function validateOcupacion (input) {
  return OcupacionSchema.safeParse(input)
}

export function validatePartialOcupacion (input) {
  return OcupacionSchema.partial().safeParse(input)
}
