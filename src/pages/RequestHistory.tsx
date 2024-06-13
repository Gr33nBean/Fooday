import Calendar from "@/components/common/Calendar";
import { selectIsLoading } from "@/redux/features/dialogSlice";
import { useAppSelector } from "@/redux/hooks";
import { eventService } from "@/services/event.service";
import { Event as EventDataType } from "@/services/type";
import { mapEventToUIObject, sortByTimestamp } from "@/utils";
import { IonContent, IonPage } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import Event from "@/components/common/Event";
import Loading from "@/components/common/Layout/Loading";
import { selectSelectDate } from "@/redux/features/accountSlice";

const RequestHistory: React.FC = () => {
  const isLoading = useAppSelector(selectIsLoading);
  const {
    data,
    refetch,
    isFetching: isLoadingData,
  } = useQuery<EventDataType[]>({
    queryKey: ["all_events", !isLoading],
    queryFn: async () => {
      const res = await eventService.getAll();
      console.log("huy");

      if (res) {
        return res;
      } else {
        return [];
      }
    },
  });

  const selectDate = useAppSelector(selectSelectDate);

  const filterData = useMemo(() => {
    if (data) {
      return data
        .filter((event) => {
          const start = new Date(event.startAt * 1000);

          return (
            start.getDate() === selectDate.getDate() &&
            start.getMonth() + 1 === selectDate.getMonth() + 1 &&
            start.getFullYear() === selectDate.getFullYear()
          );
        })
        .sort((a, b) => sortByTimestamp(a.createAt, b.createAt));
    }
    return undefined;
  }, [data, selectDate]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="">
          <div className="w-full ion-padding flex items-center">
            <p className="w-full  text-xl font-extrabold ">Lịch trình</p>
            <button
              className="text-black"
              onClick={() => {
                refetch();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 16h5v5" />
              </svg>
            </button>
          </div>

          <Calendar data={data} />

          <div>
            {isLoadingData ? (
              <>
                <div className="w-full py-10">
                  <Loading />
                </div>
              </>
            ) : (
              <>
                {filterData?.map((item, index) => (
                  <Event key={index} {...mapEventToUIObject(item)} />
                ))}

                {filterData?.length == 0 && (
                  <p className="w-full text-center py-3 cursor-pointer text-dark-gray text-[18px] font-normal">
                    Không có sự kiện
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RequestHistory;
