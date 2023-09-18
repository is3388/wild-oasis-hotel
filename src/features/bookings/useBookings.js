import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';

export function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings'],
    queryFn: () => getBookings(), // a fn from services and data will be stored in the cache
  });
  return { isLoading, bookings, error };
}
