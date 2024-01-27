import express from 'express';
import { deleteEquip, getAllEquipment } from './controllers/assetController.js';

const router = express.Router();

router.get('/equip', getAllEquipment);
router.delete('/:id', deleteEquip);

export default router;
