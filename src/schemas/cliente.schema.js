import { z } from 'zod'

const ClienteSchema = z.object({
  Identificacion: z.string().max(20).min(1),
  Nombre: z.string().max(100),
  Direccion: z.string().max(200).optional(),
  Telefono: z.string().max(20),
  Email: z.string().email().max(100).optional()
})

export function validateCliente (input) {
  return ClienteSchema.safeParse(input)
}

export function validatePartialCliente (input) {
  return ClienteSchema.partial().safeParse(input)
}
