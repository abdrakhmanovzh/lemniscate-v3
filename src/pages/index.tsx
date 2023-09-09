import Head from 'next/head';
import { motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { CreatePost, PostCard, useFetchPosts } from '@/features/posts';
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

export default function Home() {
  const { data: posts, isLoading: postsLoading } = useFetchPosts();

  return (
    <>
      <Head>
        <title>Lemniscate</title>
      </Head>
      <MainLayout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-4 p-4"
        >
          <CreatePost />
          {postsLoading ? (
            <Loading />
          ) : (
            posts?.data &&
            posts.data.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </motion.div>
      </MainLayout>
    </>
  );
}
