import { LuPackagePlus } from 'react-icons/lu';
import Button from '../../ui/Button';
import Form from '../../ui/Form/Form';
import FormRow from '../../ui/Form/FormRow';
import Input from '../../ui/Form/Input';
import Toolbar from '../../ui/Toolbar';
import { useState } from 'react';
import MiniTable from '../assets/MiniTable';
import BookingAssetPicker from './BookingAssetPicker';

function CreateBookingForm() {
  const [showAssets, setShowAssets] = useState(false);
  const [selectedAsset, setSelectedAssets] = useState([]);

  const handleToggleAssets = () => {
    setShowAssets(s => !s);
    console.log('Toggling: ');
  };

  return (
    <>
      <Form>
        <Form.TextShort label="Booking name: " id="name" />
        <Form.Checkbox label="Provisional: " id="provisional" side="right" />
        <Form.DateSelect label="Start: " id="startDate" />
        <Form.DateSelect label="End: " id="endDate" />
        <Form.TextLong label="Notes: " id="description" />
      </Form>
      <Toolbar>
        <Toolbar.Panel side="left">
          <Toolbar.Button $variation="primary" onClick={handleToggleAssets}>
            <LuPackagePlus />
          </Toolbar.Button>
        </Toolbar.Panel>
        <Toolbar.Panel side="right">
          <Button variation="primary" size="large">
            Create booking
          </Button>
        </Toolbar.Panel>
      </Toolbar>
      <div>{showAssets ? <BookingAssetPicker /> : 'No assets....'}</div>
    </>
  );
}

export default CreateBookingForm;
