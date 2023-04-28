import * as React from 'react';
import { type FC } from 'react';
import styled from 'styled-components';

import { type Query } from '../../../reducers/tournaments';
import Button from '../../../components/Button';
import theme from '../../../theme';

interface TournamentsErrorProps {
  onRetry: () => void;
  className?: string;
}

const TournamentsErrorComponent: FC<TournamentsErrorProps> = (props) => {
  return (
    <div className={props.className}>
      <span>Something went wrong.</span>
      <Button onClick={props.onRetry}>Retry</Button>
    </div>
  );
};

export const TournamentsError = styled(TournamentsErrorComponent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  * + * {
    margin-top: ${theme.spacing(4)};
  }
`;
