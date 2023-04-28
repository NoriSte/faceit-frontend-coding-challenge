import * as React from 'react';
import { useState, useEffect, useRef, type FC } from 'react';

import Input from '../../../components/Input';
import { type Query } from '../../../reducers/tournaments';

interface SearchTournamentProps {
  searchTournaments: (query: Query) => void;
  currentSearchQuery: string;
}

export const SearchTournament: FC<SearchTournamentProps> = (props) => {
  const { currentSearchQuery, searchTournaments } = props;
  const { value, onChange } = useDelayedSearch({
    currentSearchQuery,
    searchTournaments,
  });

  return (
    <Input
      placeholder="Search tournament ..."
      onChange={onChange}
      value={value}
    />
  );
};

function useDelayedSearch(params: {
  searchTournaments: (query: Query) => void;
  currentSearchQuery: string;
}) {
  const { currentSearchQuery, searchTournaments } = params;

  const [value, setValue] = useState('');

  const searchTournamentsRef = useRef(searchTournaments);
  searchTournamentsRef.current = searchTournaments;

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const currentSearchIsTheSame = value === currentSearchQuery;
    if (currentSearchIsTheSame) return;

    const timeoutId = setTimeout(() => {
      searchTournamentsRef.current(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [currentSearchQuery, value]);

  return { value, onChange };
}
