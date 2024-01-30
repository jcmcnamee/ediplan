import { useQuery } from '@tanstack/react-query';

import AssetTable from '../features/assets/AssetTable';
import { useOutletContext } from 'react-router-dom';

function Equipment() {
  return (
    <div></div>
    // <AssetTable
    //   headers={{
    //     items: ['Make', 'Model', 'Description', 'Price'],
    //     columnTemplate: '1fr 1fr 4fr 1fr',
    //   }}
    //   queryKey={queryKey}
    // />
  );
}

export default Equipment;
