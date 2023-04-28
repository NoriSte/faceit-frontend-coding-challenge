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

    default:
      return state;
  }
}
