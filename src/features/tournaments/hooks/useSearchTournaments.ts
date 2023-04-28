import { useCallback } from 'react';

import { useAppDispatch } from '../../../hooks/store';
import { type Query } from '../../../reducers/tournaments';
import { fetchTournamentsThunk } from '../../../actions/tournaments';

export function useSearchTournaments() {
  const dispatch = useAppDispatch();

  return useCallback(
    (query: Query) => dispatch(fetchTournamentsThunk({ query })),
    [
      // dispatch is a stable reference
      dispatch,
    ]
  );
}
