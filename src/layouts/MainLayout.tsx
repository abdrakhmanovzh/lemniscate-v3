import { Toaster } from 'sonner';
import { useSession } from 'next-auth/react';
import { NavbarDropdown } from '@/features/navbar/widgets';
import { useMenu } from '@/features/navbar/hooks';
import { Sidebar } from '@/features/sidebar';
import { Navbar } from '@/features/navbar';
import { Loading } from '@/shared';
import { UsersBar } from '@/features/users';
import { Bottombar } from '@/features/bottombar';

interface Props {
  children: React.ReactNode;
  sidebar?: boolean;
  usersbar?: boolean;
}

export const MainLayout = ({
  children,
  sidebar = true,
  usersbar = true
}: Props) => {
  const { status } = useSession();

  const { isOpen } = useMenu();

  return (
    <div className="max-w-screen flex min-h-[100svh] flex-col overflow-auto bg-primary-black">
      <Toaster closeButton />

      {status === 'loading' ? (
        <div className="flex h-screen w-full items-center justify-center">
          <Loading />
        </div>
      ) : (
        <>
          <Navbar />
          {isOpen && (
            <div className="absolute right-4 top-14 z-10 lg:right-[15.5%] lg:block">
              <NavbarDropdown />
            </div>
          )}
          <div className="flex flex-1 pb-[4.5rem] lg:px-[14%] lg:pb-0">
            <div className="hidden flex-none pt-4 lg:block">
              {sidebar && <Sidebar />}
            </div>
            <div className="w-full flex-1">{children}</div>
            <div className="hidden flex-none pt-4 lg:block">
              {usersbar && <UsersBar />}
            </div>
          </div>
          <Bottombar />
        </>
      )}
    </div>
  );
};
