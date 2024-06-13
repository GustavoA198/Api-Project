import z from 'zod'

export const UsuarioSchema = z.object({
  Tipo: z.enum(['admin', 'operario']),
  Identificacion: z.string().max(20).optional(),
  Nombre: z.string().max(100),
  Direccion: z.string().max(100).optional(),
  Telefono: z.string().max(20).optional(),
  Email: z.string().email(),
  Contrasena: z.string().min(1).max(100)
})

export function validateUsuario (input) {
  return UsuarioSchema.safeParse(input)
}

export function validatePartialUsuario (input) {
  return UsuarioSchema.partial().safeParse(input)
}
