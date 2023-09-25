import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numOfBookings = bookings.length;
  const totalSales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;
 
  // number of checkin nights / all available nights (num of days * num of cabins)
  const occupancy = confirmedStays.reduce((acc, cur) => acc + cur.numOfNights, 0) /
  (numDays * cabinCount);
 
  console.log(numOfBookings);
  return (
    <>
      <Stat
        title='Bookings'
        color='blue'
        icon={<HiOutlineBriefcase />}
        value={numOfBookings}
      />
      <Stat
        title='Sales'
        color='green'
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title='Check ins'
        color='indigo'
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title='Occupancy rate'
        color='yellow'
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancy * 100) + "%"}
      />
    </>
  );
}

export default Stats;
