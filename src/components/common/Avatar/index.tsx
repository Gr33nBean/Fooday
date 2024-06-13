const Avatar = ({ className, src }: { className?: string; src?: string }) => {
  return (
    <p
      className={`size-[32px] border border-extra-light-gray aspect-square rounded-full overflow-hidden ${className}`}
    >
      <img
        src={
          src && src != ""
            ? src
            : "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
        }
        className={`size-full object-cover`}
      />
    </p>
  );
};

export default Avatar;
