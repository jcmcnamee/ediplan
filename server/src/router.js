import express from 'express';
import {
  addEquipment,
  deleteAsset,
  getAllEquipment,
  getAllRooms,
  getAllPersonel,
  updateAsset,
} from './controllers/assetController.js';

const router = express.Router();

router.get('/equip', getAllEquipment);
router.patch('/:id', updateAsset);
router.get('/rooms', getAllRooms);
router.get('/personel', getAllPersonel);
router.delete('/:id', deleteAsset);
router.put('/equip', addEquipment);

export default router;
