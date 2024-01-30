import { useQuery } from '@tanstack/react-query';
import { fetchAssets } from '../../services/assetsApi';

export function useFetchAssets(category) {
  const {
    data: assets,
    error,
    isLoading,
  } = useQuery({
    queryKey: [category],
    queryFn: fetchAssets,
  });

  return { assets, error, isLoading };
}
