import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { createEditCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export function useCreateCabin() {
  
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin, // function name from services
    onSuccess: () => {
      toast.success('New cabin is successfully created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] }); // aim to refetch data and trigger UI sync up
      
    },
    onError: (err) => toast.error(err.message),
  });

  return {isCreating, createCabin}
}