import { eventService } from "@/services/event.service";
import { IonLabel, IonNavLink, IonSearchbar } from "@ionic/react";
import { useEffect, useRef, useState } from "react";

import Avatar from "@/components/common/Avatar";
import Event from "@/components/common/Event";
import Loading from "@/components/common/Layout/Loading";
import Post from "@/components/common/Post";
import { TABS } from "@/constants";
import useDebounce from "@/hooks/useDebounce";
import { CustomIonSegmentButton, NoScrollBarIonSegment } from "@/pages/Home";
import UserDetail from "@/pages/UserDetail";
import { postService } from "@/services/post.service";
import {
  Event as EventDataType,
  Post as PostDataType,
  User,
} from "@/services/type";
import { userService } from "@/services/user.service";
import {
  mapEventToUIObject,
  mapPostToUIObject,
  sortByTimestamp,
} from "@/utils";
import { useQuery } from "@tanstack/react-query";
import "swiper/css";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

const tabs = [
  {
    label: "Bài đăng",
    value: TABS.POST,
  },
  {
    label: "Sự kiện",
    value: TABS.EVENT,
  },
];

const SearchContent = () => {
  const swiperRef = useRef<SwiperRef>(null!);

  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].value);
  useEffect(() => {
    setSelectedTab(tabs[0].value);
  }, [tabs]);

  const [search, setSearch] = useState("");
  const [enabled, setEnabled] = useState(false);

  const { data: eventData, isLoading: loading1 } = useQuery<EventDataType[]>({
    queryKey: ["search_events", search],
    queryFn: async () => {
      setEnabled(false);
      if (search === "") {
        return [];
      }
      const res = await eventService.getSearchEvent(search);
      console.log(res);
      if (res) {
        return res;
      } else {
        return [];
      }
    },
    enabled: enabled,
  });

  const { data: postData, isLoading: loading2 } = useQuery<PostDataType[]>({
    queryKey: ["search_posts", search],
    queryFn: async () => {
      setEnabled(false);
      if (search === "") {
        return [];
      }
      const res = await postService.getSearchPost(search);
      if (res) {
        return res;
      } else {
        return [];
      }
    },
    enabled: enabled,
  });

  const { data: userData, isLoading: loading3 } = useQuery<User[]>({
    queryKey: ["search_users", search],
    queryFn: async () => {
      setEnabled(false);
      if (search === "") {
        return [];
      }
      const res = await userService.getSearchUser(search);
      if (res) {
        return res;
      } else {
        return [];
      }
    },
    enabled: enabled,
  });
  console.log(userData);

  useDebounce(
    () => {
      setEnabled(true);
    },
    [search],
    800
  );

  return (
    <div className="">
      <p className="w-full bg-white ion-padding-vertical text-xl font-extrabold  ion-padding-horizontal">
        Tìm kiếm
      </p>
      <div className="w-full bg-white py-2 z-10 rounded-md overflow-hidden ion-padding-horizontal">
        <IonSearchbar
          placeholder="Tiềm kiếm"
          value={search}
          onIonChange={(e) => setSearch(e.detail.value ?? "")}
          className="!p-0 !min-h-fit text-sm"
        ></IonSearchbar>
      </div>

      {userData && userData.length > 0 && (
        <div className="ion-padding-horizontal pt-8 bg-white text-black ">
          <p className="w-full text-xl font-bold pb-2">Mọi người</p>

          {userData?.map((item, index) => {
            return (
              <div key={index} className="w-full max-w-full pt-[12px]">
                <div className="w-full flex  items-start">
                  <button className="z-[5] h-fit">
                    <IonNavLink
                      routerDirection="forward"
                      component={() => <UserDetail uid={item.uid} />}
                    >
                      <Avatar src={item.avatar} className="!size-[48px]" />
                    </IonNavLink>
                  </button>

                  <div
                    className={`w-[calc(100%-48px-137px)] px-2 z-[5] text-sm font-normal text-dark-gray`}
                  >
                    <button
                      className={`font-bold text-black  text-start flex-1 cursor-pointer`}
                    >
                      <IonNavLink
                        routerDirection="forward"
                        component={() => <UserDetail uid={item.uid} />}
                      >
                        <span>{item?.username}</span>
                      </IonNavLink>
                    </button>
                    <p className="w-full text-start  paragraph-overflow-ellipsis paragraph-overflow-ellipsis-2">
                      {item?.description}
                    </p>
                  </div>

                  <IonNavLink
                    routerDirection="forward"
                    component={() => <UserDetail uid={item.uid} />}
                  >
                    <button className="rounded-lg px-5 py-1 text-xs font-bold text-dark-gray bg-dark-gray bg-opacity-10">
                      Xem trang
                    </button>
                  </IonNavLink>
                </div>

                <div className=" ml-10 flex items-center gap-2 pb-4 pt-2 border-b border-solid border-extra-dark-gray">
                  <p className="font-manrope text-xs font-bold rounded-md bg-blue bg-opacity-10 text-blue py-[2px] px-[6px]">
                    {item.grade}
                  </p>
                  <p className="font-manrope text-xs font-bold rounded-md bg-blue bg-opacity-10 text-blue py-[2px] px-[6px]">
                    {item.departmentId}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {((postData && postData.length > 0) ||
        (eventData && eventData.length > 0)) && (
        <>
          <p className="w-full bg-white text-xl font-bold ion-padding-horizontal pt-8">
            Đăng tải
          </p>
          <div className="ion-padding-horizontal sticky top-0 bg-white z-[10]">
            <NoScrollBarIonSegment
              scrollable
              value={selectedTab}
              mode="md"
              onIonChange={(event) => {
                const newSegment = event.detail.value;
                const index = tabs.findIndex((tab) => tab.value === newSegment);
                swiperRef.current.swiper.slideTo(index);
                setSelectedTab(newSegment as string);
              }}
            >
              {tabs.map((tab, index) => (
                <CustomIonSegmentButton key={index} value={tab.value}>
                  <IonLabel>{tab.label}</IonLabel>
                </CustomIonSegmentButton>
              ))}
            </NoScrollBarIonSegment>
          </div>

          <Swiper
            ref={swiperRef}
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={(swiper) => {
              const currentTab = tabs[swiper.activeIndex].value;
              if (currentTab !== selectedTab) {
                setSelectedTab(currentTab);
              }
            }}
          >
            {tabs.map((tab, index) => (
              <SwiperSlide key={index}>
                {tab.value === TABS.EVENT ? (
                  <>
                    {eventData
                      ?.sort((a, b) => sortByTimestamp(a.createAt, b.createAt))
                      .map((item, index) => (
                        <Event key={index} {...mapEventToUIObject(item)} />
                      ))}

                    {eventData?.length == 0 && (
                      <p className="w-full text-center py-3 cursor-pointer text-dark-gray text-[18px] font-normal">
                        Không có sự kiện
                      </p>
                    )}

                    {!eventData && (
                      <div className="w-full py-10">
                        <Loading />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {postData
                      ?.sort((a, b) => sortByTimestamp(a.createAt, b.createAt))
                      .map((item, index) => (
                        <Post key={index} {...mapPostToUIObject(item)} />
                      ))}
                    {postData?.length == 0 && (
                      <p className="w-full text-center py-3 cursor-pointer text-dark-gray text-[18px] font-normal">
                        Không có bài đăng
                      </p>
                    )}
                    {!postData && (
                      <div className="w-full py-10">
                        <Loading />
                      </div>
                    )}
                  </>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}

      {loading1 || loading2 || loading3 ? (
        <div className="w-full py-10 flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <>
          {(!userData || userData.length == 0) &&
            (!postData || postData.length == 0) &&
            (!eventData || eventData.length == 0) &&
            search != "" && (
              <p className="w-full text-center py-3 cursor-pointer text-dark-gray text-[18px] font-normal">
                Không có kết quả
              </p>
            )}
        </>
      )}
    </div>
  );
};

export default SearchContent;
