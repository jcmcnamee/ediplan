import express from 'express';
import {
  addEquipment,
  deleteAsset,
  getAllEquipment,
  getAllRooms,
  getAllPersonel,
  updateAsset,
} from '../controllers/assetController.js';

const assetRouter = express.Router();
const bookingRouter = express.Router();

assetRouter.get('/equip', getAllEquipment);
assetRouter.patch('/:id', updateAsset);
assetRouter.get('/rooms', getAllRooms);
assetRouter.get('/personel', getAllPersonel);
assetRouter.delete('/:id', deleteAsset);
assetRouter.put('/equip', addEquipment);

export default assetRouter;
