import db, { posts } from '@/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const likedPosts = await db.select().from(posts).where(eq());
    } catch (error) {}
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
