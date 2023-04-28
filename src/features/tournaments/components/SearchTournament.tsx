import * as React from 'react';
import { type FC } from 'react';

import Input from '../../../components/Input';
import { type Query } from '../../../reducers/tournaments';

interface SearchTournamentProps {
  searchTournaments: (query: Query) => void;
}

export const SearchTournament: FC<SearchTournamentProps> = (props) => {
  const { searchTournaments } = props;

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    searchTournaments(event.target.value);
  };

  return <Input placeholder="Search tournament ..." onChange={onChange} />;
};
