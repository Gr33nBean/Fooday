import { cn } from "@/utils";

type TagProps = {
  text: string;
  color?: string;
};
const Tag = ({ text, color }: TagProps) => {
  return (
    <p
      className={cn(
        `pointer-events-none text-[14px] leading-[14px] font-semibold py-1 px-2 w-fit rounded-[4px] flex items-center justify-center text-blue bg-blue bg-opacity-10`
      )}
      style={color ? { backgroundColor: color + "20", color: color } : {}}
    >
      {text}
    </p>
  );
};

export default Tag;
