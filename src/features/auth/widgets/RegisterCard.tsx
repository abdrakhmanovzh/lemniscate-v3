import Link from 'next/link';
import { toast } from 'sonner';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import LoadingIcon from '@/assets/images/loaders/loading_white.svg';
import { AuthDivider } from './components';
import { supabase } from '@/db/supabase';
import { useSignUp } from '../hooks';

export const RegisterCard = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState<any>(null);

  const [showPassword, setShowPassword] = useState(false);

  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const { mutate: signUp } = useSignUp();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatar(e.target.files?.[0]);
  };

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsRegisterLoading(true);
    try {
      await supabase.storage.from('avatars').upload(username, avatar);

      signUp(
        {
          username,
          password
        },
        {
          onSuccess: () => {
            toast.success('account created');
            signIn('credentials', {
              username,
              password
            });
          }
        }
      );
    } catch (error) {
      toast.error('something went wrong');
      console.error(error);
    } finally {
      setIsRegisterLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md rounded-lg border border-main-grey bg-secondary-black p-4"
    >
      <h1 className="text-center text-xl font-semibold text-main-white">
        sign up
      </h1>
      <form className="mt-4 flex flex-col gap-3">
        <div className="rounded-md border border-main-grey p-2">
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className="w-full bg-transparent text-sm text-main-white outline-none placeholder:text-main-white placeholder:text-opacity-50"
            placeholder="username"
          />
        </div>
        <div className="flex items-center justify-between gap-2 rounded-md border border-main-grey p-2">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            className="w-full bg-transparent text-sm text-main-white outline-none placeholder:text-main-white placeholder:text-opacity-50"
            placeholder="password"
          />
          {showPassword ? (
            <AiOutlineEye
              className="cursor-pointer"
              onClick={togglePassword}
              color="#7a7a7a"
              size={18}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="cursor-pointer"
              onClick={togglePassword}
              color="#7a7a7a"
              size={18}
            />
          )}
        </div>
        <div className="flex items-center justify-between gap-2 rounded-md border border-main-grey p-2">
          <label
            htmlFor="avatar"
            className="flex w-full cursor-pointer items-center justify-between text-sm text-main-white text-opacity-50"
          >
            {avatar ? 'change avatar' : 'upload avatar'}
            <input
              id="avatar"
              type="file"
              onChange={handleAvatarChange}
              className="hidden"
            />
            {avatar && (
              <div className="relative h-20 w-20 rounded-full">
                <Image
                  src={URL.createObjectURL(avatar)}
                  alt="image"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            )}
          </label>
        </div>
        <button
          disabled={!username || !password || !avatar}
          onClick={handleRegister}
          className="flex cursor-pointer items-center justify-center rounded-md bg-main-grey text-main-white disabled:cursor-default disabled:bg-opacity-40"
        >
          {isRegisterLoading ? (
            <Image
              src={LoadingIcon}
              alt="loading..."
              height={32}
              width={32}
              className="my-[2px]"
            />
          ) : (
            <p className="my-[6px]">register</p>
          )}
        </button>
      </form>
      <AuthDivider />
      <div className="mt-4 flex items-center">
        <Link
          href="/auth/signin"
          className="w-full rounded-md bg-main-grey py-1 text-center text-main-white"
        >
          sign in
        </Link>
      </div>
    </motion.div>
  );
};
