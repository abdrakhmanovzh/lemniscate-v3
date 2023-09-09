import { NavbarLogo, NavbarMenu } from './components';

export const Navbar = () => {
  return (
    <div className="flex h-16 w-full items-center justify-between border-b border-main-grey bg-secondary-black px-4 lg:px-[15%]">
      <NavbarLogo />
      <NavbarMenu />
    </div>
  );
};
