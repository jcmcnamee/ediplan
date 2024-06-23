import { useQuery } from '@tanstack/react-query';
import { fetchAssets } from '../../services/apiAssets';

export function useAssets(category) {
  const {
    data: assets,
    error,
    isPending,
  } = useQuery({
    queryKey: ['assets', category],
    queryFn: fetchAssets,
  });

  return { assets, error, isPending };
}
