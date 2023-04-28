import { useEffect } from 'react';
import { useAppDispatch } from '../../../hooks/store';
import { fetchTournamentsThunk } from '../../../actions/tournaments';

export function useFetchTournamentsOnMount() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTournamentsThunk({ query: '' }));
  }, [
    // dispatch is a stable reference
    dispatch,
  ]);
}
