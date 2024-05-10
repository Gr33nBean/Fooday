import { useEffect, useRef, useState } from "react";

const lineHeight = 24;
const limitDefault = 200;
const defaultRow = 1;

const TextField = ({
  value,
  onChange,
  title,
  limitText,
  placeholder,
  rows: blurRow,
}: {
  placeholder?: string;
  limitText?: number;
  title?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [rows, setRow] = useState<number>(blurRow ?? defaultRow);
  useEffect(() => {
    if (
      textRef.current?.scrollHeight &&
      textRef.current.scrollHeight > textRef.current.offsetHeight
    ) {
      setRow(Number((textRef.current.scrollHeight / lineHeight).toFixed()));
    }
  }, [textRef.current?.scrollHeight]);
  const handleChange = (e: any) => {
    onChange(e.target.value.slice(0, limitText ?? limitDefault));
  };

  return (
    <label className="w-full">
      <p className="w-full flex items-center">
        <span className="flex-1 text-base font-semibold text-black">
          {title}
        </span>
        <span className="text-sm font-normal text-dark-gray">
          {value.length}/{limitText ?? limitDefault}
        </span>
      </p>
      <textarea
        ref={textRef}
        value={value}
        onFocus={() => {
          if (
            textRef.current?.scrollHeight &&
            textRef.current.scrollHeight > textRef.current.offsetHeight
          ) {
            setRow(
              Number((textRef.current.scrollHeight / lineHeight).toFixed())
            );
          }
        }}
        onBlur={() => setRow(blurRow ?? defaultRow)}
        placeholder={placeholder}
        style={{
          height: `${rows * 24}px`,
        }}
        className={`w-full bg-transparent resize-none outline-none text-sm leading-[24px] font-normal transition-all overflow-auto duration-300 `}
        onChange={handleChange}
      />
    </label>
  );
};

export default TextField;
