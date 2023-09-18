import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
  const [searchParams] = useSearchParams();

  // filter
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };
      //: { field: 'status', value: filterValue, method: 'gte' };

  // sorting
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc'
  const [field, direction] = sortByRaw.split('-')

  const sortBy = { field, direction }
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy], // 2rd arg to tell react query to refetch data when filter changes
    queryFn: () => getBookings({filter, sortBy}), // a fn from services and data will be stored in the cache
  });
  return { isLoading, bookings, error };
}
