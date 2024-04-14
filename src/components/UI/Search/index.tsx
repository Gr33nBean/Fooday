import { IonSearchbar } from "@ionic/react";

const SearchContent = () => {
  return (
    <>
      <div className="w-full sticky top-0 bg-white pb-1">
        <IonSearchbar
          placeholder="Tiềm kiếm"
          className="!p-0 !min-h-fit"
        ></IonSearchbar>
      </div>

      <div className="w-full max-w-full pt-3 flex flex-col">
        {new Array(10)
          .fill({
            id: "",
            avatar: "",
            name: "Huy",
            des: "vvvvvvv vvvvvvvvvvvvvvvvvvvvv vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv",
            plans: 20,
            likes: 340,
            clones: 100,
          })
          .map((item, index) => {
            return (
              <div key={index} className="w-full max-w-full pt-2">
                <div className="w-full flex gap-2 items-center">
                  <img
                    className="size-8 rounded-full object-cover"
                    alt="Silhouette of a person's head"
                    src="https://ionicframework.com/docs/img/demos/avatar.svg"
                  />

                  <div className="overflow-hidden flex-1">
                    <p className="w-full font-manrope text-sm font-bold">
                      {item.name}
                    </p>
                    <p className="w-full font-manrope text-xs font-normal text-ellipsis overflow-hidden whitespace-nowrap">
                      {item.des}
                    </p>
                  </div>

                  <button className="rounded-lg px-5 py-1 font-manrope text-sm font-normal border border-solid border-primary">
                    Xem trang
                  </button>
                </div>

                <div className="pt-2 ml-10 flex items-center gap-2 pb-2 border-b border-solid border-primary">
                  <p className="font-manrope text-xs font-normal">
                    {item.plans} Lịch ăn
                  </p>
                  •
                  <p className="font-manrope text-xs font-normal">
                    {item.likes} Lượt thích
                  </p>
                  •
                  <p className="font-manrope text-xs font-normal">
                    {item.clones} Lượt sử dụng lịch ăn
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default SearchContent;
