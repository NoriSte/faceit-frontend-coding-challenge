import { useCallback } from 'react';
import { deleteTournamentThunk } from '../../../actions/tournaments';
import { useAppDispatch } from '../../../hooks/store';

export function useDeleteTournament() {
  const dispatch = useAppDispatch();

  return useCallback(
    (tournamentId: string) => {
      if (global.confirm('Do you really want to delete this tournament?'))
        dispatch(deleteTournamentThunk({ tournamentId }));
    },
    [
      // dispatch is a stable reference
      dispatch,
    ]
  );
}
