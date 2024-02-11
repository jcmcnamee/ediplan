import { useQuery } from '@tanstack/react-query';
import { fetchAssets } from '../../services/assetsApi';

export function useAssets(category) {
  const {
    data: assets,
    error,
    isPending,
  } = useQuery({
    queryKey: [category],
    queryFn: fetchAssets,
  });

  return { assets, error, isPending };
}
