import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';
export function useUpdateSetting() {

  const queryClient = useQueryClient();
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Setting is successfully edited');
      queryClient.invalidateQueries({ queryKey: ['settings'] }); // aim to refetch data and trigger UI sync up
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSetting };
}
