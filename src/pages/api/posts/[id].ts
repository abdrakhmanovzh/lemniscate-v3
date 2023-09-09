import db, { posts } from '@/db';
import { eq } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    const { id } = req.query;
    const { username } = req.body;

    const post = await db
      .select()
      .from(posts)
      .where(eq(posts.id, id as string));

    if (post.length > 0) {
      const { likes } = post[0];
      const newLikes = likes.includes(username)
        ? likes.filter((like) => like !== username)
        : [...likes, username];
      await db
        .update(posts)
        .set({ likes: newLikes })
        .where(eq(posts.id, id as string));
      res.status(200).json({ likes: newLikes });
    }
  } else {
    res.status(405).end();
  }
}
