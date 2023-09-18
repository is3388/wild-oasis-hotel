import styled from 'styled-components';

import Spinner from '../../ui/Spinner';
import CabinRow from '../../features/cabins/CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const filterValue = searchParams.get('discount') || 'all'; // default or with-discount or no-discount

  // filtering
  let filteredCabins;

  if (filterValue === 'all') filteredCabins = cabins;

  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // sorting
  const sortBy = searchParams.get('sortBy') || 'name-asc';// default value
  const [field, direction] = sortBy.split('-'); // split the URL query part
  const modifier = direction === 'asc' ? 1 : -1;

  function compare(a, b) {
    if (a["name"].toLowerCase() < b["name"].toLowerCase()) {
      return -1 * modifier;
    }
    if (a["name"].toLowerCase() > b["name"].toLowerCase()) {
      return 1 * modifier;
    }
    return 0;
  }
 
  const sortedCabins =
    field === "name"
      ? filteredCabins.sort(compare)
      : filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);
  //const sortedCabins =
  //  filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        {/*<Table.Body>
      {cabins.map((cabin) => <CabinRow cabin={cabin} key={cabin.id} />)}
      </Table.Body>
      use data prop and render prop to tell it render data*/}
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
