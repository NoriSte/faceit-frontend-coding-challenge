import { RootState } from '../reducers';

export const getTournaments = (state: RootState) => state.tournaments;
export const getTournamentsQuery = (state: RootState) =>
  state.tournaments.query;
