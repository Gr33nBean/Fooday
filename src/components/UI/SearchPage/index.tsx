import { IonSearchbar } from "@ionic/react";
import { Suspense } from "react";

const SearchContent = () => {
  return (
    <div className="px-8">
      <p className="w-full text-2xl font-extrabold mb-4">Tìm kiếm</p>
      <div className="w-full sticky top-[-1px] z-10 rounded-md overflow-hidden bg-white">
        <IonSearchbar
          placeholder="Tiềm kiếm"
          className="!p-0 !min-h-fit "
        ></IonSearchbar>
      </div>

      <div className="w-full max-w-full pt-3 flex flex-col">
        {new Array(10)
          .fill({
            id: "",
            avatar: "",
            name: "Huy",
            des: "vvvvvvv vvvvvvvvvvvvvvvvvvvvv vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv",
            grade: "Nhân viên",
            department: "Phòng nhân sự",
            post: 20,
          })
          .map((item, index) => {
            return (
              <div key={index} className="w-full max-w-full pt-[12px]">
                <div className="w-full flex gap-2 items-start">
                  <div className="w-[42px] h-[42px] rounded-full overflow-hidden relative">
                    <Suspense
                      fallback={
                        <div className="absolute top-0 left-0 w-full h-full bg-extra-light-gray animate-pulse"></div>
                      }
                    >
                      <img
                        className="size-full rounded-full object-cover"
                        alt="Silhouette of a person's head"
                        src="https://ionicframework.com/docs/img/demos/avatar.svg"
                      />
                    </Suspense>
                  </div>

                  <div className="overflow-hidden flex-1">
                    <p className="w-full font-manrope text-xl font-bold">
                      {item.name.toLowerCase()}
                    </p>
                    <p className="text-ellipsis-2-rows  w-full font-manrope text-base font-normal break-words ">
                      {item.des}
                    </p>
                  </div>

                  <button className="rounded-lg px-5 py-1 font-manrope text-sm font-bold text-dark-gray bg-dark-gray bg-opacity-10">
                    Xem trang
                  </button>
                </div>

                <div className="pt-2 ml-10 flex items-center gap-2 pb-[12px] border-b border-solid border-dark-gray">
                  <p className="font-manrope text-xs font-bold rounded-md bg-blue bg-opacity-10 text-blue py-[2px] px-[6px]">
                    {item.grade}
                  </p>
                  <p className="font-manrope text-xs font-bold rounded-md bg-blue bg-opacity-10 text-blue py-[2px] px-[6px]">
                    {item.department}
                  </p>
                  <p className="font-manrope text-xs font-bold rounded-md bg-blue bg-opacity-10 text-blue py-[2px] px-[6px]">
                    {item.post} bài đăng
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SearchContent;
