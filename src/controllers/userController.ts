import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password,role } = req.body;
  console.log(req.body)
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  console.log(email,password)
  try {
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      res.status(400).json({ message: 'Invalid email' });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid password' });
      return;
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || '',
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
      const user = await User.findById(req.user?.id).select('-password');
      // if (!user) {
      //     return res.status(404).json({ message: 'User not found' });
      // }
      res.json(user);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};