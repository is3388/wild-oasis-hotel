import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBookingsAfterDate } from '../../services/apiBookings';

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  // num of days from the URL - ?last=7 or last=30 or last=90
  const numOfDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'));

  const queryDate = subDays(new Date(), numOfDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ['bookings', `last-${numOfDays}`], // 2nd arg is like array depedency in useEffect
  });

  return { isLoading, bookings };
}
