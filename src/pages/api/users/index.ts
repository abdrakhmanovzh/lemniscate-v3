import db, { users } from '@/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const allUsers = await db.select().from(users);

      res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
