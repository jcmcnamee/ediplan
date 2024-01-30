import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import Textarea from '../../ui/Textarea';
import Select from '../../ui/Select';
import { addAsset } from '../../services/assetsApi';
import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow';

function CreateAssetForm({ category }) {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: addAsset,
    onSuccess: () => {
      toast.success('New asset successfully created.');
      queryClient.invalidateQueries({ queryKey: [category] });
      reset();
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    mutate(data);
  }

  if (category === 'equip')
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Make">
          <Input type="text" id="make" {...register('make')} />
        </FormRow>

        <FormRow label="Model">
          <Input type="text" id="model" {...register('model')} />
        </FormRow>

        <FormRow label="Description">
          <Textarea
            type="number"
            id="description"
            defaultValue=""
            {...register('description')}
          />
        </FormRow>

        <FormRow label="Price">
          <Input
            type="number"
            id="price"
            step="0.01"
            defaultValue={0}
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
          <Button disabled={isCreating}>Add asset</Button>
        </FormRow>
      </Form>
    );
}

export default CreateAssetForm;
