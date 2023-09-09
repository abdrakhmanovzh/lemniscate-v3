import Image from 'next/image';
import LoadingIcon from '@/assets/images/loaders/loading.svg';

export const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <Image src={LoadingIcon} alt="loading" width={70} height={70} />
    </div>
  );
};
