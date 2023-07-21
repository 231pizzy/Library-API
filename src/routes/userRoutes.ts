import express from 'express';
import { createUser, loginUser, getAll, updateUser, deleteUser } from '../controllers/userController';

const router = express.Router();

router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/getall', getAll)
router.put('/update', updateUser)
router.delete('/delete', deleteUser)

export default router;