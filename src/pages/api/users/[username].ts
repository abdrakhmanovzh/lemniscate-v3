import db, { users } from '@/db';
import { eq } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { username } = req.query;

    try {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.name, username as string));

      res.status(200).json(user[0]);
    } catch (error) {
      res.status(500).json({ message: error });
      console.log(error);
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
