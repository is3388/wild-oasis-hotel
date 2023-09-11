import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';
export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id), // function name from services
    onSuccess: () => {
      toast.success('Cabin is successfully edited');
      queryClient.invalidateQueries({ queryKey: ['cabins'] }); // aim to refetch data and trigger UI sync up
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
