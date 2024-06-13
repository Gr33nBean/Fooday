import {
  IonContent,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { styled } from "styled-components";

// import Swiper core and required modules
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import { media } from "@assets/icons";

import CreateNew from "@/components/UI/Home/CreateNew";
import { NewFeedActionButton } from "@/components/UI/Home/NewFeedActionButton";
import Event from "@/components/common/Event";
import MainHeader from "@/components/common/Layout/MainHeader";
import Post from "@/components/common/Post";
import { TABS } from "@/constants";
import { selectIsLoading } from "@/redux/features/dialogSlice";
import { useAppSelector } from "@/redux/hooks";
import { eventService } from "@/services/event.service";
import { postService } from "@/services/post.service";
import { postTypeService } from "@/services/postType.service";
import {
  Event as EventDataType,
  Post as PostDataType,
  PostType,
} from "@/services/type";
import {
  mapEventToUIObject,
  mapPostToUIObject,
  sortByTimestamp,
} from "@/utils";
import { useQuery } from "@tanstack/react-query";

import Loading from "@/components/common/Layout/Loading";

const Home: React.FC = () => {
  const swiperRef = useRef<SwiperRef>(null!);
  const isJustCreate = useAppSelector(selectIsLoading);

  const {
    data,
    refetch: refetchPostTypes,
    isFetching: isFetching1,
  } = useQuery<PostType[]>({
    queryKey: ["home_tabs"],
    queryFn: async () => {
      const res = await postTypeService.getAll();
      return res;
    },
  });

  const tabs = useMemo(() => {
    return [
      ...(data
        ?.map((item) => ({
          label: item.name,
          value: item.id,
        }))
        .filter((item) => item.value !== TABS.OTHER) ?? []),
      { label: "Khác", value: TABS.OTHER },
    ];
  }, [data]);
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].value);
  useEffect(() => {
    setSelectedTab(tabs[0].value);
  }, [tabs]);

  const {
    data: eventData,
    refetch: refetchEvents,
    isFetching: isFetching2,
  } = useQuery<EventDataType[]>({
    queryKey: ["all_events", !isJustCreate],
    queryFn: async () => {
      const res = await eventService.getAll();
      if (res) {
        return res;
      } else {
        return [];
      }
    },
    enabled: selectedTab === TABS.EVENT || !isJustCreate,
  });

  const {
    data: postData,
    refetch: refetchPosts,
    isFetching: isFetching3,
  } = useQuery<PostDataType[]>({
    queryKey: ["all_posts", !isJustCreate],
    queryFn: async () => {
      const res = await postService.getAll();
      if (res) {
        return res;
      } else {
        return [];
      }
    },
    enabled: selectedTab !== TABS.EVENT,
  });

  const refetch = () => {
    refetchEvents();
    refetchPosts();
    refetchPostTypes();
  };
  return (
    <IonPage>
      <MainHeader refetch={refetch} />
      <IonContent>
        <div className="ion-padding-horizontal mt-2">
          <CreateNew
            buttons={[<NewFeedActionButton icon={media} text={"Ảnh"} />]}
          />
        </div>
        <div className="ion-padding-horizontal sticky top-0 bg-white z-[10]">
          {!isFetching1 && (
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
          )}
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
                  {isFetching2 ? (
                    <div className="w-full py-10">
                      <Loading />
                    </div>
                  ) : (
                    <>
                      {eventData
                        ?.sort((a, b) =>
                          sortByTimestamp(a.createAt, b.createAt)
                        )
                        .map((item, index) => (
                          <Event key={index} {...mapEventToUIObject(item)} />
                        ))}

                      {eventData?.length == 0 && (
                        <p className="w-full text-center py-3 cursor-pointer text-dark-gray text-[18px] font-normal">
                          Không có sự kiện
                        </p>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  {isFetching3 ? (
                    <div className="w-full py-10">
                      <Loading />
                    </div>
                  ) : (
                    <>
                      {postData
                        ?.filter((item) => item.postTypeId === selectedTab)
                        .sort((a, b) => sortByTimestamp(a.createAt, b.createAt))
                        .map((item, index) => (
                          <Post key={index} {...mapPostToUIObject(item)} />
                        ))}
                      {postData?.filter(
                        (item) => item.postTypeId === selectedTab
                      ).length == 0 && (
                        <p className="w-full text-center py-3 cursor-pointer text-dark-gray text-[18px] font-normal">
                          Không có bài đăng
                        </p>
                      )}
                    </>
                  )}
                </>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="mt-4"></div>
      </IonContent>
    </IonPage>
  );
};

export default Home;

export const NoScrollBarIonSegment = styled(IonSegment)`
  /* Hide scrollbar in most browsers */
  overflow: hidden;

  /* For Webkit-based browsers like Chrome and Safari */
  ::-webkit-scrollbar {
    display: none;
  }

  /* For Firefox */
  scrollbar-width: none;

  /* For Internet Explorer and Edge */
  -ms-overflow-style: none;
`;

export const CustomIonSegmentButton = styled(IonSegmentButton)`
  text-transform: none;
  --color-i-want: #14171a;
  --color: var(--ion-color-medium);
  --color-checked: var(--color-i-want);
  --indicator-color: var(--color-i-want);
`;
