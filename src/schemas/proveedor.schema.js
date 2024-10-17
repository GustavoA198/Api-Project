import { z } from 'zod'

const ProveedorSchema = z.object({
  Identificacion: z.string().max(20).min(1),
  Nombre: z.string().max(100),
  Direccion: z.string().max(200).optional(),
  Telefono: z.string().max(20),
  Email: z.string().email().max(100).optional()
})

export function validateProveedor (input) {
  return ProveedorSchema.safeParse(input)
}

export function validatePartialProveedor (input) {
  return ProveedorSchema.partial().safeParse(input)
}
