import Avatar from "@/components/common/Avatar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectSignedUser } from "@/redux/features/accountSlice";
import { setIsOpenCreateModal } from "@/redux/features/globalModalSlice";

const CreateNew = ({ buttons }: { buttons?: JSX.Element[] }) => {
  const signedUser = useAppSelector(selectSignedUser);
  const dispatch = useAppDispatch();
  return (
    <div
      className="rounded-[10px] px-[20px] py-[16px] bg-blue bg-opacity-5"
      onClick={() => {
        dispatch(setIsOpenCreateModal(true));
      }}
    >
      <div className="flex gap-4">
        <Avatar src={signedUser?.avatar} />
        <textarea
          placeholder="Chia sẻ ngay"
          rows={2}
          className="flex-1 p-1 bg-transparent pointer-events-none resize-none"
        />
      </div>
      <div className={`h-[1px] bg-extra-light-gray`}></div>
      <div className="flex items-center gap-8 pt-4">{...buttons ?? []}</div>
    </div>
  );
};

export default CreateNew;
