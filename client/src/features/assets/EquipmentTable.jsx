import styled from 'styled-components';

import { useQuery } from '@tanstack/react-query';
import { fetchEquip } from '../../services/assetsApi';

import Spinner from '../../ui/Spinner';
import EquipmentRow from './EquipmentRow';

const Table = styled.div`
  border: 1px solid var(--color-brand-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 0 0 7px 7px;
  overflow: hidden;
  box-shadow: var(--shadow-tab-active);
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr 4fr 1fr 1fr;
  column-gap: 0.5rem;
  align-items: center;

  background-color: var(--color-brand-100);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1rem 2rem;
`;

function EquipmentTable() {
  const {
    data: equipment,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['equipment'],
    queryFn: fetchEquip,
  });

  console.log(equipment);

  if (isLoading) return <Spinner />;

  return (
    <Table role="table">
      <TableHeader role="row">
        <div>Make</div>
        <div>Model</div>
        <div>Description</div>
        <div>Price</div>
        <div></div>
      </TableHeader>
      {equipment.map(equipment => <EquipmentRow equipment={equipment} key={equipment.id} />)}
    </Table>
  );
}

export default EquipmentTable;
