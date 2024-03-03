import Table from "../../ui/Table";
import RowItem from "../assets/RowItem";

function BookingRow({ booking }) {
  return (
    <Table.Row
      data={booking}
      render={(value, i) => <RowItem item={value} key={i} />}
    >
      <div>Menu</div>
    </Table.Row>
  );
}

export default BookingRow;
