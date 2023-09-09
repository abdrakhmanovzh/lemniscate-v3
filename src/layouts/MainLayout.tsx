import { Toaster } from 'sonner';
import { Nunito } from 'next/font/google';
import { useSession } from 'next-auth/react';
import { NavbarDropdown } from '@/features/navbar/widgets';
import { useMenu } from '@/features/navbar/hooks';
import { Sidebar } from '@/features/sidebar';
import { Navbar } from '@/features/navbar';
import { Loading } from '@/shared';

const font = Nunito({ subsets: ['latin'] });

interface Props {
  children: React.ReactNode;
  sidebar?: boolean;
}

export const MainLayout = ({ children, sidebar = true }: Props) => {
  const { status } = useSession();

  const { isOpen } = useMenu();

  return (
    <div
      className={`${font.className} max-w-screen flex min-h-[100svh] flex-col overflow-auto bg-primary-black`}
    >
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
            <div className="hidden flex-[1] pt-4 lg:block">
              {sidebar && <Sidebar />}
            </div>
            <div className="flex-[4]">{children}</div>
            <div className="hidden flex-[1] pt-4 lg:block">
              {/* <Followbar /> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
