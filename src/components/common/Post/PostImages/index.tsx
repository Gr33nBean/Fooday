import { setIsOpenViewImage } from "@/redux/features/dialogSlice";
import { useAppDispatch } from "@/redux/hooks";

const PostImages = ({
  imageUrls,
  onClick,
}: {
  imageUrls: string[];
  onClick?: () => void;
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className={`flex gap-2 max-w-full overflow-x-auto overflow-y-hidden`}>
      {imageUrls?.map((item, index) => (
        <img
          key={index}
          src={item}
          alt="image"
          className={`h-[156px] min-w-[117px] w-[117px] rounded-[10px] object-cover border border-extra-light-gray cursor-pointer`}
          onClick={
            onClick
              ? onClick
              : () =>
                  dispatch(
                    setIsOpenViewImage({
                      index,
                      images: imageUrls,
                    })
                  )
          }
        />
      ))}
    </div>
  );
};

export default PostImages;
