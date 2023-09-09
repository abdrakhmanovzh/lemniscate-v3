import Head from 'next/head';
import { MainLayout } from '@/layouts';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

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
  return (
    <>
      <Head>
        <title>Lemniscate</title>
      </Head>
      <MainLayout>
        <></>
      </MainLayout>
    </>
  );
}
