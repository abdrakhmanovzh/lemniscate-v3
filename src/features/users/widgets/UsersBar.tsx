import { useSession } from 'next-auth/react';
import { useFetchUsers } from '../hooks';
import { Loading } from '@/shared';
import Link from 'next/link';

export const UsersBar = () => {
  const { data: session } = useSession();
  const { data: users, isLoading } = useFetchUsers();

  return (
    <div className="flex w-64 flex-col gap-2 rounded-md border border-main-grey bg-secondary-black px-3 py-2">
      <h2 className="text-lg font-semibold text-white">other users</h2>
      {isLoading ? (
        <Loading />
      ) : (
        users?.data
          .filter((user) => user.name !== session?.user?.name)
          .map((user) => (
            <Link
              key={user.id}
              href={`/${user.name}`}
              className="text-main-white hover:underline hover:underline-offset-2"
            >
              {user.name}
            </Link>
          ))
      )}
    </div>
  );
};
