import Image from 'next/image';
import LoadingIcon from '@/assets/images/loaders/loading.svg';

export const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <Image src={LoadingIcon} alt="loading" width={50} height={50} />
    </div>
  );
};
