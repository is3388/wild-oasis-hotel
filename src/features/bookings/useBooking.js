import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams } from 'react-router-dom';

export function useBooking() {
  const {bookingId} = useParams();
  
  // useQuery by default trying to fetch data 3 times
  // pass in 2rd arg bookingId, so that it pulls out different instance 
  // instead of pulling the same instance from the cache
  const {
    isLoading,
    data: booking = {},
    error,
  } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false
  });

  return { isLoading, booking, error };
}
