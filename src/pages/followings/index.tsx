import Head from 'next/head';
import { motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { authOptions } from '../api/auth/[...nextauth]';
import { FollowerCard, useFetchUsers, useFollowings } from '@/features/users';
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

const FollowingsPage = () => {
  const { data: session } = useSession();

  const { data: followings, isLoading: followingsLoading } = useFollowings(
    session?.user?.name ?? ''
  );

  const { data: allUsers, isLoading: allUsersLoading } = useFetchUsers();

  return (
    <>
      <Head>
        <title>Followings | Lemniscate</title>
      </Head>
      <MainLayout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-4 p-4"
        >
          {followingsLoading || allUsersLoading ? (
            <Loading />
          ) : followings?.data && followings.data.followings?.length > 0 ? (
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-main-white">
                you are following
              </h2>
              {followings.data.followings.map((followed) => (
                <FollowerCard key={followed} followed={followed} />
              ))}
            </div>
          ) : (
            <div>
              <p className="text-center text-2xl text-main-white text-opacity-50 lg:text-start lg:text-lg">
                no followings
              </p>
            </div>
          )}
          <h2 className="mt-4 text-xl font-semibold text-main-white lg:mt-0 lg:text-lg">
            unfollowed users
          </h2>
          {allUsers?.data &&
            allUsers.data
              .filter(
                (user) =>
                  !followings?.data?.followings?.includes(user.name) &&
                  user.name !== session?.user?.name
              )
              .map((user) => (
                <FollowerCard key={user.id} followed={user.name} />
              ))}
        </motion.div>
      </MainLayout>
    </>
  );
};

export default FollowingsPage;
