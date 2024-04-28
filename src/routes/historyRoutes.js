import express from 'express';
import { createHistory, getHistory, deleteHistory } from '../controllers/historyController.js';
import { verifyGoogleToken } from '../middlewares/googleTokenVerification.js';

const router = express.Router();

router.post('/add', verifyGoogleToken, createHistory);
router.post('/remove', verifyGoogleToken, deleteHistory);
router.post('/', verifyGoogleToken, getHistory);

export default router;