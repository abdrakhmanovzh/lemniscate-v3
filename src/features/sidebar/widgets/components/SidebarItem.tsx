import { toast } from 'sonner';
import { useRouter } from 'next/router';
import { SidebarLink } from '../../types';

interface Props {
  link: SidebarLink;
}

export const SidebarItem = ({ link }: Props) => {
  const router = useRouter();

  const handleLink = () => {
    if (link.href) router.push(link.href);
    else toast.error('you need to sign in to access this page');
  };

  return (
    <li className="w-full rounded-md py-1 pl-2 hover:bg-secondary-black">
      <button
        onClick={handleLink}
        className="flex w-full items-center gap-2 text-main-white"
      >
        {link.Icon && <link.Icon color="#e1e3e6" />}
        {link.label}
      </button>
    </li>
  );
};
