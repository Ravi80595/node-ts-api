import express, { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController';
import { auth } from '../middlewares/auth';


const router = express.Router();

router.post('/register', async (req: Request, res: Response): Promise<void> => {
    await registerUser(req, res);
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
    await loginUser(req, res);
});

router.get('/profile',auth,getUserProfile);


export default router;
