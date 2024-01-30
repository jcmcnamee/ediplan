import { useState } from 'react';

import styled from 'styled-components';

import { useDeleteAsset } from './useDeleteAsset';

import RowItem from './RowItem';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$columnTemplate} 1fr;

  column-gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 2rem;
  line-height: 1.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  
`;

function AssetRow({ asset, category, columnTemplate }) {
  const assetVals = Object.values(asset).splice(1);
  const assetKeys = Object.keys(asset).splice(1);
  const assetId = Object.values(asset)[0];

  const [editMode, setEditMode] = useState(false);
  const { deleteAsset, isDeleting } = useDeleteAsset(category);

  return (
    <TableRow role="row" $columnTemplate={columnTemplate}>
      {assetVals.map((value, index) => (
        <RowItem editMode={editMode} assetKey={assetKeys[index]} key={index}>
          {value}
        </RowItem>
      ))}

      <div>
        <button onClick={() => setEditMode(!editMode)}>Edit</button>
        <button
          onClick={() => deleteAsset(assetId)}
          disabled={isDeleting}
          hidden={editMode}
        >
          Delete
        </button>
        <button hidden={!editMode}>Submit</button>
      </div>
    </TableRow>
  );
}

export default AssetRow;
