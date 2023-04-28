import { type ThunkAction } from 'redux-thunk';
import { type RootState } from '../reducers';
import { type TournamentsAction } from './tournaments';

export type AppAction = TournamentsAction;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppAction
>;
