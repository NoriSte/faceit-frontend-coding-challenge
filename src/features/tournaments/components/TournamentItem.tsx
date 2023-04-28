import * as React from 'react';
import { type FC } from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import { type Tournament } from '../../../domain';

interface TournamentItemProps {
  tournament: Tournament;
}

const TournamentItemComponent: FC<TournamentItemProps> = (props) => {
  const { tournament } = props;

  return (
    <li>
      <span>{tournament.name}</span>
      <span>{tournament.id}</span>
    </li>
  );
};

export const TournamentItem = styled(TournamentItemComponent)``;
