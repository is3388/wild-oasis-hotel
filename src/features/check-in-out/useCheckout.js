import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useCheckout() {
  const queryClient = useQueryClient();
  
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) => 
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    // data returned from the mutationFn which is updateBooking fn
    // active: true meaning to invalidate all the queries currently active on the page
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true }); // alternative to pass in queryKey
    },
    onError: () => {
      toast.error('Error occurs while checking out');
    },
  });
  return { checkout, isCheckingOut };
}
