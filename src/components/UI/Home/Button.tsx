import Loading from "@/components/common/Layout/Loading";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  onClick?: () => void;
  loading?: boolean;
};

const Button = ({
  text,
  onClick,
  className,
  loading,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`h-[43px] text-center bg-blue hover:bg-opacity-90 text-white text-sm font-bold rounded-full ${className}`}
      {...props}
      onClick={onClick}
    >
      {loading ? <Loading /> : text}
    </button>
  );
};

export default Button;
