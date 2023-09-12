import Head from 'next/head';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { CreatePost, PostCard, useFetchPosts } from '@/features/posts';
import { MainLayout } from '@/layouts';
import { Loading } from '@/shared';

export default function Home() {
  const { data: session } = useSession();
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
          {session && <CreatePost />}

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
