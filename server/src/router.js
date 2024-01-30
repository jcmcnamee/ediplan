import express from 'express';
import {
  addEquipment,
  deleteAsset,
  getAllEquipment,
  getAllRooms,
  getAllPersonel,
} from './controllers/assetController.js';

const router = express.Router();

router.get('/equip', getAllEquipment);
router.get('/rooms', getAllRooms);
router.get('/personel', getAllPersonel);
router.delete('/:id', deleteAsset);
router.put('/equip', addEquipment);

export default router;
