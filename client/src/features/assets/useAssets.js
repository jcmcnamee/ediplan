import { useQuery } from '@tanstack/react-query';
import { fetchAssets } from '../../services/apiAssets';

export function useAssets(category = 'equipment') {
  const { data, error, isPending } = useQuery({
    queryKey: ['assets', category],
    queryFn: fetchAssets,
  });

  return { data, error, isPending };
}
