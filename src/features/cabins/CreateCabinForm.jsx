import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

function CreateCabinForm() {
  // useForm hook from react-hook-form turns all input elements into controlled elements
  // no need to set up local state for each element
  // register inputs into this hook and handle submission
  // {...register} spread the result of calling register and then name of the field
  // once register all inputs, we can use onChange, onBlur properties
  // adding 'required object for error handling
  // getValues is an object to get the values that you enter the form field
  // formState object to read the error message

  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  function onSubmit(data) {
    // only called by handleSubmit if all validations pass
    // data and the uploaded image
    mutate({...data, image: data.image[0]});
  }

  function onError(errors) {
    console.log(errors);
  }

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin, // function name from services
    onSuccess: () => {
      toast.success('New cabin is successfully created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] }); // aim to refetch data and trigger UI sync up
      reset(); // reset form values to initial
    },
    onError: (err) => toast.error(err.message),
  });
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin Name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isCreating}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Max Capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isCreating}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: { value: 1, message: 'Capacity should be at least 1' },
          })}
        />
      </FormRow>

      <FormRow label='Regular Price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'This field is required',
            min: { value: 1, message: 'Regular price should be at least 1' },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          disabled={isCreating}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label='Description for the website'
        error={errors?.description?.message}
      >
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          disabled={isCreating}
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Cabin Photo' error={errors?.image?.message}>
        <FileInput
          id='image'
          type='file'
          accept='image/*'
          {...register('image', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'
          $size='medium'
          $variation='primary'
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
