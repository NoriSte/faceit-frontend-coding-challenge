import * as React from 'react';
import { type FC } from 'react';
import styled from 'styled-components';

import { type Tournament } from '../../../domain';

import { TournamentItem } from './TournamentItem';

interface TournamentsListProps {
  tournaments: Tournament[];

  className?: string;
}

const TournamentsListComponent: FC<TournamentsListProps> = (props) => {
  const { tournaments } = props;

  return (
    <ul>
      {tournaments.map((tournament) => (
        <TournamentItem key={tournament.id} tournament={tournament} />
      ))}
    </ul>
  );
};

export const TournamentsList = styled(TournamentsListComponent)``;
