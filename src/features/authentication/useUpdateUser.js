
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser, // function name from services
    onSuccess: ({user}) => { // manually update in the cache
      toast.success('User is successfully updated');
      queryClient.setQueryData(['user'], user.user) // key and value
      //queryClient.invalidateQueries({ queryKey: ['user'] }); // aim to refetch data and trigger UI sync up
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateUser };
}

