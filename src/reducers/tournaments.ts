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

    case 'ADD_TOURNAMENT': {
      if (state.status !== 'success') return state;

      const nextTournaments = [action.tournament, ...state.tournaments];

      return {
        ...state,
        tournaments: nextTournaments,
      };
    }

    case 'OPTIMISTICALLY_DELETE_TOURNAMENT':
      const { tournamentId } = action;

      if (state.status !== 'success') return state;

      const index = state.tournaments.findIndex((t) => t.id === tournamentId);

      if (index === -1) return state;

      const nextTournaments = state.tournaments.reduce<Tournament[]>(
        (acc, tournament) => {
          if (tournament.id === tournamentId) return acc;

          acc.push(tournament);
          return acc;
        },
        []
      );

      return {
        ...state,
        tournaments: nextTournaments,
      };

    case 'ROLLBACK_TOURNAMENTS':
      if (state.status !== 'success') return state;

      return {
        ...state,
        tournaments: action.tournaments,
      };

    default:
      return state;
  }
}
