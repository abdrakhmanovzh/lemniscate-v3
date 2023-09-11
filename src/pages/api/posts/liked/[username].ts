import db from '@/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { username } = req.query;
    try {
      const allPosts = await db.query.posts.findMany({
        with: {
          author: true
        },
        orderBy(fields, operators) {
          return operators.desc(fields.createdAt);
        }
      });

      const likedPosts = allPosts.filter((post) =>
        post.likes.includes(username as string)
      );

      res.status(200).json(likedPosts);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
