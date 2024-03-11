import styled from "styled-components";
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { format, parse } from "date-fns";

import { useBookings } from "./useBookings";

import Spinner from "../../ui/Spinner";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const columnHelper = createColumnHelper();

const defColumns = [
  columnHelper.accessor("id", {
    header: "ID",
  }),
  columnHelper.accessor("created", {
    header: "Created",
    cell: (props) => {
      console.log(props.getValue());
      return format(
        parse(props.getValue(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", new Date()),
        "E do MMM yyyy"
      );
    },
  }),
  columnHelper.accessor("modified", {
    header: "Modified",
    cell: (props) => {
      return format(
        parse(props.getValue(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", new Date()),
        "E do MMM yyyy"
      );
    },
  }),
  columnHelper.accessor("startDate", {
    header: "Start",
    cell: (props) => {
      return format(
        parse(props.getValue(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", new Date()),
        "E do MMM yyyy"
      );
    },
  }),
  columnHelper.accessor("endDate", {
    header: "End",
    cell: (props) => {
      return format(
        parse(props.getValue(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", new Date()),
        "E do MMM yyyy"
      );
    },
  }),
  columnHelper.accessor("productionId", {
    header: "Prod ID",
  }),
  columnHelper.accessor("locationId", {
    header: "Location",
  }),
  columnHelper.accessor("isProvisional", {
    header: "Confirmed",
  }),
  columnHelper.accessor("isRemote", {
    header: "Remote",
  }),
  columnHelper.accessor("notes", {
    header: "Notes",
  }),
  columnHelper.display({
    header: "Menus",
    cell: "menu",
  }),
];

function BookingTable() {
  const { bookings, error, isPending } = useBookings();

  const table = useReactTable({
    data: bookings?.rowData ?? [],
    columns: defColumns,
    initialState: {
      columnVisibility: {
        created: false,
        modified: false,
      },
    },
    getCoreRowModel: getCoreRowModel(),
  });

  if (error) return <div>{error}</div>;
  if (isPending) return <Spinner />;

  const data = bookings.rowData;

  if (!data.length) return <Empty resource="bookings" />;

  console.log(table);

  return (
    <Container>
      <Menus>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Menus>
    </Container>
  );
}

export default BookingTable;
