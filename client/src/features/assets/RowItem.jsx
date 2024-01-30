import styled from 'styled-components';

const StyledRowItem = styled.div`
  font-size: var(--table-font-size);
  font-weight: var(--table-font-weight);
  border-right: 1px solid var(--color-grey-200);
  overflow-wrap: anywhere;
`;

const StyledInput = styled.input`
  /* font-size: var(--table-font-size);
  font-weight: var(--table-font-weight);
  border-right: 1px solid var(--color-grey-200);
  overflow-wrap: anywhere; */
  width: 100%;
`;

function RowItem({ children, editMode, assetKey }) {
  if (!editMode) return <StyledRowItem>{children}</StyledRowItem>;
  if (editMode)
    return <StyledInput type="text" id={assetKey} placeholder={children} />;
}

export default RowItem;
