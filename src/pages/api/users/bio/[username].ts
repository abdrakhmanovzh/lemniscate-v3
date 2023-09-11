import db, { users } from '@/db';
import { eq } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { username } = req.query;
    const { bio } = req.body;

    try {
      await db
        .update(users)
        .set({
          bio: bio
        })
        .where(eq(users.name, username as string));

      res.status(200).json({ message: 'bio updated' });
    } catch (error) {
      res.status(500).json({ message: error });
      console.log(error);
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
