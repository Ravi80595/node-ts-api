import { Router } from 'express';
import { adminAuth } from '../middlewares/adminAuth';
import { createUser, deleteUser, getUsers, updateUser } from '../controllers/adminController';

const router = Router();



router.post('/create', adminAuth, createUser);

router.get('/users',adminAuth,getUsers);

router.put('/update/:id', adminAuth, updateUser);

router.delete('/delete/:id', adminAuth, deleteUser);

export default router;
