import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {

  // to prefetch data in advance (from the cache) for next page or previous page instead of load the page on the fly
  // use query client and then call prefetchQuery method
  const queryClient = useQueryClient();
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

  // pagination
  const page = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  // query
  const {
    isLoading,
    data: {data: bookings, count} = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page], // 2rd arg to tell react query to refetch data when filter changes
    queryFn: () => getBookings({filter, sortBy, page}), // a fn from services and data will be stored in the cache
  });

  // prefetching- use querycCient method and passing the same object as useQuery
  const pageCount = Math.ceil(count / PAGE_SIZE)
  if (page < pageCount) { // for next page
  queryClient.prefetchQuery({
    queryKey: ['bookings', filter, sortBy, page + 1],
    queryFn: () => getBookings({filter, sortBy, page: page + 1})
  }) 
}

  if (page > 1) { // for previous page
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({filter, sortBy, page: page - 1})
    })
}

  return { isLoading, bookings, error, count };
}
