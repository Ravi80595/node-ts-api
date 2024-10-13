import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import userRoutes from './routes/userRoutes'
import adminRoutes from './routes/adminRoutes'
import logger from './middlewares/logger';
import { logRecentUsers } from './services/userService';

declare global {
    namespace Express {
      interface Request {
        user?: { id: string; role: string };
      }
    }
}
  

dotenv.config();
const app = express();
app.use(express.json());
app.use(logger);
logRecentUsers();


app.use('/api', userRoutes);
app.use('/api/admin', adminRoutes);

app.get("/",(req: Request, res: Response)=>{
    res.status(200).send({"msg":"welcome to node-ts API"})
})

const PORT = process.env.PORT || 5000;
app.listen(PORT,async()=>{
    try{
        await connectDB
        console.log("Connected to Database")
    }
    catch(err){
        console.log(err)
        console.log("connection failed")
    }
    console.log("Listning on Port")
})
