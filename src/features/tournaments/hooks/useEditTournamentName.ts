import { useCallback } from 'react';

import { validateTournamentName, type Tournament } from '../../../domain';

import { editTournamentThunk } from '../../../actions/tournaments';
import { useAppDispatch } from '../../../hooks/store';

export function useEditTournamentName() {
  const dispatch = useAppDispatch();

  return useCallback(
    (tournament: Tournament) => {
      for (;;) {
        const nextName = prompt('New Tournament Name:', tournament.name);

        const useClickedCancel = nextName === null;
        if (useClickedCancel) break;

        const nameIsTheSame = nextName === tournament.name;
        if (nameIsTheSame) break;

        if (!validateTournamentName(nextName)) continue;

        const nextTournament = { ...tournament, name: nextName };
        dispatch(
          editTournamentThunk({ prevTournament: tournament, nextTournament })
        );
        break;
      }
    },
    [
      // dispatch is a stable reference
      dispatch,
    ]
  );
}
