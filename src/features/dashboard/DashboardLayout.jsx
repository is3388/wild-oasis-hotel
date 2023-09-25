import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useCabins } from '../cabins/useCabins'
import Spinner from '../../ui/Spinner';
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading, bookings } = useRecentBookings();
  const { isLoading: isStayLoading, stays, confirmedStays, numDays } = useRecentStays();
  const { cabins, isLoading: isCabinLoading } = useCabins();

  if (isLoading || isStayLoading || isCabinLoading) return <Spinner />

  return (
    <StyledDashboardLayout>
      
      <Stats bookings={bookings} confirmedStays={confirmedStays} 
      numDays={numDays} cabinCount={cabins.length} />
      <div>Today activity</div>
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays}/>
      
    </StyledDashboardLayout>
    
  )
}

export default DashboardLayout
