import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries(); // remove all queries in cache
      // can specify which query to be removed removeQueries(['queryKey'])
      navigate('/login', { replace: true }); // replace the earlier data and for back button
    }
    });
  return { logout, isLoading };
}
