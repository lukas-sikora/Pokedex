import { z } from 'zod';

export const pokemonSchema = z.object({
  name: z.string().min(1, "Nazwa jest wymagana"),
  weight: z.number().min(1, "Waga musi być większa niż 0"),
  height: z.number().min(1, "Wzrost musi być większy niż 0"),
  base_experience: z.number().min(1, "Doświadczenie musi być większe niż 0"),
});
