import { useSelector } from 'react-redux';
import { getTournaments } from '../../../selectors';
import { useEditTournamentName } from './useEditTournamentName';
import { useRetryFetchTournaments } from './useRetryFetchTournaments';
/**
 * Provides all the utilities to connect the leaf Tournament components to the outer app's world.
 */
export function useTournaments() {
  const tournaments = useSelector(getTournaments);
  const editTournamentName = useEditTournamentName();
  const retryFetchTournaments = useRetryFetchTournaments();

  return {
    tournaments,
    editTournamentName,
    retryFetchTournaments,
  };
}
