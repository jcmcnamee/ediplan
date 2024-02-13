import styled from "styled-components";

import RowItem from "./RowItem";

const StyledTableRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columnTemplate} 1fr;

  column-gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 2rem;
  line-height: 1.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

function TableRow({ asset, category, columnTemplate }) {
  // State

  // Hooks

  // const { updateAsset, isUpdating } = useUpdateAsset(category);

  return (
    <StyledTableRow
      role="row"
      $columnTemplate={columnTemplate}
    ></StyledTableRow>
  );
}

export default TableRow;
