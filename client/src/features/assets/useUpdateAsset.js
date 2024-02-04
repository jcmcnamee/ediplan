import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateAsset as updateAssetApi } from '../../services/assetsApi';

export function useUpdateAsset(category) {
  const queryClient = useQueryClient();

  const { mutate: updateAsset, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newData, id }) => updateAssetApi(newData, id),
    onSuccess: () => {
      toast.success('New asset successfully updated.');
      console.log(`Invalidating query: ${category}`);
      queryClient.invalidateQueries({ queryKey: [category] });
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return { updateAsset, isUpdating };
}
