import { useSession } from 'next-auth/react';
import { useFollow } from '../hooks';

interface Props {
  username: string;
  followed: boolean;
}

export const ProfileButtons = ({ followed, username }: Props) => {
  const { data: session } = useSession();

  const { mutate: follow } = useFollow(session?.user?.name as string, username);

  const handleFollow = () => {
    follow();
  };

  return (
    <button
      onClick={handleFollow}
      className="w-full rounded-md border border-main-grey bg-secondary-black p-2 text-main-white"
    >
      {followed ? 'unfollow' : 'follow'} {username}
    </button>
  );
};
