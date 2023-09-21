import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
  // use mutation as something changes on the server
  const queryClient = useQueryClient()
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => { // manually set the logged in user into react query cache
      queryClient.setQueryData(['user'], user.user) // the key and the value
      navigate('/dashboard' , { replace: true });
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Invalid login credential');
    },
  });
  return { isLoading, login };
}
