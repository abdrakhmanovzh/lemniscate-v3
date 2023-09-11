import { motion } from 'framer-motion';

interface Props {
  screenWidth: number;
}

export const AnimatedBackground = ({ screenWidth }: Props) => {
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: screenWidth > 450 ? 96 : 128 }}
      className="absolute bottom-0 left-0 flex h-32 w-full rounded-b-sm rounded-t-2xl bg-main-grey pl-10 lg:h-24"
    ></motion.div>
  );
};
