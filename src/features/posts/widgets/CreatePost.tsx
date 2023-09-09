import { Avatar, createSupabaseImage } from '@/shared';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export const CreatePost = () => {
  const { data: session } = useSession();
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState<any>(null);

  return (
    <div className="flex w-full flex-col gap-3 rounded-lg border border-main-grey bg-secondary-black p-4">
      <div className="flex gap-3">
        <Avatar
          image={
            session?.user?.image ??
            createSupabaseImage(session?.user?.name as string)
          }
          size={28}
        />
      </div>
    </div>
  );
};
