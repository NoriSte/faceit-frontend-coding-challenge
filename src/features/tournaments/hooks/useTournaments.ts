import { useSelector } from 'react-redux';
import { getTournaments } from '../../../selectors';
/**
 * Provides all the utilities to connect the leaf Tournament components to the outer app's world.
 */
export function useTournaments() {
  const tournaments = useSelector(getTournaments);

  return {
    tournaments,
  };
}
