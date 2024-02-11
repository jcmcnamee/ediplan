import styled from 'styled-components';

const StyledToolbar = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.2rem;
  height: fit-content;
  border: 1px solid var(--color-grey-400);
  padding: 0.1rem 0.1rem;
`;

function Toolbar({ children }) {
  return <StyledToolbar>{children}</StyledToolbar>;
}

export default Toolbar;
