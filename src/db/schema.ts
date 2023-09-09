import { relations } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  coverImage: text('cover_image'),
  bio: text('bio')
});

export const posts = pgTable('posts', {
  id: text('id').primaryKey(),
  text: text('text').notNull(),
  image: text('image'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  createdAt: text('created_at').notNull()
});

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  password: text('password')
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts)
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.userId],
    references: [users.id]
  })
}));

export type User = typeof users.$inferSelect;
export type Post = {
  id: string;
  text: string;
  image: string;
  userId: string;
  author: User;
  createdAt: string;
};

export type NewPost = typeof posts.$inferInsert;
