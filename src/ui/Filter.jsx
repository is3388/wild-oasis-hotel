import styled, { css } from 'styled-components';
import { useSearchParams } from 'react-router-dom';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

// make it reusable, passing filtered field for searchParams to access and filter options as props
export default function Filter({ filterField, options }) {
  // useSearchParams like useState but for url
  const [searchParams, setSearchParams] = useSearchParams();
  //to compare the current filter in URL with the just selected option
  const currentFilter = searchParams.get(filterField) || options.at(0).value; // default

  function handleClick(value) {
    // the value to set the url
    // first set the state which is the field in the URL on searchParams itself
    // 1st arg is the name of the state, 2nd arg is the value pass in
    // then set it to the URL, could be all, no-discount, with-discount
    // localhost:5173/cabins?discount=all
    // then the cabin table will read the state and display the data accordingly
    searchParams.set(filterField, value);
    searchParams.set('page', 1);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          $active={option.value === currentFilter} // if selected option is the same as displayed in URL
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}
