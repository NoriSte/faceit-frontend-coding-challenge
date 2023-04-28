import * as React from 'react';
import { type FC } from 'react';
import styled from 'styled-components';
import { type Query } from '../../../reducers/tournaments';

import { SearchTournament } from './SearchTournament';

interface TournamentsHeaderProps {
  currentSearchQuery: string;
  searchTournaments: (query: Query) => void;

  className?: string;
}
const TournamentsHeaderComponent: FC<TournamentsHeaderProps> = (props) => {
  const { searchTournaments, currentSearchQuery } = props;

  return (
    <div>
      <SearchTournament
        searchTournaments={searchTournaments}
        currentSearchQuery={currentSearchQuery}
      />
    </div>
  );
};

export const TournamentsHeader = styled(TournamentsHeaderComponent)``;
