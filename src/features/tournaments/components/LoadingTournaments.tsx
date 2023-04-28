import * as React from 'react';
import { type FC } from 'react';
import styled from 'styled-components';

interface LoadingTournamentsProps {
  className?: string;
}

const LoadingTournamentsComponent: FC<LoadingTournamentsProps> = (props) => (
  <div className={props.className}>Loading tournaments ...</div>
);

export const LoadingTournaments = styled(LoadingTournamentsComponent)`
  display: flex;
  justify-content: center;
`;
