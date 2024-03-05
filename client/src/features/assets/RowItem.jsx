import styled from "styled-components";

const StyledRowItem = styled.div`
  border-right: 1px solid var(--color-grey-200);
  overflow-wrap: anywhere;
  font-weight: var(--table-font-weight);
  font-size: var(--table-font-size);
`;

function RowItem({ data }) {
  return (
    <StyledRowItem>{data}</StyledRowItem>
  );
}

export default RowItem;
