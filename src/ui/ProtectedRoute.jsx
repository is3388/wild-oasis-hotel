import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import styled from 'styled-components';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`
function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. load up authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2. if no authenticated user, redirect to login page
  // navigate fn only be called inside another fn like callback or useEffect not at top level of the component
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isAuthenticated, navigate, isLoading])
 
  // 3. while loading, shows the spinner
  if (isLoading) return <FullPage><Spinner /></FullPage>;

   // 4. if authenticated user, render the app
  if (isAuthenticated)
  return children;
}

export default ProtectedRoute;
