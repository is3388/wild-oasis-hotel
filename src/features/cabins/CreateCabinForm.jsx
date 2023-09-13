import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useForm } from 'react-hook-form';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const { id: editId, ...editValues } = cabinToEdit; // editValues are the values overwrite the existing values on the form not getValues

  const isEditSession = Boolean(editId); // if editId exists, true

  // useForm hook from react-hook-form turns all input elements into controlled elements
  // no need to set up local state for each element
  // register inputs into this hook and handle submission
  // {...register} spread the result of calling register and then name of the field
  // once register all inputs, we can use onChange, onBlur properties
  // adding 'required object for error handling
  // getValues is an object to get the values that you enter the form field
  // formState object to read the error message

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    // only called by handleSubmit if all validations pass
    // data and the uploaded image
    //mutate({...data, image: data.image[0]});
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      ); // object contains a callback gets access to the newly created cabin data returned
  }

  function onError(errors) {
    console.log(errors);
  }

  // the code moves to custom hooks
  /* { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin, // function name from services
    onSuccess: () => {
      toast.success('New cabin is successfully created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] }); // aim to refetch data and trigger UI sync up
      reset(); // reset form values to initial
    },
    onError: (err) => toast.error(err.message),
  }); */

  /*const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id), // function name from services
    onSuccess: () => {
      toast.success('Cabin is successfully edited');
      queryClient.invalidateQueries({ queryKey: ['cabins'] }); // aim to refetch data and trigger UI sync up
      reset(); // reset form values to initial
    },
    onError: (err) => toast.error(err.message),
  }); */
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}
    type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label='Cabin Name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isCreating || isEditing}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Max Capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isCreating || isEditing}
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
          disabled={isCreating || isEditing}
          {...register('regularPrice', {
            required: 'This field is required',
            min: { value: 1, message: 'Regular price should be at least 1' },
          })}
        />
      </FormRow>

      <FormRow
        label='Discount(0 if no discount)'
        error={errors?.discount?.message}
      >
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          disabled={isCreating || isEditing}
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
          disabled={isCreating || isEditing}
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Cabin Photo' error={errors?.image?.message}>
        <FileInput
          id='image'
          type='file'
          accept='image/*'
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        {/* form resuable - so that it might not pass onCloseModal to Cancel button */}
        <Button
          variation='secondary'
          type='reset'
          $size='medium'
          $variation='primary'
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating || isEditing}>
          {isEditSession ? 'Edit cabin' : 'Create cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
