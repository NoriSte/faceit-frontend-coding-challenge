import * as React from 'react';
import { type FC } from 'react';
import styled from 'styled-components';

import theme from '../../../theme';
import { type Tournament } from '../../../domain';

import { TournamentItem } from './TournamentItem';

interface TournamentsListProps {
  tournaments: Tournament[];
  deleteTournament: (tournamentId: string) => void;
  editTournamentName: (tournament: Tournament) => void;

  className?: string;
}

const TournamentsListComponent: FC<TournamentsListProps> = (props) => {
  const { tournaments, deleteTournament, editTournamentName, className } =
    props;

  return (
    <ul className={className}>
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

export const TournamentsList = styled(TournamentsListComponent)`
  // Remove the default list styles
  margin: 0;
  padding: 0;
  list-style-type: none;

  display: grid;

  // One-columns grid by default
  grid-template-columns: minmax(0, 1fr);

  row-gap: ${theme.spacing(4)};
  column-gap: ${theme.spacing(4)};

  @media (min-width: ${theme.breakpoints.m}) {
    // Three-columns grid from iPad above
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: ${theme.breakpoints.xl}) {
    // Increment the gap between rows on large screens
    row-gap: ${theme.spacing(6)};
  }
`;
