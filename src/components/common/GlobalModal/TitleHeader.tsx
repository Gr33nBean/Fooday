export const headerHeight = 64;
const TitleHeader = ({
  title,
  handleClose,
  hideCloseButton,
  noBorder,
  className,
}: {
  hideCloseButton?: boolean;
  noBorder?: boolean;
  title?: string;
  handleClose?: () => void;
  className?: string;
}) => {
  return (
    <div
      className={`w-full ion-padding-horizontal ${
        !noBorder && "border-b border-light-gray"
      }`}
    >
      <div
        className={`w-full h-[${headerHeight}px] text-center flex items-center justify-center relative text-sm font-bold ${className}`}
      >
        {!hideCloseButton && (
          <button
            className="absolute top-0 left-0 h-full flex items-center font-normal"
            onClick={handleClose}
          >
            Hủy
          </button>
        )}
        {title}
      </div>
    </div>
  );
};

export default TitleHeader;
