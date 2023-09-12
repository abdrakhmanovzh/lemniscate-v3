import { eq } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';
import db, { users } from '@/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    const { fromUsername, toUsername } = req.body;

    const user = await db
      .select()
      .from(users)
      .where(eq(users.name, fromUsername as string));

    if (user.length > 0) {
      const { following } = user[0];
      const newFollowing = following.includes(toUsername as string)
        ? following.filter((follow) => follow !== toUsername)
        : [...following, toUsername];

      await db
        .update(users)
        .set({
          following: newFollowing as string[]
        })
        .where(eq(users.name, fromUsername as string));

      return res.status(200).json({ following: newFollowing });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
