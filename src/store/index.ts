import { createStore, applyMiddleware } from 'redux';
import thunk, { type ThunkMiddleware } from 'redux-thunk';

import rootReducer, { type RootState } from '../reducers';
import { type AppAction } from '../actions';

const typedThunkMiddleware: ThunkMiddleware<RootState, AppAction> = thunk;
const store = createStore(rootReducer, applyMiddleware(typedThunkMiddleware));

export type { RootState } from '../reducers';
export default store;
