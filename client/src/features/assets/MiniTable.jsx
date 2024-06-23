import {
  createColumnHelper,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import MiniTableLayout from '../../ui/Table/MiniTableLayout';
import Empty from '../../ui/Empty';
import IndeterminateCheckbox from '../../ui/Form/IndeterminateCheckbox';

function MiniTable({ tableData }) {
  const [pagination, setPagination] = useState(null);
  const [rowSelection, setRowSelection] = useState({});

  const [columns, data] = useMemo(() => {
    const column = createColumnHelper();

    const columns = [
      column.display({
        id: 'Select',
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
            {/* <input
              type="checkbox"
              checked={row.getIsChecked}
              disabled={row.getCanSelect}
              onChange={row.getToggleSelectedHandler}
            /> */}
          </div>
        ),
      }),
      column.accessor('id', {
        header: 'ID',
      }),
      column.accessor('type', {
        header: 'type',
      }),
      column.accessor('name', {
        header: 'Name',
      }),
    ];

    return [columns, tableData];
  }, [tableData]);

  console.log(rowSelection);

  const table = useReactTable({
    data: data ?? [],
    columns: columns,
    manualPagination: true,
    rowCount: data?.rowCount,
    state: {
      pagination,
      rowSelection,
    },
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    initialState: {
      columnVisibility: {
        created: false,
        modified: false,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getRowId: row => row.id,
    enableRowSelection: true,
  });

  return <MiniTableLayout table={table} />;
}

export default MiniTable;
