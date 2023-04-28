import { z } from 'zod';

export const tournamentSchema = z.object({
  id: z.string(),
  name: z.string(),
  organizer: z.string(),
  game: z.string(),
  participants: z.object({
    current: z.number().min(0).max(256),
    max: z.literal(256),
  }),
  startDate: z.string().datetime(),
});

export const tournamentsSchema = z.array(tournamentSchema);

export type Tournament = z.infer<typeof tournamentSchema>;
