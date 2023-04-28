import { type AppThunk } from '.';
import { tournamentsSchema, type Tournament } from '../domain';
import { API_TOURNAMENTS_URL } from '../constants/api';
import { type Query } from '../reducers/tournaments';
export type TournamentsAction =
  | ReturnType<typeof rollbackTournaments>
  | ReturnType<typeof setFetchTournamentsError>
  | ReturnType<typeof setFetchTournamentsSuccess>
  | ReturnType<typeof setFetchTournamentsLoading>
  | ReturnType<typeof optimisticallyUpdateTournament>
  | ReturnType<typeof optimisticallyDeleteTournament>;

// --------------------------------------------------
// ACTIONS
// --------------------------------------------------
function setFetchTournamentsSuccess(query: Query, tournaments: Tournament[]) {
  return {
    type: 'SET_FETCH_TOURNAMENTS_SUCCESS',
    tournaments,
    query,
  } as const;
}

function setFetchTournamentsLoading(query: Query) {
  return {
    type: 'SET_FETCH_TOURNAMENTS_LOADING',
    query,
  } as const;
}

function setFetchTournamentsError(query: Query) {
  return {
    type: 'SET_FETCH_TOURNAMENTS_ERROR',
    query,
  } as const;
}

function optimisticallyUpdateTournament(tournament: Tournament) {
  return {
    type: 'OPTIMISTICALLY_UPDATE_TOURNAMENT',
    tournament,
  } as const;
}

function optimisticallyDeleteTournament(tournamentId: string) {
  return {
    type: 'OPTIMISTICALLY_DELETE_TOURNAMENT',
    tournamentId,
  } as const;
}

function rollbackTournaments(tournaments: Tournament[]) {
  return {
    type: 'ROLLBACK_TOURNAMENTS',
    tournaments,
  } as const;
}

// --------------------------------------------------
// ASYNC ACTIONS
// --------------------------------------------------
export const fetchTournamentsThunk =
  (payload: { query: Query }): AppThunk =>
  async (dispatch) => {
    const { query } = payload;

    try {
      dispatch(setFetchTournamentsLoading(query));
      const tournaments = await fetchServerTournaments({ query });
      dispatch(setFetchTournamentsSuccess(query, tournaments));
    } catch (error) {
      dispatch(setFetchTournamentsError(query));
    }
  };

export const editTournamentThunk =
  (payload: {
    prevTournament: Tournament;
    nextTournament: Tournament;
  }): AppThunk =>
  async (dispatch) => {
    const { prevTournament, nextTournament } = payload;

    try {
      // Optimistic update
      dispatch(optimisticallyUpdateTournament(nextTournament));

      await editServerTournament({
        tournamentId: nextTournament.id,
        newName: nextTournament.name,
      });

      // In case of success, there is nothing more to do since the optimistic update already
      // updated the store.
      // ATTENTION: The tournaments are not re-fetched. This works until this app is the only one
      // that can edit/delete tournaments.
    } catch (error) {
      // Optimistic update rollback
      dispatch(optimisticallyUpdateTournament(prevTournament));
    }
  };
export const deleteTournamentThunk =
  (payload: { tournamentId: string }): AppThunk =>
  async (dispatch, getState) => {
    const { tournamentId } = payload;

    const prevTournaments = getState().tournaments;

    try {
      // Optimistic update
      dispatch(optimisticallyDeleteTournament(tournamentId));

      await deleteServerTournament({
        tournamentId: tournamentId,
      });

      // In case of success, there is nothing more to do since the optimistic update already
      // updated the store
      // ATTENTION: The tournaments are not re-fetched. This works until this app is the only one
      // that can edit/delete tournaments.
    } catch (error) {
      // Optimistic update rollback: the tournament should be re-added in the same position as before,
      // otherwise the users could miss that the tournament was not deleted (what happens if the
      // tournament is restored at the end of the list the the users do not have all the tournaments
      // in the viewport?). Restoring the whole tournaments is easier than keeping track of the index
      // of the tournament before deleting it and restoring it at the same position
      // ATTENTION: The tournaments are not re-fetched. This works until this app is the only one
      // that can edit/delete tournaments.
      if (prevTournaments.status === 'success') {
        dispatch(rollbackTournaments(prevTournaments.tournaments));
      }
    }
  };

// --------------------------------------------------
// FETCHERS
// --------------------------------------------------
const fetchServerTournaments = (options: {
  query: Query;
}): Promise<Tournament[]> =>
  fetch(`${API_TOURNAMENTS_URL}?q=${options.query}`)
    .then((response) => {
      if (!response.ok) throw new Error('Server error');

      return response.json();
    })
    .then(tournamentsSchema.parse);

const editServerTournament = (options: {
  tournamentId: string;
  newName: string;
}): Promise<unknown> =>
  fetch(`${API_TOURNAMENTS_URL}/${options.tournamentId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: options.newName }),
  }).then((response) => {
    if (!response.ok) throw new Error('Server error');

    // The response is not used at the moment, that's why it's not parsed/validated and why the
    // promise is typed to resolve to unknown
    return response.json();
  });

const deleteServerTournament = (options: {
  tournamentId: string;
}): Promise<unknown> =>
  fetch(`${API_TOURNAMENTS_URL}/${options.tournamentId}`, {
    method: 'DELETE',
  }).then((response) => {
    if (!response.ok) throw new Error('Server error');

    // The response is not used at the moment, that's why it's not parsed/validated and why the
    // promise is typed to resolve to unknown
    return response.json();
  });
