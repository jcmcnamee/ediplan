import styled from 'styled-components';

const StyledContainer = styled.div`
  height: 100%;
  width: auto;
  background-color: var(--color-brand-50);

  display: grid;
  grid-template-columns: 2;
`;

function TimelineContainer() {
  return <StyledContainer>Timeline container</StyledContainer>;
}

export default TimelineContainer;
