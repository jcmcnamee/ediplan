import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { deleteEquip } from '../../services/assetsApi';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 4fr 1fr 1fr;

  column-gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 2rem;
  line-height: 1.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const RowItem = styled.div`
  font-size: var(--table-font-size);
  font-weight: var(--table-font-weight);
`;

function AssetRow2({ asset, queryKey }) {
  const properties = Object.values(asset);

  const [showForm, setShowForm] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: deleteEquip,
    onSuccess: () => {
      toast.success('Asset successfully deleted');

      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
    onError: err => toast.error(err.message),
  });

  return (
    <TableRow role="row">
      {properties.map((property, index) => (
        <RowItem key={index}>{property}</RowItem>
      ))}
      <div>
        <button>Edit</button>
        {/* <button onClick={() => mutate(id)} disabled={isDeleting}>
          Delete
        </button> */}
      </div>
    </TableRow>
  );
}

export default AssetRow2;
