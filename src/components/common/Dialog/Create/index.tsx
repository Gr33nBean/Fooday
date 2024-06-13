import { TABS } from "@/constants";
import {
  selectIsCreatePostInEvent,
  selectIsOpenCreate,
  setIsOpenCreate,
} from "@/redux/features/dialogSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import CustomDialog from "..";
import Event from "./Event";
import Post from "./Post";
import Request from "./Request";
import Resource from "./Resource";
import User from "./User";
import { selectSignedUser } from "@/redux/features/accountSlice";

const tabs = [
  { label: "Bài đăng", value: TABS.POST },
  { label: "Sự kiện", value: TABS.EVENT },
  { label: "Yêu cầu", value: TABS.REQUEST },
  { label: "Tài nguyên", value: TABS.RESOURCE, needAdmin: true },
  { label: "Người dùng", value: "User", needAdmin: true },
];

const Create = () => {
  const open = useAppSelector(selectIsOpenCreate);
  const signedInUser = useAppSelector(selectSignedUser);
  const isCreatePostInEvent = useAppSelector(selectIsCreatePostInEvent);
  const dispatch = useAppDispatch();

  const [selectedTab, setSelectedTab] = useState<string>(TABS.POST);

  const onChangeTab = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <CustomDialog
      open={open}
      onClose={() => dispatch(setIsOpenCreate(false))}
      className="px-0 py-0 relative overflow-y-auto h-[90%]"
    >
      <div className="w-full min-h-full h-fit flex flex-col ">
        {/* Header */}
        <div className="w-full sticky top-0 z-20 bg-white shadow-sm">
          <p className="w-full  text-center font-bold text-md text-black py-3 px-5 border-b border-extra-light-gray">
            Thêm mới
          </p>
          {/* {isCreatePostInEvent == -1 && (
            <Tabs
              selectedTab={selectedTab}
              onChangeTab={onChangeTab}
              listTabs={tabs.filter((item) => {
                if (!item.needAdmin) {
                  return true;
                }
                if (signedInUser?.grade === "admin") {
                  return true;
                }

                return false;
              })}
            />
          )} */}
        </div>

        {/* Content */}
        <div className="w-full">
          <div
            style={{
              display: selectedTab === TABS.POST ? "block" : "none",
            }}
          >
            {/* <Post /> */}
          </div>
          <div
            style={{
              display: selectedTab === TABS.EVENT ? "block" : "none",
            }}
          >
            {/* <Event /> */}
          </div>
          <div
            style={{
              display: selectedTab === TABS.REQUEST ? "block" : "none",
            }}
          >
            {/* <Request /> */}
          </div>

          <div
            style={{
              display: selectedTab === TABS.RESOURCE ? "block" : "none",
            }}
          >
            {/* <Resource /> */}
          </div>

          <div
            style={{
              display: selectedTab === "User" ? "block" : "none",
            }}
          >
            <User />
          </div>
        </div>
      </div>
    </CustomDialog>
  );
};

export default Create;
