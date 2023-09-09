import Head from 'next/head';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { LoginCard } from '@/features/auth';
import { MainLayout } from '@/layouts';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    res.setHeader('location', '/');
    res.statusCode = 302;
    res.end();
  }

  return {
    props: {}
  };
};

const SigninPage = () => {
  const router = useRouter();

  useEffect(() => {
    const { callbackUrl } = router.query;
    if (callbackUrl) {
      toast.message('no user found, try again');
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Sign In | Lemniscate</title>
      </Head>
      <MainLayout sidebar={false} usersbar={false}>
        <div className="flex flex-1 justify-center px-4 pt-20">
          <LoginCard />
        </div>
      </MainLayout>
    </>
  );
};

export default SigninPage;
