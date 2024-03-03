import styled from "styled-components";
import { useBookings } from "../features/bookings/useBookings";
import Spinner from "../ui/Spinner";
import Table from "../ui/Table";
import Menus from "../ui/Menus";
import BookingHeaderItem from "../features/bookings/BookingHeaderItem";
import BookingRow from "../features/bookings/BookingRow";

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
  columnTemplate: "1fr 1fr 1fr 0.5fr 0.5fr 2fr 0.5fr",
};

function Bookings() {
  const { data, error, isPending } = useBookings();

  if (error) return <div>{error}</div>;
  if (isPending) return <Spinner />;

  const rowData = data.rowData;
  const tableMetadata = data.metadata;

  console.log("Column bastards: ", tableOpts.displayHeaders);

  return (
    <Table
      displayColumns={tableOpts.displayHeaders}
      columnWidths={tableOpts.columnTemplate}
      rowData={rowData}
    >
      <Container>
        <Menus>
          <Table.Header
            render={(headerItem, i) => (
              <BookingHeaderItem data={headerItem} key={i} />
            )}
          />
          <Table.Body
            render={(booking) => (
              <BookingRow booking={booking} key={booking.id} />
            )}
          />
        </Menus>
      </Container>
      ;
    </Table>
  );
}

export default Bookings;
