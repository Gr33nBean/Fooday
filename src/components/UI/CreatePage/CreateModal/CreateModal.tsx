import SubmitBottom, {
  submitBottomHeight,
} from "@/components/common/GlobalModal/SubmitBottom";
import TitleHeader, {
  headerHeight,
} from "@/components/common/GlobalModal/TitleHeader";
import { IonModal } from "@ionic/react";
import { TypeCreate } from "./ChooseTypeCreateModal";
import DefaultAva from "@/components/common/Avatar/DefaultAva";
import UserName from "@/components/common/Avatar/UserName";
import TextField from "@/components/common/TextField/TextField";
import { useState } from "react";
import TextFieldOpenModal from "@/components/common/TextField/TextFieldOpenModal";
import { Radio_Check } from "@/components/common/Svg";
import SpacingBottom, {
  spacingBottomHeight,
} from "@/components/common/GlobalModal/SpacingBottom";

const CreateModal = ({
  type,
  isOpen,
  handleClose,
}: {
  type?: string;
  isOpen: boolean;
  handleClose: () => void;
}) => {
  const [data, setData] = useState({
    title: "",
    type: "",
    content: "",
  });
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={handleClose}
      initialBreakpoint={1}
      breakpoints={[0, 1]}
    >
      <div className="h-[95svh] relative ">
        {/*  */}
        <div className="sticky top-0 w-full bg-white">
          <TitleHeader
            title={
              type ? TypeCreate.find((item) => item.type === type)?.name : ""
            }
            handleClose={handleClose}
          />
        </div>

        {/*  */}
        <div
          className={`h-[calc(100%-${submitBottomHeight}px-${headerHeight}px-{${spacingBottomHeight}px)] overflow-auto ion-padding-horizontal py-3`}
        >
          <div className="flex w-full items-start gap-2 flex-wrap">
            {/*  */}
            <div className="flex self-stretch transition-all duration-300 flex-col justify-start items-center gap-2">
              <div className="size-[32px]">
                <DefaultAva />
              </div>

              <div className="flex-1 w-[1px] bg-extra-light-gray"></div>
            </div>

            {/*  */}
            <div className="flex-1 flex flex-col gap-2 justify-start transition-all duration-300">
              <UserName>Huy</UserName>

              <TextField
                value={data.title}
                onChange={(value) => {
                  setData({ ...data, title: value });
                }}
                title="Tiêu đề"
                placeholder="Nhập tiêu đề"
                rows={1}
              />

              <TextFieldOpenModal
                title="Loại bài đăng"
                value={data.type}
                onChange={() => {}}
                placeholder="Chọn loại bài đăng"
                contentModal={
                  <div className="flex flex-col w-full gap-4">
                    {[
                      {
                        display: "Truyền thông",
                        value: "media",
                        color: "#1da1f2",
                      },
                      {
                        display: "Bảng tin",
                        value: "news",
                        color: "green",
                      },
                      {
                        display: "Thông báo",
                        value: "hot",
                        color: "red",
                      },
                    ].map((item, index) => (
                      <button
                        key={index}
                        className="w-full flex items-center gap-2 text-base font-semibold text-black"
                        onClick={() => {
                          setData({ ...data, type: item.display });
                        }}
                      >
                        <span
                          className={`py-1 text-center w-[84px] rounded-md capitalize bg-[${item.color}] bg-opacity-10 text-[${item.color}] text-xs font-bold`}
                        >
                          {item.value}
                        </span>
                        <span className="flex-1 text-start">
                          {item.display}
                        </span>
                        {data.type === item.display && (
                          <Radio_Check color={item.color} />
                        )}
                      </button>
                    ))}
                  </div>
                }
              />

              <TextField
                value={data.content}
                onChange={(value) => {
                  setData({ ...data, content: value });
                }}
                title="Nội dung"
                placeholder="Nhập nội dung"
                limitText={1000}
                rows={5}
              />
            </div>

            {/*  */}
            <div className="w-full flex items-center gap-2">
              <div className="w-[32px] flex items-center justify-center">
                <div className="size-[20px]">
                  <DefaultAva />
                </div>
              </div>

              <div className="flex-1">
                <UserName>Huy</UserName>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        <div
          className={`fixed left-0 bottom-[${spacingBottomHeight}px] h-fit w-full`}
        >
          <SubmitBottom />
        </div>

        {/*  */}
        <SpacingBottom />
      </div>
    </IonModal>
  );
};

export default CreateModal;
