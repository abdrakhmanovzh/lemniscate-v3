import db, { users } from '@/db';
import { NewPost, posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const allPosts = await db.query.posts.findMany({
        with: {
          author: true
        },
        orderBy(fields, operators) {
          return operators.desc(fields.createdAt);
        }
      });

      res.status(200).json(allPosts);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else if (req.method === 'POST') {
    const { text, username, imageFilename } = req.body;

    const user = await db.select().from(users).where(eq(users.name, username));

    const newPost: NewPost = {
      text,
      id: uuidv4(),
      userId: user[0].id,
      createdAt: new Date().toISOString(),
      image: imageFilename,
      likes: []
    };

    try {
      const createdPost = await db.insert(posts).values(newPost);
      res.status(201).json(createdPost);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
