import Link from 'next/link';

export const LoginOptions = () => {
  return (
    <div className="mt-4 flex items-center gap-2">
      <Link
        href="/auth/signup"
        className="w-full rounded-md bg-main-grey py-1 text-center text-main-white"
      >
        sign up
      </Link>
    </div>
  );
};
