import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { authOptions } from '../api/auth/[...nextauth]';
import {
  ProfileButtons,
  ProfileCard,
  ProfileSettings
} from '@/features/profile';
import { useFetchUser, useFollowings } from '@/features/users';
import { MainLayout } from '@/layouts';
import { Loading } from '@/shared';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { username } = router.query;

  const { data: user } = useFetchUser(username as string);

  const { data: followings, isLoading } = useFollowings(
    session?.user?.name as string
  );

  return (
    <>
      <Head>
        <title>{`${username ?? ''} | Lemniscate`}</title>
      </Head>
      <MainLayout>
        <div className="flex flex-col gap-4 p-4">
          <ProfileCard user={user?.data} />
          {isLoading ? (
            <Loading />
          ) : session?.user?.name === username ? (
            <ProfileSettings user={user?.data} />
          ) : (
            <ProfileButtons
              followed={
                followings?.data?.followings?.some(
                  (following) => following === username
                ) ?? false
              }
              username={username as string}
            />
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default ProfilePage;
