import Image from 'next/image';
import { useRouter } from 'next/router';
import Logo from '@/assets/images/logos/lemniscate.svg';

export const NavbarLogo = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <button
      onClick={handleClick}
      className="flex cursor-pointer items-center gap-2"
    >
      <div className="relative h-10 w-10 lg:h-6 lg:w-6">
        <Image src={Logo} fill alt="logo" />
      </div>
      <p className="text-main-white hidden text-xl font-semibold lg:block">
        lemniscate
      </p>
    </button>
  );
};
