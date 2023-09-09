/* eslint-disable @next/next/no-img-element */
import { supabase } from '@/db/supabase';
import { Avatar, getSupabaseAvatar, createUsername } from '@/shared';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useCreatePost } from '../hooks';

export const CreatePost = () => {
  const { data: session } = useSession();
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState<any>(null);

  const { mutate: createPost } = useCreatePost();

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files?.[0]);
  };

  const handlePost = async () => {
    try {
      const uploadedImage = await supabase.storage
        .from('images')
        .upload(Date.now() + imageFile.name, imageFile);

      createPost(
        {
          text: text,
          username: createUsername(session?.user?.name) ?? '',
          imageFilename: uploadedImage.data?.path ?? ''
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
          post
        </button>
      </div>
      {imageFile && (
        <div className="pt-4">
          <img
            src={URL.createObjectURL(imageFile)}
            alt="image"
            className="max-h-[400px] max-w-lg rounded-md object-contain"
          />
        </div>
      )}
    </div>
  );
};
