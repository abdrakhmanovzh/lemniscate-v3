import { eq } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';
import db, { users } from '@/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { username } = req.query;

    try {
      const followings = await db
        .select({
          followings: users.following
        })
        .from(users)
        .where(eq(users.name, username as string));

      return res.status(200).json(followings[0]);
    } catch (error) {
      res.status(500).json({ message: error });
      console.log(error);
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
