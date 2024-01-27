import { useMutation, useQueryClient } from '@tanstack/react-query';
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

function EquipmentRow({ equipment }) {
  const { id, make, model, description, price, price_unit } = equipment;

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteEquip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
    },
    onError: err => alert(err.message),
  });

  return (
    <TableRow role="row">
      <Make>{make}</Make>
      <Model>{model}</Model>
      <Description>{description}</Description>
      <Price>{`£${price} p/${price_unit}`}</Price>
      <button onClick={() => mutate(id)} disabled={isLoading}>
        Delete
      </button>
    </TableRow>
  );
}

export default EquipmentRow;
