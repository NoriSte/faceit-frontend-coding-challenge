import * as React from 'react';
import { type FC } from 'react';
import styled from 'styled-components';

import { type Tournament } from '../../../domain';

import { TournamentItem } from './TournamentItem';

interface TournamentsListProps {
  tournaments: Tournament[];
  deleteTournament: (tournamentId: string) => void;
  editTournamentName: (tournament: Tournament) => void;

  className?: string;
}

const TournamentsListComponent: FC<TournamentsListProps> = (props) => {
  const { tournaments, deleteTournament, editTournamentName } = props;

  return (
    <ul>
      {tournaments.map((tournament) => (
        <TournamentItem
          key={tournament.id}
          tournament={tournament}
          deleteTournament={deleteTournament}
          editTournamentName={editTournamentName}
        />
      ))}
    </ul>
  );
};

export const TournamentsList = styled(TournamentsListComponent)``;
