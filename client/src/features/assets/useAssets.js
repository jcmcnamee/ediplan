import { useQuery } from '@tanstack/react-query';
import { fetchAssets } from '../../services/assetsApi';

export function useAssets(category) {
  const {
    data,
    error,
    isPending,
  } = useQuery({
    queryKey: [category],
    queryFn: fetchAssets,
  });

  return { data, error, isPending };
}
