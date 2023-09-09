/* eslint-disable @next/next/no-img-element */
interface Props {
  image: string;
  size: number;
  onClick?: () => void;
}

export const Avatar = ({ image, size, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="relative rounded-full bg-neutral-600"
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      <img
        src={image}
        alt="avatar"
        className="rounded-full object-cover"
        style={{
          height: `${size}px`,
          width: `${size}px`
        }}
      />
    </div>
  );
};
