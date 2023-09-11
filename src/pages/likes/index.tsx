import Head from 'next/head';
import { motion } from 'framer-motion';
import { MainLayout } from '@/layouts';
import { PostCard, useLikedPosts } from '@/features/posts';
import { useSession } from 'next-auth/react';
import { Loading } from '@/shared';

const LikesPage = () => {
  const { data: session } = useSession();
  const { data: likedPosts, isLoading } = useLikedPosts(
    session?.user?.name ?? ''
  );

  return (
    <>
      <Head>
        <title>Likes | Lemniscate</title>
      </Head>
      <MainLayout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-4 p-4"
        >
          {isLoading ? (
            <Loading />
          ) : likedPosts?.data && likedPosts.data.length > 0 ? (
            likedPosts.data.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <p className="text-center text-2xl text-main-white text-opacity-50">
              no liked posts
            </p>
          )}
        </motion.div>
      </MainLayout>
    </>
  );
};

export default LikesPage;
