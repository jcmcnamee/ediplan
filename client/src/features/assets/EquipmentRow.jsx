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

const Make = styled.div`
  font-size: var(--table-font-size);
  font-weight: var(--table-font-weight);
`;
const Model = styled.div`
  font-size: var(--table-font-size);
  font-weight: var(--table-font-weight);
`;
const Description = styled.div`
  font-size: var(--table-font-size);
  font-weight: var(--table-font-weight);
`;
const Price = styled.div`
  font-size: var(--table-font-size);
  font-weight: var(--table-font-weight);
`;

function EquipmentRow({ asset }) {
  const { id, make, model, description, price, price_unit } = asset;
  const [showForm, setShowForm] = useState(false);

  return (
    <TableRow role="row">
      <Make>{make}</Make>
      <Model>{model}</Model>
      <Description>{description}</Description>
      <Price>{`£${price} p/${price_unit}`}</Price>
      <div>
        <button>Edit</button>
        {/* <button onClick={() => mutate(id)} disabled={isDeleting}>
          Delete
        </button> */}
      </div>
    </TableRow>
  );
}

export default EquipmentRow;
