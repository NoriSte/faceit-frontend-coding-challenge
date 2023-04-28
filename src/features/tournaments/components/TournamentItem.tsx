import * as React from 'react';
import { type FC } from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import { type Tournament } from '../../../domain';

interface TournamentItemProps {
  tournament: Tournament;
  deleteTournament: (tournamentId: string) => void;
  editTournamentName: (tournament: Tournament) => void;
}

const TournamentItemComponent: FC<TournamentItemProps> = (props) => {
  const { tournament, editTournamentName, deleteTournament } = props;

  return (
    <li>
      <span>{tournament.name}</span>
      <span>{tournament.id}</span>
      <Button onClick={() => editTournamentName(tournament)}>Edit</Button>
      <Button onClick={() => deleteTournament(tournament.id)}>Delete</Button>
    </li>
  );
};

export const TournamentItem = styled(TournamentItemComponent)``;
