import styled from 'styled-components';

const StyledRowItem = styled.div`
  font-size: var(--table-font-size);
  font-weight: var(--table-font-weight);
  border-right: 1px solid var(--color-grey-200);
  overflow-wrap: anywhere;
`;

function RowItem({ item }) {

  return (
    <StyledRowItem>{item}</StyledRowItem>
  ) 
}

export default RowItem;
