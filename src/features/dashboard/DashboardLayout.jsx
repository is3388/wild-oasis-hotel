import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useCabins } from '../cabins/useCabins'
import Spinner from '../../ui/Spinner';
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";

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

  console.log(bookings)

  return (
    <StyledDashboardLayout>
      
      <Stats bookings={bookings} confirmedStays={confirmedStays} 
      numDays={numDays} cabinCount={cabins.length} />
      <div>Today activity</div>
      <div>Chart stay duration</div>
      <div>Chart sales</div>
      
    </StyledDashboardLayout>
    
  )
}

export default DashboardLayout
