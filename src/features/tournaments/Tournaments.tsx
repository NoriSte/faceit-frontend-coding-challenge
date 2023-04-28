import * as React from 'react';
import { LoadingTournaments } from './components/LoadingTournaments';

import { useTournaments } from './hooks/useTournaments';
import { TournamentsList } from './components/TournamentsList';
import { TournamentsError } from './components/TournamentsError';

import { NoTournamentsFound } from './components/NoTournamentsFound';
import { useFetchTournamentsOnMount } from './hooks/useFetchTournamentsOnMount';

export function Tournaments() {
  const {
    tournaments,
    deleteTournament,
    editTournamentName,
    retryFetchTournaments,
  } = useTournaments();

  useFetchTournamentsOnMount();

  switch (tournaments.status) {
    case 'idle': // The Tournaments fetch starts soon after the component is mounted
    case 'loading':
      return <LoadingTournaments />;

    case 'success':
      if (tournaments.tournaments.length === 0) {
        return <NoTournamentsFound />;
      }

      return (
          <TournamentsList
            tournaments={tournaments.tournaments}
            deleteTournament={deleteTournament}
            editTournamentName={editTournamentName}
          />
      );

    case 'error':
      return <TournamentsError onRetry={retryFetchTournaments} />;
  }

  // If TypeScript complains here, chances are the above code does not manage all the possible cases
  throwUnhandledStatus(tournaments);
}

function throwUnhandledStatus(status: never) {
  throw new Error(`Unhandled status: ${status}`);
}
