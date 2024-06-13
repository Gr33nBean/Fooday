import { getVNLabel, getWording } from "@/constants/type";
import { User } from "@/services/type";
import { getFormatDateString } from "@/utils";
import calendar from "@assets/images/Common/Calendar_Days.svg";
import cupcake from "@assets/images/Common/Cupcake.svg";
import EditProfile from "../EditProfile";
import ProfileTabs from "../ProfileTabs";

const ProfileInfo = ({ data, isGuest }: { data?: User; isGuest?: boolean }) => {
  return (
    <div className="w-full">
      {/*  */}
      <div
        className={`w-full relative flex bg-extra-light-gray items-end ion-padding-horizontal h-[200px] gap-4`}
      >
        {/*  */}
        <div className="absolute z-0 left-0 bottom-0 w-full h-[50px] bg-white"></div>

        {/*  */}
        <div className={`z-10 size-[100px] rounded-full bg-white p-1`}>
          <img
            src={data?.avatar ?? ""}
            className={`size-full object-cover rounded-full`}
          />
        </div>

        {/*  */}
        <div
          className={`z-10 flex-1 text-xs  flex justify-end items-center gap-2 h-[calc(100px/2)]`}
        >
          {[
            { label: getWording(data?.grade ?? "") },
            {
              label: getVNLabel(
                "department",
                data?.departmentId?.toString() ?? ""
              ),
            },
          ].map((item, index) => (
            <button
              key={index}
              className="rounded-full bg-blue bg-opacity-10 text-blue text-center px-2 h-fit py-1  leading-4 font-semibold hover:opacity-90"
            >
              {item.label}
            </button>
          ))}

          {!isGuest && <EditProfile />}
        </div>
      </div>

      {/*  */}
      <div className="w-full bg-white text-dark-gray text-sm ion-padding-horizontal pb-3">
        <p className="text-black font-bold text-lg">{data?.username}</p>
        <p>@{data?.email}</p>
        <p className="text-black my-3">{data?.description}</p>
        <p className="flex items-center gap-2">
          <img src={cupcake} alt="birth" className="size-[18px] object-cover" />
          <span>
            Sinh nhật {getFormatDateString(data?.birthday ?? 0, true)}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <img
            src={calendar}
            alt="birth"
            className="size-[18px] object-cover"
          />
          <span>Tham gia {getFormatDateString(data?.createAt ?? 0, true)}</span>
        </p>
      </div>

      {/*  */}
      <ProfileTabs data={data} />
    </div>
  );
};

export default ProfileInfo;
