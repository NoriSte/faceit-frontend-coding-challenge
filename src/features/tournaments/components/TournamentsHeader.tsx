import * as React from 'react';
import { type FC } from 'react';
import styled from 'styled-components';

import theme from '../../../theme';
import Button from '../../../components/Button';
import { type Query } from '../../../reducers/tournaments';

import { SearchTournament } from './SearchTournament';

interface TournamentsHeaderProps {
  currentSearchQuery: string;
  createTournament: () => void;
  searchTournaments: (query: Query) => void;

  className?: string;
}

const TournamentsHeaderComponent: FC<TournamentsHeaderProps> = (props) => {
  const { createTournament, searchTournaments, currentSearchQuery, className } =
    props;

  return (
    <div className={className}>
      <SearchTournament
        searchTournaments={searchTournaments}
        currentSearchQuery={currentSearchQuery}
      />
      <Button onClick={createTournament}>CREATE TOURNAMENT</Button>
    </div>
  );
};

export const TournamentsHeader = styled(TournamentsHeaderComponent)`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing(6)};
`;
