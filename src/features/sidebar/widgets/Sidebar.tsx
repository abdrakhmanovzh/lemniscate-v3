import { useSession } from 'next-auth/react';
import { BiUser, BiNews, BiGroup, BiHeart } from 'react-icons/bi';
import { SidebarItem } from './components';
import { createUsername } from '@/shared';
import { SidebarLink } from '../types';

export const Sidebar = () => {
  const { data: session } = useSession();

  const sidebarLinks: SidebarLink[] = [
    {
      label: 'profile',
      href: session ? `/${createUsername(session.user?.name)}` : null,
      Icon: BiUser
    },
    {
      label: 'posts',
      href: '/',
      Icon: BiNews
    },
    {
      label: 'likes',
      href: session ? '/likes' : null,
      Icon: BiHeart
    },
    {
      label: 'followings',
      href: session ? '/followings' : null,
      Icon: BiGroup
    }
  ];

  return (
    <nav className="flex w-44 px-2">
      <ul className="flex w-full flex-col gap-1">
        {sidebarLinks.map((link, index) => (
          <SidebarItem key={index} link={link} />
        ))}
      </ul>
    </nav>
  );
};
