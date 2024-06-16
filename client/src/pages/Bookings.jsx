import BookingTable from '../features/bookings/BookingTable';
import Filter from '../ui/Filter';
import FilterMenu from '../ui/Table/FilterMenu';
import Toolbar from '../ui/Toolbar';

function Bookings() {
  return (
    <>
      <h1>Bookings</h1>
      <Toolbar>
        <Toolbar.Panel side="right">
          <FilterMenu>
            <FilterMenu.Menu>
              <FilterMenu.Toggle />
              <FilterMenu.List>
                <Filter
                  filterField="status"
                  options={[
                    { value: 'all', label: 'All' },
                    { value: 'confirmed', label: 'Confirmed' },
                    { value: 'provisional', label: 'Provisional' },
                  ]}
                />
              </FilterMenu.List>
            </FilterMenu.Menu>
          </FilterMenu>
        </Toolbar.Panel>
      </Toolbar>
      <BookingTable />
    </>
  );
}

export default Bookings;
