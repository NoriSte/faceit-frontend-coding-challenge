import * as React from 'react';
import { type FC } from 'react';
import styled from 'styled-components';

import theme from '../../../theme';
import H6 from '../../../components/H6';
import Button from '../../../components/Button';
import { type Tournament } from '../../../domain';

interface TournamentItemProps {
  tournament: Tournament;
  deleteTournament: (tournamentId: string) => void;
  editTournamentName: (tournament: Tournament) => void;

  className?: string;
}

const TournamentItemComponent: FC<TournamentItemProps> = (props) => {
  const { tournament, editTournamentName, deleteTournament, className } = props;

  const dateText = convertDateToText(tournament.startDate);

  return (
    <li className={className}>
      <H6>{tournament.name}</H6>
      <Row>Organizer: {tournament.organizer}</Row>
      <Row>Game: {tournament.game}</Row>
      <Row>
        Participants: {tournament.participants.max}/
        {tournament.participants.max}
      </Row>
      <Row>
        Participants: {tournament.participants.max}/
        {tournament.participants.max}
      </Row>
      <Row>Start: {dateText}</Row>

      <Button onClick={() => editTournamentName(tournament)}>Edit</Button>
      <Button onClick={() => deleteTournament(tournament.id)}>Delete</Button>
    </li>
  );
};

export const TournamentItem = styled(TournamentItemComponent)`
  border-radius: ${theme.borderRadius};
  background: ${theme.palette.background.base};

  padding: ${theme.spacing(3)};

  ${Button} {
    margin-top: ${theme.spacing(2)};
  }

  ${Button} + ${Button} {
    margin-left: ${theme.spacing(2)};
  }
`;

export const Row = styled.span`
  display: block;
`;

function convertDateToText(dateString: string) {
  const date = new Date(dateString);

  // Print the date in DD/MM/YYYY, HH:mm:ss format
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
}
