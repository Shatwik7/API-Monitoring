import { Router } from 'express';
import APIController from '../controllers/apiController';

const router = Router();

router.post('/api', APIController.createAPI);
router.get('/api', APIController.getAllAPIs);
router.get('/api/:id', APIController.getAPIById);
router.put('/api/:id', APIController.updateAPI);
router.delete('/api/:id', APIController.deleteAPI);

export default router;