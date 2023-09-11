import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export function useDeleteCabin() {
const queryClient = useQueryClient();

// useMutation is React Query hook for delete, update
// mutate is a callback function that connects to the button for deletion
// it will call mutationFn
// onSuccess - tell React Query to invalidate the cached data and refetch it

const {
  isLoading: isDeleting, isEditing,
  mutate: deleteCabin,
} = useMutation({
  mutationFn: (id) => deleteCabinApi(id),
  onSuccess: () => {
    toast.success('Cabin successfully deleted');
    queryClient.invalidateQueries({
      // specify which query and then trigger refetch to reflect on UI
      queryKey: ['cabins'],
    });
  },
  onError: (err) => toast.error(err.message),
});

return {isDeleting, isEditing, deleteCabin }

}