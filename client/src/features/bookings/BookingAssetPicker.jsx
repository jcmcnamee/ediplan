import { useState } from 'react';
import { useAssets } from '../assets/useAssets';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import MiniTableLayout from '../../ui/Table/MiniTableLayout';
import MiniTable from '../assets/MiniTable';
import Toolbar from '../../ui/Toolbar';
import FilterMenu from '../../ui/Table/FilterMenu';
import Filter from '../../ui/Filter';
import Input from '../../ui/Form/Input';

function BookingAssetPicker() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { assets, error, isPending } = useAssets();

  if (error) return <div>{error}</div>;
  if (isPending) return <Spinner />;

  const data = assets;

  if (!data.length) return <Empty resource="bookings" />;
  console.log(data);

  return (
    <div>
      <Toolbar>
        <Toolbar.Panel side="left">
          <Input />
        </Toolbar.Panel>
        <Toolbar.Panel side="right">
          <FilterMenu>
            <FilterMenu.Toggle />
            <FilterMenu.List>
              <Filter
                filterField="addType"
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'equipment', label: 'Equipment' },
                  { value: 'person', label: 'Person' },
                  { value: 'room', label: 'Room' },
                ]}
              />
            </FilterMenu.List>
          </FilterMenu>
        </Toolbar.Panel>
      </Toolbar>
      <MiniTable tableData={data} />
    </div>
  );
}

export default BookingAssetPicker;
