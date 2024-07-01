import { LuPackagePlus } from 'react-icons/lu';
import Button from '../../ui/Button';
import Form from '../../ui/Form/Form';
import Toolbar from '../../ui/Toolbar';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import BookingAssetPicker from './BookingAssetPicker';

function CreateBookingForm() {
  const [showAssets, setShowAssets] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState({});

  console.log('Selected assets: ', selectedAssets);

  const methods = useForm();

  const onSubmit = data => console.log(data);

  const handleToggleAssets = () => {
    setShowAssets(s => !s);
    console.log('Toggling: ');
  };

  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <Form.TextShort
            label="Booking name: "
            id="name"
            placeholder="Booking name...."
          />
          <Form.Checkbox label="Provisional: " id="provisional" side="right" />
          <Form.DateSelect label="Start: " id="startDate" />
          <Form.DateSelect label="End: " id="endDate" />
          <Form.TextLong label="Notes: " id="description" />
        </Form>
      </FormProvider>
      <Toolbar>
        <Toolbar.Panel side="left">
          <Toolbar.Button $variation="primary" onClick={handleToggleAssets}>
            <LuPackagePlus />
          </Toolbar.Button>
        </Toolbar.Panel>
        <Toolbar.Panel side="right">
          <Button
            variation="primary"
            size="medium"
            onClick={methods.handleSubmit(onSubmit)}>
            Create booking
          </Button>
        </Toolbar.Panel>
      </Toolbar>
      <div>
        {showAssets ? (
          <BookingAssetPicker
            selectedAssets={selectedAssets}
            setSelectedAssets={setSelectedAssets}
          />
        ) : (
          'No assets....'
        )}
      </div>
    </>
  );
}

export default CreateBookingForm;
