import styled from "styled-components";

import { useBookings } from "./useBookings";

import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import BookingHeaderItem from "./BookingHeaderItem";
import Menus from "../../ui/Menus";
import BookingRow from "./BookingRow";
import Empty from "../../ui/Empty";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const tableOpts = {
  displayHeaders: [
    "Production",
    "Start",
    "End",
    "Confirmed",
    "Remote",
    "Notes",
  ],
  columnTemplate: "1fr 0.8fr 0.8fr 0.5fr 0.5fr 2.2fr 0.5fr",
};

function BookingTable() {
  const { bookings, error, isPending } = useBookings();

  if (error) return <div>{error}</div>;
  if (isPending) return <Spinner />;

  const data = bookings.rowData;
  const metadata = bookings.metadata;

  if (!data.length) return <Empty resource="bookings" />;

  return (
    <Table
      displayColumns={tableOpts.displayHeaders}
      columnWidths={tableOpts.columnTemplate}
    >
      <Container>
        <Menus>
          <Table.Header
            render={(headerItem, i) => (
              <BookingHeaderItem data={headerItem} key={i} />
            )}
          />
          <Table.Body
            data={data}
            render={(booking) => (
              <BookingRow booking={booking} key={booking.id} />
            )}
          />
        </Menus>
      </Container>
    </Table>
  );
}

export default BookingTable;
