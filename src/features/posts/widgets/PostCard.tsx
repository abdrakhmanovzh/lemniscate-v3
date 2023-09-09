/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { Avatar, getSupabaseAvatar, getSupabaseImage } from '@/shared';
import { Post } from '@/db/schema';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

interface Props {
  post: Post;
}

export const PostCard = ({ post }: Props) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-main-grey bg-secondary-black p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-3">
          <Avatar image={getSupabaseAvatar(post.author.name)} size={28} />
          <div className="flex flex-1 flex-col items-start justify-between lg:flex-row">
            <Link
              href={`/${post.author.name}`}
              className="text-lg font-semibold text-main-white"
            >
              {post.author.name}
            </Link>
            <p className="text-sm text-neutral-500">
              {timeAgo.format(new Date(post.createdAt))}
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-main-white">{post.text}</p>
      </div>
      <div className="flex-1">
        <img
          src={getSupabaseImage(post.image)}
          alt="post image"
          className="w-full rounded-md"
        />
      </div>
    </div>
  );
};
