import * as React from 'react';
import { LoadingTournaments } from './components/LoadingTournaments';

import { useTournaments } from './hooks/useTournaments';
import { useFetchTournamentsOnMount } from './hooks/useFetchTournamentsOnMount';

export function Tournaments() {
  const { tournaments } = useTournaments();

  useFetchTournamentsOnMount();

  switch (tournaments.status) {
    case 'idle': // The Tournaments fetch starts soon after the component is mounted
    case 'loading':
      return <LoadingTournaments />;
  }

  return null;
}
