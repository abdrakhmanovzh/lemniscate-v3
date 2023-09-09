import { v4 as uuidv4 } from 'uuid';
import { NextApiRequest, NextApiResponse } from 'next';
import { accounts, users } from '@/db/schema';
import db from '@/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;
  const id = uuidv4();

  try {
    await db.insert(accounts).values({
      id,
      name: username,
      password
    });

    await db.insert(users).values({
      id,
      name: username
    });

    res.status(200).json({ message: 'account created' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
