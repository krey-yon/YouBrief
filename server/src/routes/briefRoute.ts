import express from 'express';
import { getBreif } from '../controllers/breifControllers.js';

const router = express.Router();

router.post('/breif', getBreif);

export default router;
