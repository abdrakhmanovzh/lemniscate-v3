/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { format } from 'timeago.js';
import { useSession } from 'next-auth/react';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar, getSupabaseAvatar, getSupabaseImage } from '@/shared';
import { Post } from '@/db/schema';
import { useLike } from '../hooks';

interface Props {
  post: Post;
}

export const PostCard = ({ post }: Props) => {
  const { data: session } = useSession();
  const { mutate: like } = useLike(session?.user?.name ?? '');
  const queryClient = useQueryClient();

  const handleLike = () => {
    like(
      {
        postId: post.id
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['posts']);
        }
      }
    );
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-main-grey bg-secondary-black p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-3">
          <Avatar image={getSupabaseAvatar(post.author.name)} size={36} />
          <div className="flex flex-1 items-start justify-between lg:flex-row">
            <div className="flex flex-col">
              <Link
                href={`/${post.author.name}`}
                className="text-lg font-semibold text-main-white"
              >
                {post.author.name}
              </Link>
              <p className="text-sm text-neutral-500">
                {format(new Date(post.createdAt))}
              </p>
            </div>
            <div onClick={handleLike}>
              {post.likes?.length > 0 &&
              post.likes.includes(session?.user?.name as string) ? (
                <BiSolidHeart
                  size={22}
                  color={`#E57373`}
                  className="cursor-pointer"
                />
              ) : (
                <BiHeart
                  size={22}
                  color={`#e1e3e6`}
                  className="cursor-pointer"
                />
              )}
            </div>
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
