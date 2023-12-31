import { User } from '@/db/schema';
import { ChangeAvatar, ChangeBio, ChangeCoverImage } from './components';

interface Props {
  user: User | undefined;
}

export const ProfileSettings = ({ user }: Props) => {
  return (
    <div className="flex flex-col items-start gap-4">
      <ChangeBio user={user} />
      <ChangeAvatar user={user} />
      <ChangeCoverImage user={user} />
    </div>
  );
};
