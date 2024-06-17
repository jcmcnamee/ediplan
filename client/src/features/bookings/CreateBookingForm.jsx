import Form from '../../ui/Form/Form';
import FormRow from '../../ui/Form/FormRow';
import Input from '../../ui/Form/Input';

function CreateBookingForm() {
  return (
    <Form>
      <Form.TextShort label="Booking name: " id="name" />
      <Form.TextLong label="Description: " id="description" />
      <Form.DateSelect label="Start : " id="start" />
    </Form>

    // <Form>
    //   <FormRow label="Booking Name:">
    //     <Input type="text" id="name" defaultValue="hello!" />
    //   </FormRow>
    //   <FormRow label="Start date: ">
    //     <Input type="date" id="startDate" defaultValue={null} />
    //   </FormRow>
    //   <FormRow label="End date: ">
    //     <Input type="date" id="endDate" defaultValue={null} />
    //   </FormRow>
    //   <FormRow label="Provisional: ">
    //     <Input type="checkbox" id="endDate" defaultValue={null} />
    //   </FormRow>
    //   <FormRow label="Provisional: ">
    //     <Input type="checkbox" id="endDate" defaultValue={null} />
    //   </FormRow>
    // </Form>
  );
}

export default CreateBookingForm;
