import { toast } from 'sonner';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { BiHeart, BiGroup, BiHome, BiUser } from 'react-icons/bi';
import { createUsername } from '@/shared';
import { BottombarLink } from '../types';

export const Bottombar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const bottombarLinks: BottombarLink[] = [
    {
      href: '/',
      icon: BiHome
    },
    {
      href: session ? '/likes' : null,
      icon: BiHeart
    },
    {
      href: session ? '/followings' : null,
      icon: BiGroup
    },
    {
      href: session ? `/${createUsername(session?.user?.name)}` : null,
      icon: BiUser
    }
  ];

  const handleLink = (link: BottombarLink) => {
    if (link.href) router.push(link.href);
    else toast.error('you need to sign in to access this page');
  };

  return (
    <div className="fixed bottom-0 flex h-[4.5rem] w-full items-center justify-center border-t border-main-grey bg-secondary-black px-10 lg:hidden">
      <ul className="flex w-full items-center justify-between">
        {bottombarLinks.map((link) => (
          <button
            onClick={() => handleLink(link)}
            key={link.icon.name}
            className="flex items-center gap-2 text-main-white"
          >
            <link.icon color="#e1e3e6" size={22} />
          </button>
        ))}
      </ul>
    </div>
  );
};
