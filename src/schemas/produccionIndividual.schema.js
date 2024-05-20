import z from 'zod'

export const ProduccionIndividualSchema = z.object({
  Fecha: z.string().transform((str) => new Date(str)),
  Tipo: z.enum(['Leche', 'Carne']),
  Cantidad: z.number().nonnegative().min(0).max(999.99), // decimal(5,2) equivale a un rango de 0 a 999.99
  ResID: z.string().uuid()
})

export function validateProduccionIndividual (input) {
  return ProduccionIndividualSchema.safeParse(input)
}

export function validatePartialProduccionIndividual (input) {
  return ProduccionIndividualSchema.partial().safeParse(input)
}
