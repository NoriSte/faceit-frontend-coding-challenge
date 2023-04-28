import { type AppThunk } from '.';
import { tournamentsSchema, type Tournament } from '../domain';
import { API_TOURNAMENTS_URL } from '../constants/api';
import { type Query } from '../reducers/tournaments';
export type TournamentsAction =
  | ReturnType<typeof setFetchTournamentsError>
  | ReturnType<typeof setFetchTournamentsSuccess>
  | ReturnType<typeof setFetchTournamentsLoading>;

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
