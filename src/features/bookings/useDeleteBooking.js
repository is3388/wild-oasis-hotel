import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';

export function useDeleteBooking() {
const queryClient = useQueryClient();

// useMutation is React Query hook for delete, update
// mutate is a callback function that connects to the button for deletion
// it will call mutationFn
// onSuccess - tell React Query to invalidate the cached data and refetch it

const {
  isLoading: isDeleting,
  mutate: deleteBooking,
} = useMutation({
  mutationFn: (id) => deleteBookingApi(id),
  onSuccess: () => {
    toast.success('Booking successfully deleted');
    queryClient.invalidateQueries({
      // specify which query and then trigger refetch to reflect on UI
      queryKey: ['bookings'],
    });
  },
  onError: (err) => toast.error(err.message),
});

return {isDeleting, deleteBooking }

}