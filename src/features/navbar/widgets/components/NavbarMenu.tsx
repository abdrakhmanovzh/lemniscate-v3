import { BiLogIn } from 'react-icons/bi';
import { useSession } from 'next-auth/react';
import { createUsername, Avatar, createSupabaseImage } from '@/shared';
import { useMenu } from '../../hooks';
import Link from 'next/link';

export const NavbarMenu = () => {
  const { data: session, status } = useSession();

  const { toggleMenu } = useMenu();

  return (
    <div className="flex items-center gap-2">
      {status === 'authenticated' ? (
        <>
          <p className="hidden text-main-white lg:block">
            {createUsername(session?.user?.name) || 'user'}
          </p>
          <Avatar
            image={
              session.user?.image ??
              createSupabaseImage(session.user?.name as string)
            }
            size={32}
            onClick={toggleMenu}
          />
        </>
      ) : status === 'unauthenticated' ? (
        <Link href="/auth/signin" className="flex items-center gap-1">
          <BiLogIn color="#e1e3e6" />
          <p className="text-main-white">sign in</p>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};