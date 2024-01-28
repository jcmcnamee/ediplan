import { fetchEquip } from '../services/assetsApi';
import { useQuery } from '@tanstack/react-query';

import AssetTable from '../features/assets/AssetTable';

function Equipment() {
  return (
    <AssetTable
      headers={{
        items: ['Make', 'Model', 'Description', 'Price'],
        columnTemplate: '1fr 1fr 4fr 1fr',
      }}
      queryKey='equipment'
    />
  );
}

export default Equipment;
