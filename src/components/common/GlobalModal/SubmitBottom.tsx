export const submitBottomHeight = 64;

const SubmitBottom = () => {
  return (
    <div
      className={`w-full overflow-hidden max-h-[${submitBottomHeight}px] border-t border-extra-light-gray flex items-center gap-2 ion-padding-horizontal py-2`}
    >
      <p className="flex-1">Hãy động nhưng vui lý</p>
      <button className="rounded-full py-[10px] px-4 bg-blue flex items-center text-sm font-bold text-white">
        Đăng
      </button>
    </div>
  );
};

export default SubmitBottom;
