import User from '../models/user';

export const logRecentUsers = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentUsers = await User.find({ createdAt: { $gte: sevenDaysAgo } });
  console.log('Users registered in the last 7 days:', recentUsers);
};

