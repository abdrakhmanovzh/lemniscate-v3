import { toast } from 'sonner';
import Image from 'next/image';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/db/supabase';
import { User } from '@/db/schema';

interface Props {
  user: User | undefined;
}

export const ChangeAvatar = ({ user }: Props) => {
  const [avatar, setAvatar] = useState<any>(null);
  const queryClient = useQueryClient();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatar(e.target.files?.[0]);
  };

  const handleAvatarSave = async () => {
    try {
      if (user) {
        await supabase.storage.from('avatars').remove([user.name]);
        await supabase.storage.from('avatars').upload(user.name, avatar);
      }
      setAvatar(null);
      queryClient.invalidateQueries(['user']);
      toast.success('avatar updated');
    } catch (error) {}
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="rounded-lg text-start text-lg text-main-white">
          change avatar
        </p>
        <button
          onClick={handleAvatarSave}
          className="rounded-md bg-main-grey px-2 py-[2px] text-main-white"
        >
          save
        </button>
      </div>
      {user ? (
        <>
          <div className="flex items-center justify-between gap-2 rounded-md border-2 border-main-grey bg-secondary-black px-2 py-[6px]">
            <label
              htmlFor="avatar"
              className="flex w-full cursor-pointer items-center justify-between text-main-white text-opacity-50"
            >
              {avatar ? 'change avatar' : 'upload avatar'}
              <input
                id="avatar"
                type="file"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>
          {avatar && (
            <div className="mt-4 w-full">
              <div className="relative mx-auto h-32 w-32 rounded-full">
                <Image
                  src={URL.createObjectURL(avatar)}
                  alt="image"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="h-9 rounded-md bg-main-grey"></div>
      )}
    </div>
  );
};
