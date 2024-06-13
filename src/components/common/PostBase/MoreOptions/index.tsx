import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import ThreeDotsIcon from "@/assets/images/home/three-dots.svg";
import { useCallback, useState } from "react";
import CustomDialog from "../../Dialog";
import { useAppDispatch } from "@/redux/hooks";
import { postService } from "@/services/post.service";
import { setIsLoading } from "@/redux/features/dialogSlice";
import { eventService } from "@/services/event.service";
import { commentService } from "@/services/comment.service";
import { requestService } from "@/services/request.service";
import { resourceUsingService } from "@/services/resourceUsing.service";
import toast from "react-hot-toast";

export type MoreOptionsType =
  | "comment"
  | "event"
  | "post"
  | "request"
  | "resourcePost"
  | "resourceUsing";

const MoreOptions = ({ type, id }: { type?: MoreOptionsType; id?: number }) => {
  const dispatch = useAppDispatch();

  const HandleDelete = useCallback(async () => {
    if (!id || !type) {
      return;
    }
    setIsOpenDelete(false);

    dispatch(setIsLoading(true));
    let delMessage = "";

    if (type == "comment") {
      await commentService.deleteComment([id]);
      delMessage = "bình luận";
    }
    if (type == "post") {
      await postService.deletePost([id]);
      delMessage = "bài đăng";
    }
    if (type == "event") {
      await eventService.deleteEvent([id]);
      delMessage = "sự kiện";
    }

    if (type == "request") {
      await requestService.deleteRequest([id]);
      delMessage = "yêu cầu";
    }

    // thiếu resourcePost

    if (type == "resourceUsing") {
      await resourceUsingService.deleteResourceUsing([id]);
      delMessage = "mượn tài nguyên";
    }
    toast.success("Xóa " + delMessage + " thành công");
    dispatch(setIsLoading(false));
  }, [id, type, dispatch]);

  const [isOpenDelete, setIsOpenDelete] = useState(false);

  return (
    <Menu>
      <MenuButton>
        <img src={ThreeDotsIcon} alt="three-dots" />
      </MenuButton>

      <MenuItems
        anchor="bottom end"
        className="bg-white rounded-xl text-xs shadow-3xl z-[999] text-black"
      >
        {[
          // { text: "Chỉnh sửa", onClick: HandleEdit },
          {
            text: "Xóa",
            onClick: () => {
              setIsOpenDelete(true);
            },
          },
        ].map((item, index) => (
          <MenuItem key={index}>
            <p
              className="py-1 hover:bg-extra-light-gray px-5 cursor-pointer"
              onClick={item.onClick}
            >
              {item.text}
            </p>
          </MenuItem>
        ))}
      </MenuItems>

      <CustomDialog
        open={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        className="px-0 py-0 relative overflow-y-auto h-fit !w-fit "
      >
        <div className="w-full min-h-full h-fit flex flex-col px-8 py-6 gap-4 ">
          <p className="w-full text-center text-base font-bold">
            Xác nhận xóa?
          </p>

          <div className="flex text-sm items-center gap-2 justify-center">
            <button
              className="px-8 py-1 rounded-full border border-dark-gray bg-dark-gray bg-opacity-5 text-dark-gray"
              onClick={() => setIsOpenDelete(false)}
            >
              Hủy
            </button>
            <button
              className="px-8 py-1  rounded-full border font-semibold text-blue border-blue bg-blue bg-opacity-10"
              onClick={HandleDelete}
            >
              Xóa
            </button>
          </div>
        </div>
      </CustomDialog>
    </Menu>
  );
};

export default MoreOptions;
