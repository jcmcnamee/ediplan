import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import Select from "../../ui/Select";
import FormRow from "../../ui/FormRow";

import { useUpdateAsset } from "./useUpdateAsset";
import { useCreateAsset } from "./useCreateAsset";

function CreateAssetForm({ category, assetToUpdate = {} }) {
  const { isUpdating, updateAsset } = useUpdateAsset(category);
  const { isCreating, createAsset } = useCreateAsset(category);
  const isWorking = isCreating || isUpdating;

  const { id: editId, ...assetVals } = assetToUpdate;
  const editMode = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editMode ? assetVals : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    console.log("Data: ", data);
    if (editMode) {
      updateAsset(
        { id: editId, updatedData: { ...data } },
        { onSuccess: (data) => reset() }
      );
    }
    if (!editMode) {
      createAsset(data, { onSuccess: (data) => reset() });
    }
  }

  function onError(errors) {
    // log errors
  }

  if (category === "equip")
    return (
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Asset No." error={errors?.assetNum?.message}>
          <Input
            type="number"
            id="assetNum"
            disabled={isWorking}
            {...register("assetNum", {
              min: {
                value: 1,
                message: "Value should be at least 1",
              },
            })}
          />
        </FormRow>

        <FormRow label="Make">
          <Input
            type="text"
            id="make"
            defaultValue=""
            disabled={isWorking}
            {...register("make")}
          />
        </FormRow>

        <FormRow label="Model">
          <Input
            type="text"
            id="model"
            defaultValue=""
            disabled={isWorking}
            {...register("model")}
          />
        </FormRow>

        <FormRow label="Description">
          <Textarea
            type="number"
            id="description"
            defaultValue=""
            disabled={isWorking}
            {...register("description")}
          />
        </FormRow>

        <FormRow label="Rate" error={errors?.rate?.message}>
          <Input
            type="number"
            id="rate"
            step="0.01"
            defaultValue={0}
            disabled={isWorking}
            {...register("rate", {
              min: {
                value: 0,
                message: "Value cannot be negative",
              },
            })}
          />
        </FormRow>

        <FormRow label="Unit">
          <Select type="text" id="rateUnit" {...register("rateUnit")}>
            <option>Day</option>
            <option>Hour</option>
          </Select>
        </FormRow>

        <FormRow label="Cost" error={errors?.cost?.message}>
          <Input
            type="number"
            id="cost"
            step="0.01"
            defaultValue={0}
            disabled={isWorking}
            {...register("cost", {
              min: {
                value: 0,
                message: "Value cannot be negative",
              },
            })}
          />
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {editMode ? "Edit" : "Create new"}
          </Button>
        </FormRow>
      </Form>
    );

  if (category === "rooms")
    return (
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Name">
          <Input
            type="text"
            id="name"
            disabled={isWorking}
            {...register("name", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Location">
          <Input
            type="text"
            id="location"
            disabled={isWorking}
            {...register("location")}
          />
        </FormRow>

        <FormRow label="Use">
          <Input
            type="text"
            id="use"
            disabled={isWorking}
            {...register("use")}
          />
        </FormRow>

        <FormRow label="Rate">
          <Input
            type="number"
            id="rate"
            step="0.01"
            defaultValue={0}
            disabled={isWorking}
            {...register("rate")}
          />
        </FormRow>

        <FormRow label="Unit">
          <Select type="text" id="rateUnit" {...register("rateUnit")}>
            <option>Day</option>
            <option>Hour</option>
          </Select>
        </FormRow>

        <FormRow label="Cost" error={errors?.cost?.message}>
          <Input
            type="number"
            id="cost"
            step="0.01"
            defaultValue={0}
            disabled={isWorking}
            {...register("cost", {
              min: {
                value: 0,
                message: "Value cannot be negative",
              },
            })}
          />
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {editMode ? "Edit" : "Create new"}
          </Button>
        </FormRow>
      </Form>
    );
}

export default CreateAssetForm;
