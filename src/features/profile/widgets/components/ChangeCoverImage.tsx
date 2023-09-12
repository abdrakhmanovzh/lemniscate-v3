import { toast } from 'sonner';
import Image from 'next/image';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/db/supabase';
import { User } from '@/db/schema';

interface Props {
  user: User | undefined;
}

export const ChangeCoverImage = ({ user }: Props) => {
  const [coverImage, setCoverImage] = useState<any>(null);
  const queryClient = useQueryClient();

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoverImage(e.target.files?.[0]);
  };

  const handleCoverImageSave = async () => {
    try {
      if (user) {
        await supabase.storage.from('coverImages').remove([user.name]);
        await supabase.storage
          .from('coverImages')
          .upload(user.name, coverImage);
      }
      setCoverImage(null);
      queryClient.invalidateQueries(['user']);
      toast.success('cover image updated');
    } catch (error) {}
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="rounded-lg text-start text-lg text-main-white">
          change cover image
        </p>
        <button
          onClick={handleCoverImageSave}
          className="rounded-md bg-main-grey px-2 py-[2px] text-main-white"
        >
          save
        </button>
      </div>
      {user ? (
        <>
          <div className="flex items-center justify-between gap-2 rounded-md border-2 border-main-grey bg-secondary-black px-2 py-[6px]">
            <label
              htmlFor="coverImage"
              className="flex w-full cursor-pointer items-center justify-between text-main-white text-opacity-50"
            >
              {coverImage ? 'change cover image' : 'upload cover image'}
              <input
                id="coverImage"
                type="file"
                onChange={handleCoverImageChange}
                className="hidden"
              />
            </label>
          </div>
          {coverImage && (
            <div className="my-4 w-full">
              <div className="relative mx-auto h-44 w-full rounded-full">
                <Image
                  src={URL.createObjectURL(coverImage)}
                  alt="image"
                  fill
                  className="object-cover"
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
