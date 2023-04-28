import { type AppAction } from '../actions';
import { type Tournament } from '../domain';

type SearchQuery = string;
type AllTournamentsQuery = '';
export type Query = AllTournamentsQuery | SearchQuery;

type TournamentsState = {
  query: Query;
} & (
  | {
      status: 'idle' | 'loading' | 'error';
    }
  | {
      status: 'success';
      tournaments: Tournament[];
    }
);

const initialState: TournamentsState = {
  query: '',
  status: 'idle',
};

export default function tournaments(
  state: TournamentsState = initialState,
  action: AppAction
) {
  switch (action.type) {
    case 'SET_FETCH_TOURNAMENTS_SUCCESS':
      return {
        ...state,
        status: 'success',
        query: action.query,
        tournaments: action.tournaments,
      } as const;

    case 'SET_FETCH_TOURNAMENTS_LOADING':
      return {
        ...state,
        status: 'loading',
        query: action.query,
      } as const;

    case 'SET_FETCH_TOURNAMENTS_ERROR':
      return {
        ...state,
        status: 'error',
        query: action.query,
      } as const;

    case 'OPTIMISTICALLY_UPDATE_TOURNAMENT': {
      if (state.status !== 'success') return state;

      const index = state.tournaments.findIndex(
        (t) => t.id === action.tournament.id
      );

      if (index === -1) return state;

      const nextTournaments = state.tournaments.map((tournament) => {
        if (tournament.id === action.tournament.id) return action.tournament;
        return tournament;
      });

      return {
        ...state,
        tournaments: nextTournaments,
      };
    }

    default:
      return state;
  }
}
