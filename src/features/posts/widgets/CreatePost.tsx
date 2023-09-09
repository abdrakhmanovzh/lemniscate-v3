/* eslint-disable @next/next/no-img-element */
import { toast } from 'sonner';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Avatar, getSupabaseAvatar, createUsername } from '@/shared';
import { supabase } from '@/db/supabase';
import { useCreatePost } from '../hooks';
import Image from 'next/image';
import LoadingIcon from '@/assets/images/loaders/loading_white.svg';

export const CreatePost = () => {
  const { data: session } = useSession();
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState<any>(null);

  const { mutate: createPost } = useCreatePost();

  const [isPostLoading, setIsPostLoading] = useState(false);

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files?.[0]);
  };

  const handlePost = async () => {
    setIsPostLoading(true);
    try {
      const filename = Date.now() + imageFile.name;
      await supabase.storage.from('images').upload(filename, imageFile);
      createPost(
        {
          text: text,
          username: createUsername(session?.user?.name) ?? '',
          imageFilename: filename
        },
        {
          onSuccess: () => {
            setText('');
            setImageFile(null);
            toast.success('post created successfully');
          }
        }
      );
    } catch (error) {
      toast.error('something went wrong');
      console.error(error);
    } finally {
      setIsPostLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-3 rounded-lg border border-main-grey bg-secondary-black p-4">
      <div className="flex gap-3">
        <Avatar
          image={
            session?.user?.image ??
            getSupabaseAvatar(session?.user?.name as string)
          }
          size={28}
        />
        <div className="flex-1">
          <input
            type="text"
            value={text}
            onChange={handleText}
            placeholder="anything new?"
            className="w-full bg-transparent text-sm text-main-white outline-none placeholder:text-neutral-500"
          />
        </div>
        <label
          htmlFor="image"
          className="flex cursor-pointer items-center rounded-md bg-main-grey px-2 text-center text-sm text-neutral-300"
        >
          add image
          <input
            id="image"
            type="file"
            onChange={handleImage}
            className="hidden"
          />
        </label>
        <button
          onClick={handlePost}
          className="rounded-md bg-main-grey px-2 text-sm text-main-white"
        >
          {isPostLoading ? (
            <Image src={LoadingIcon} alt="..." height={20} width={20} />
          ) : (
            'post'
          )}
        </button>
      </div>
      {imageFile && (
        <div className="w-full flex-1 pt-4">
          <img
            src={URL.createObjectURL(imageFile)}
            alt="image"
            className="max-h-[400px] w-full rounded-md object-contain"
          />
        </div>
      )}
    </div>
  );
};
