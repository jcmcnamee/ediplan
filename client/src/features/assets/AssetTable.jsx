import styled from 'styled-components';

import { useQuery } from '@tanstack/react-query';
import { fetchEquip } from '../../services/assetsApi';

import Spinner from '../../ui/Spinner';
import EquipmentRow from './EquipmentRow';
import AssetRow2 from './AssetRow2';

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
  grid-template-columns: ${props => props.$columnTemplate} 1fr;
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

const queryFunctionMap = {
  equipment: fetchEquip,
};

const rowMap = {
  equipment: EquipmentRow,
};

function AssetTable({ headers, queryKey }) {
  const queryFn = queryFunctionMap[queryKey];
  const AssetRow = rowMap[queryKey];

  const {
    data: asset,
    error,
    isLoading,
  } = useQuery({
    queryKey: [queryKey],
    queryFn,
  });

  if (isLoading) return <Spinner />;

  return (
    <Table role="table">
      <TableHeader role="row" $columnTemplate={headers.columnTemplate}>
        {headers.items.map((header, index) => (
          <div key={index}>{header}</div>
        ))}
        <div></div>
      </TableHeader>
      {asset.map(asset => (
        <AssetRow2 asset={asset} key={asset.id} />
      ))}
    </Table>
  );
}

export default AssetTable;
