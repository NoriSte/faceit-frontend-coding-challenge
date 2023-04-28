import { useCallback } from 'react';

import { createTournamentThunk } from '../../../actions/tournaments';
import { validateTournamentName } from '../../../domain';
import { useAppDispatch } from '../../../hooks/store';

export function useCreateTournament() {
  const dispatch = useAppDispatch();

  return useCallback(() => {
    for (;;) {
      const name = prompt('Tournament Name:');

      const useClickedCancel = name === null;
      if (useClickedCancel) break;

      if (!validateTournamentName(name)) continue;

      dispatch(createTournamentThunk({ name }));
      break;
    }
  }, [
    // dispatch is a stable reference
    dispatch,
  ]);
}
