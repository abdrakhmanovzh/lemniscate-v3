import Link from 'next/link';
import { Avatar, getSupabaseAvatar } from '@/shared';

interface Props {
  followed: string;
}

export const FollowerCard = ({ followed }: Props) => {
  return (
    <Link
      href={`/${followed}`}
      className="flex items-center gap-2 rounded-md border border-main-grey bg-secondary-black p-2"
    >
      <Avatar image={getSupabaseAvatar(followed)} size={32} />
      <p className="text-lg leading-[0] text-main-white">{followed}</p>
    </Link>
  );
};
