import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import LoadingIcon from '@/assets/images/loaders/loading_white.svg';
import { AuthDivider, LoginOptions } from './components';

export const LoginCard = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoginLoading(true);
    e.preventDefault();
    try {
      await signIn('credentials', {
        username,
        password
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoginLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md rounded-lg border border-main-grey bg-secondary-black p-4"
    >
      <h1 className="text-center text-xl font-semibold text-main-white">
        sign in
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
        <button
          disabled={!username || !password}
          onClick={handleLogin}
          className="flex cursor-pointer items-center justify-center rounded-md bg-main-grey text-main-white disabled:cursor-default disabled:bg-opacity-40"
        >
          {isLoginLoading ? (
            <Image
              src={LoadingIcon}
              alt="loading..."
              height={32}
              width={32}
              className="my-[2px]"
            />
          ) : (
            <p className="my-[6px]">login</p>
          )}
        </button>
      </form>
      <AuthDivider />
      <LoginOptions />
    </motion.div>
  );
};
