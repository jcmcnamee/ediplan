import { useAssets } from "./useAssets";
import { useOutletContext } from "react-router-dom";

import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import AssetRow from "./AssetRow";
import { useState } from "react";
import Table from "../../ui/Table";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: ${(props) => props.$columnTemplate} 1fr;
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
  const { assets, error, isPending } = useAssets(category);

  const tableHeaders = tableOptions[category].headers;
  const columnTemplate = tableOptions[category].columnTemplate;

  if (isPending) return <Spinner />;

  return (
    <Table columns="0.5fr 1fr 1fr 3fr 0.5fr 0.5fr">
      <Table.Header>
        {tableHeaders.map((header, index) => (
          <div key={index}>{header}</div>
        ))}
        <div>Controls</div>
      </Table.Header>

      {assets.map((asset) => (
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
