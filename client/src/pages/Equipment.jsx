import { fetchEquip } from '../services/assetsApi';
import { useQuery } from '@tanstack/react-query';

import EquipmentTable from '../features/assets/EquipmentTable';

function Equipment() {

  return <EquipmentTable />;
}

export default Equipment;
