import z from 'zod'

const ResSchema = z.object({
  nombre: z.string().min(1).max(100),
  fechaNacimiento: z.string(),
  madre: z.string().uuid().nullable(),
  padre: z.string().uuid().nullable(),
  pesoActual: z.number().min(0),
  pesoNacimiento: z.number().min(0),
  sexo: z.enum(['M', 'F']),
  raza: z.string().max(20),
  numeroPartos: z.number().int().min(0).max(20),
  registroICA: z.string().max(50),
  fincaID: z.string().uuid()
})

export function validateRes (input) {
  return ResSchema.safeParse(input)
}

export function validatePartialRes (input) {
  return ResSchema.partial().safeParse(input)
}
