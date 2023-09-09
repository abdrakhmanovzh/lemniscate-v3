import { NavbarLogo, NavbarMenu } from './components';

export const Navbar = () => {
  return (
    <div className="bg-secondary-black flex h-16 w-full items-center justify-between px-4 lg:px-[15%]">
      <NavbarLogo />
      <NavbarMenu />
    </div>
  );
};
