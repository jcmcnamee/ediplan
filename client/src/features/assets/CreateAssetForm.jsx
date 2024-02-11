import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import Textarea from '../../ui/Textarea';
import Select from '../../ui/Select';
import FormRow from '../../ui/FormRow';

import { useUpdateAsset } from './useUpdateAsset';
import { useCreateAsset } from './useCreateAsset';

function CreateAssetForm({ category, assetToUpdate = {} }) {
  const { isUpdating, updateAsset } = useUpdateAsset(category);
  const { isCreating, createAsset } = useCreateAsset(category);
  const isWorking = isCreating || isUpdating;

  const { id: editId, ...assetVals } = assetToUpdate;
  const editMode = Boolean(editId);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: editMode ? assetVals : {},
  });

  function onSubmit(data) {
    if (editMode) {
      updateAsset(
        { id: editId, updatedData: { ...data } },
        { onSuccess: data => reset() }
      );
    }
    if (!editMode) {
      createAsset(data, { onSuccess: data => reset() });
    }
  }

  function onError(errors) {
    // log errors
  }

  if (category === 'equip')
    return (
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Make">
          <Input
            type="text"
            id="make"
            disabled={isWorking}
            {...register('make')}
          />
        </FormRow>

        <FormRow label="Model">
          <Input
            type="text"
            id="model"
            disabled={isWorking}
            {...register('model')}
          />
        </FormRow>

        <FormRow label="Description">
          <Textarea
            type="number"
            id="description"
            defaultValue=""
            disabled={isWorking}
            {...register('description')}
          />
        </FormRow>

        <FormRow label="Price">
          <Input
            type="number"
            id="price"
            step="0.01"
            defaultValue={0}
            disabled={isWorking}
            {...register('price')}
          />
        </FormRow>

        <FormRow label="Unit">
          <Select type="text" id="priceUnit" {...register('priceUnit')}>
            <option>Day</option>
            <option>Hour</option>
          </Select>
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {editMode ? 'Edit' : 'Create new'}
          </Button>
        </FormRow>
      </Form>
    );
}

export default CreateAssetForm;
