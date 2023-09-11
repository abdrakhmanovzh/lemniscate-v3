import { toast } from 'sonner';
import { useState } from 'react';
import { useChangeBio } from '../../hooks';
import { User } from '@/db/schema';

interface Props {
  user: User | undefined;
}

export const ChangeBio = ({ user }: Props) => {
  const [bio, setBio] = useState('');

  const { mutate: changeBio } = useChangeBio();

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };

  const handleBioSave = () => {
    try {
      if (user)
        changeBio(
          { bio: bio, username: user?.name },
          {
            onSuccess: () => {
              toast.success('bio updated');
            },
            onSettled: () => {
              setBio('');
            }
          }
        );
    } catch (error) {}
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="rounded-lg text-start text-lg text-main-white">
          change bio
        </p>
        <button
          onClick={handleBioSave}
          className="rounded-md bg-main-grey px-2 py-[2px] text-main-white"
        >
          save
        </button>
      </div>
      {user ? (
        <input
          type="text"
          value={bio}
          onChange={handleBioChange}
          className="placeholder:text-op w-full rounded-md border-2 border-main-grey bg-secondary-black px-2 py-1 text-lg text-main-white outline-none placeholder:text-main-white placeholder:text-opacity-50"
          placeholder="new bio"
        />
      ) : (
        <div className="h-9 rounded-md bg-main-grey"></div>
      )}
    </div>
  );
};
