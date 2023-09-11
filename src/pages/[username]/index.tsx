import Head from 'next/head';
import { useRouter } from 'next/router';
import { ProfileCard, ProfileSettings } from '@/features/profile';
import { useFetchUser } from '@/features/users';
import { MainLayout } from '@/layouts';
import { useSession } from 'next-auth/react';

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { username } = router.query;

  const { data: user } = useFetchUser(username as string);

  return (
    <>
      <Head>
        <title>{username as string} | Lemniscate</title>
      </Head>
      <MainLayout>
        <div className="flex flex-col gap-4 p-4">
          <ProfileCard user={user?.data} />
          {session?.user?.name === username && (
            <ProfileSettings user={user?.data} />
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default ProfilePage;
