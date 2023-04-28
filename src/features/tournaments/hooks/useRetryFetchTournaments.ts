import { useCallback } from 'react';

import { getTournamentsQuery } from '../../../selectors';
import { fetchTournamentsThunk } from '../../../actions/tournaments';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';

export function useRetryFetchTournaments() {
  const dispatch = useAppDispatch();
  const query = useAppSelector(getTournamentsQuery);

  return useCallback(
    () => dispatch(fetchTournamentsThunk({ query })),
    [
      // dispatch is a stable reference
      dispatch,
      query,
    ]
  );
}
