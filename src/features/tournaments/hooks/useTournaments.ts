import { useSelector } from 'react-redux';
import { getTournaments } from '../../../selectors';
import { useCreateTournament } from './useCreateTournament';
import { useDeleteTournament } from './useDeleteTournament';
import { useSearchTournaments } from './useSearchTournaments';
import { useEditTournamentName } from './useEditTournamentName';
import { useRetryFetchTournaments } from './useRetryFetchTournaments';

/**
 * Provides all the utilities to connect the leaf Tournament components to the outer app's world.
 */
export function useTournaments() {
  const tournaments = useSelector(getTournaments);
  const createTournament = useCreateTournament();
  const deleteTournament = useDeleteTournament();
  const searchTournaments = useSearchTournaments();
  const editTournamentName = useEditTournamentName();
  const retryFetchTournaments = useRetryFetchTournaments();

  return {
    tournaments,
    createTournament,
    deleteTournament,
    searchTournaments,
    editTournamentName,
    retryFetchTournaments,
  };
}
