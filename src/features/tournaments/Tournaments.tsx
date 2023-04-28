import * as React from 'react';
import { LoadingTournaments } from './components/LoadingTournaments';

import { useTournaments } from './hooks/useTournaments';
import { TournamentsError } from './components/TournamentsError';
import { useFetchTournamentsOnMount } from './hooks/useFetchTournamentsOnMount';

export function Tournaments() {
  const { tournaments, retryFetchTournaments } = useTournaments();

  useFetchTournamentsOnMount();

  switch (tournaments.status) {
    case 'idle': // The Tournaments fetch starts soon after the component is mounted
    case 'loading':
      return <LoadingTournaments />;

    case 'error':
      return <TournamentsError onRetry={retryFetchTournaments} />;
  }

  return null;
}
