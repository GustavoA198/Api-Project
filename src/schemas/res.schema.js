import z from 'zod'

const ResSchema = z.object({
  Numero: z.number().int().min(0).max(999999),
  Nombre: z.string().max(100).optional(),
  Tipo: z.enum(['Leche', 'Carne', 'Doble Proposito']).optional(),
  FechaNacimiento: z.string().transform(str => new Date(str)).optional(),
  Estado: z.enum(['Activa', 'Vendida', 'Muerte']).optional(),
  Madre: z.string().uuid().optional(),
  Padre: z.string().uuid().optional(),
  PesoActual: z.number().min(0).max(999.99).optional(),
  PesoNacimiento: z.number().min(0).max(999.99).optional(),
  Sexo: z.enum(['M', 'F']),
  Raza: z.string().max(20).optional(),
  NumeroPartos: z.number().int().min(0).max(99999).optional(),
  RegistroICA: z.string().max(50).optional(),
  Observaciones: z.string().optional(),
  FincaID: z.string().uuid()
})

export function validateRes (input) {
  return ResSchema.safeParse(input)
}

export function validatePartialRes (input) {
  return ResSchema.partial().safeParse(input)
}
