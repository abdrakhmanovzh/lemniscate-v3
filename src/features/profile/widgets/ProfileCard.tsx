import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Loading, getSupabaseAvatar, getSupabaseCoverImage } from '@/shared';
import { AnimatedBackground } from './components';
import { User } from '@/db/schema';

interface Props {
  user: User | undefined;
}

export const ProfileCard = ({ user }: Props) => {
  //Handling the resize of the screen for better animation and layout
  const [screenWidth, setScreenWidth] = useState<number | null>(null);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="relative h-52 rounded-md border border-main-grey bg-secondary-black bg-cover p-2 lg:h-48"
      style={{
        backgroundImage: user
          ? `url(${getSupabaseCoverImage(user?.name ?? '')})`
          : ''
      }}
    >
      {user && screenWidth ? (
        <>
          <AnimatedBackground screenWidth={screenWidth} />
          <Image
            src={getSupabaseAvatar(user.name)}
            alt="avatar"
            width={200}
            height={200}
            className="absolute bottom-20 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full object-cover lg:bottom-8 lg:left-24"
          />
          <div className="absolute bottom-3 left-1/2 flex w-full -translate-x-1/2 flex-col items-center gap-1 lg:bottom-7 lg:left-44 lg:-translate-x-0 lg:items-start">
            <p className="text-2xl font-semibold text-main-white">
              {user.name}
            </p>
            <p className="text-main-white lg:text-sm">{user.bio}</p>
          </div>
        </>
      ) : (
        <div className="flex h-52 items-center justify-center lg:h-48">
          <Loading />
        </div>
      )}
    </div>
  );
};
