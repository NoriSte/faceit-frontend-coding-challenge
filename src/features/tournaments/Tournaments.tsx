import * as React from 'react';

import { useTournaments } from './hooks/useTournaments';
import { TournamentsList } from './components/TournamentsList';
import { TournamentsError } from './components/TournamentsError';
import { TournamentsHeader } from './components/TournamentsHeader';
import { NoTournamentsFound } from './components/NoTournamentsFound';
import { LoadingTournaments } from './components/LoadingTournaments';
import { useFetchTournamentsOnMount } from './hooks/useFetchTournamentsOnMount';

export function Tournaments() {
  const {
    tournaments,
    deleteTournament,
    createTournament,
    searchTournaments,
    editTournamentName,
    retryFetchTournaments,
  } = useTournaments();

  useFetchTournamentsOnMount();

  switch (tournaments.status) {
    case 'idle': // The Tournaments fetch starts soon after the component is mounted
    case 'loading':
      return (
        <>
          <TournamentsHeader
            currentSearchQuery={tournaments.query}
            createTournament={createTournament}
            searchTournaments={searchTournaments}
          />
          <LoadingTournaments />
        </>
      );

    case 'success':
      if (tournaments.tournaments.length === 0) {
        return (
          <>
            <TournamentsHeader
              currentSearchQuery={tournaments.query}
              createTournament={createTournament}
              searchTournaments={searchTournaments}
            />
            <NoTournamentsFound />
          </>
        );
      }

      return (
        <>
          <TournamentsHeader
            currentSearchQuery={tournaments.query}
            createTournament={createTournament}
            searchTournaments={searchTournaments}
          />
          <TournamentsList
            tournaments={tournaments.tournaments}
            deleteTournament={deleteTournament}
            editTournamentName={editTournamentName}
          />
        </>
      );

    case 'error':
      return (
        <>
          <TournamentsHeader
            currentSearchQuery={tournaments.query}
            createTournament={createTournament}
            searchTournaments={searchTournaments}
          />
          <TournamentsError onRetry={retryFetchTournaments} />
        </>
      );
  }

  // If TypeScript complains here, chances are the above code does not manage all the possible cases
  throwUnhandledStatus(tournaments);
}

function throwUnhandledStatus(status: never) {
  throw new Error(`Unhandled status: ${status}`);
}
