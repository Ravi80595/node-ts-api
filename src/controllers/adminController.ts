import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User, { IUser } from '../models/user';


export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Email already exists.' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: (err as Error).message });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, role, name, email } = req.query;
    const query: any = {};
    if (role) query.role = role;
    if (name) query.name = new RegExp(name as string, 'i');
    if (email) query.email = new RegExp(email as string, 'i');
    const users = await User.find(query)
      .skip((+page - 1) * +limit)
      .limit(+limit);
    const totalUsers = await User.countDocuments(query);
    res.status(200).json({
      users,
      totalPages: Math.ceil(totalUsers / +limit),
      currentPage: +page,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: (err as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: (err as Error).message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    if (req.user && req.user.id === user._id.toString()) {
      res.status(400).json({ message: 'You cannot delete yourself.' });
      return;
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: (err as Error).message });
  }
};
