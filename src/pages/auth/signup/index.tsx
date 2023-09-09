import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { RegisterCard } from '@/features/auth';
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

const SignupPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up | Lemniscate</title>
      </Head>
      <MainLayout sidebar={false} usersbar={false}>
        <div className="flex flex-1 justify-center px-4 pt-20">
          <RegisterCard />
        </div>
      </MainLayout>
    </>
  );
};

export default SignupPage;
