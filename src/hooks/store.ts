import { type TypedUseSelectorHook, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import store, { type RootState } from '../store';

type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;

// --------------------------------------------------
// REACT APIS
// --------------------------------------------------
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
