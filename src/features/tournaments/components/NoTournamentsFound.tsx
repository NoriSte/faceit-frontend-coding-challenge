import * as React from 'react';
import { type FC } from 'react';
import styled from 'styled-components';

interface NoTournamentsFoundProps {
  className?: string;
}

const NoTournamentsFoundComponent: FC<NoTournamentsFoundProps> = (props) => (
  <div className={props.className}>No tournaments found.</div>
);

export const NoTournamentsFound = styled(NoTournamentsFoundComponent)`
  display: flex;
  justify-content: center;
`;
