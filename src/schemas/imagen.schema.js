import z from 'zod'

export const ImagenSchema = z.object({
  URL: z.string().max(100),
  ResID: z.string().uuid()
})

export function validateImagen (input) {
  return ImagenSchema.safeParse(input)
}

export function validatePartialImagen (input) {
  return ImagenSchema.partial().safeParse(input)
}
