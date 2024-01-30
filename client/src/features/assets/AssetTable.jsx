import { useFetchAssets } from './useFetchAssets';
import { useOutletContext } from 'react-router-dom';

import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import AssetRow from './AssetRow';

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

function AssetTable() {
  const { tableOptions, category } = useOutletContext();
  const { assets, error, isLoading } = useFetchAssets(category);

  const tableHeaders = tableOptions[category].headers;
  const columnTemplate = tableOptions[category].columnTemplate;

  console.log(tableOptions[category].headers);

  if (isLoading) return <Spinner />;

  return (
    <Table role="table">
      <TableHeader role="row" $columnTemplate={columnTemplate}>
        {tableHeaders.map((header, index) => (
          <div key={index}>{header}</div>
        ))}
        <div>Controls</div>
      </TableHeader>
      {assets.map(asset => (
        <AssetRow
          asset={asset}
          category={category}
          columnTemplate={columnTemplate}
          key={asset.id}
        />
      ))}
    </Table>
  );
}

export default AssetTable;
