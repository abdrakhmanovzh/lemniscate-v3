import { signOut } from 'next-auth/react';
import { BiLogOut } from 'react-icons/bi';

export const NavbarDropdown = () => {
  return (
    <div className="border-main-grey bg-secondary-black flex w-32 flex-col rounded-md border">
      <button
        onClick={() => signOut()}
        className="hover:bg-main-grey flex items-center gap-2 py-1 pl-2"
      >
        <BiLogOut color="#e1e3e6" />
        <p className="text-main-white">logout</p>
      </button>
    </div>
  );
};
