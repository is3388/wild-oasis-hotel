// update booking status from 'unconfirmed' to 'checkedin'
// update booking isPaid to true in supabase

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({bookingId, breakfast}) => // pass in not only id, but also others for breakfast
      updateBooking(bookingId, {
        isPaid: true,
        status: 'checked-in',
        ...breakfast
      }),
    // data returned from the mutationFn which is updateBooking fn
    // active: true meaning to invalidate all the queries currently active on the page
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true }); // alternative to pass in queryKey
      navigate('/');
    },
    onError: () => {
      toast.error('Error occurs while checking in');
    },
  });
  return { checkin, isCheckingIn };
}
