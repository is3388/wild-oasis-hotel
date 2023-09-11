import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const { isEditing, isDeleting, deleteCabin } = useDeleteCabin();
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  // in order to trigger a refetch of data to reflect on the UI
  // get the instance of queryClient (App.js) to call invalidateQueries
  // once the data is invalid, React Query will auto refetch data
  /*const queryClient = useQueryClient();

  // useMutation is React Query hook for delete, update
  // mutate is a callback function that connects to the button for deletion
  // it will call mutationFn
  // onSuccess - tell React Query to invalidate the cached data and refetch it

  const {
    isLoading: isDeleting,
    isEditing,
    mutate,
  } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success('Cabin successfully deleted');
      queryClient.invalidateQueries({
        // specify which query and then trigger refetch to reflect on UI
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error(err.message),
  }); */

  return (
    <>
      <TableRow>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button
            onClick={() => setShowForm((show) => !show)}
            disabled={isEditing}
          >
            {' '}
            Edit
          </button>
          <button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>
            {' '}
            Delete
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
