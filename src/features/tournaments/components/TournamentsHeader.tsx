import * as React from 'react';
import { type FC } from 'react';
import styled from 'styled-components';
import { type Query } from '../../../reducers/tournaments';

import { SearchTournament } from './SearchTournament';

interface TournamentsHeaderProps {
  searchTournaments: (query: Query) => void;

  className?: string;
}
const TournamentsHeaderComponent: FC<TournamentsHeaderProps> = (props) => {
  const { searchTournaments, className } = props;

  return (
    <div className={className}>
      <SearchTournament searchTournaments={searchTournaments} />
    </div>
  );
};

export const TournamentsHeader = styled(TournamentsHeaderComponent)``;
