/* eslint-disable no-unused-vars */
import styled, { css } from 'styled-components';

const sizes = {
  single: css`
    font-size: 2rem;
    width: 3rem;
    height: 3rem;
    text-transform: uppercase;
    font-weight: 400;
    text-align: center;
  `,
  double: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-600);
    background-color: var(--color-brand-50);
    border: 1px solid var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-100);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const ToolbarButton = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-lg);

  ${props => sizes[props.$size]}
  ${props => variations[props.$variation]}
`;

ToolbarButton.defaultProps = {
  $variation: 'primary',
  $size: 'single',
};

export default ToolbarButton;
