import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC, HTMLAttributes, useRef, useState } from "react";
import { styled } from "styled-components";

// import Swiper core and required modules
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import { media, file, attachment } from "@assets/icons";

import BlogItem from "@/components/UI/Home/Blog/BlogItem";
import { mockUserAvatar } from "@assets/images/home";
import { extractMentions } from "@/utils/home";
import { EventCard } from "@/components/UI/Home/Event/EventCard";
import { mockBlogs, mockEvents } from "@/mock";
import { Event } from "@/types/home/Event";

const Divider = ({ spacing, color }: { spacing: number; color: string }) => {
  return (
    <div className={`py-[${spacing}]`}>
      <div className={`h-[1px] bg-[${color}]`}></div>
    </div>
  );
};

const NewFeedActionButton: FC<
  HTMLAttributes<HTMLButtonElement> & { icon: string; text: string }
> = ({ icon, text, ...props }) => {
  return (
    <button
      {...props}
      className="flex justify-center items-center gap-2 rounded py-1 px-2 transition-colors  active:bg-blue-100"
    >
      <img src={icon} alt="icon" />
      <IonText color="medium">
        <p className="text-sm font-bold">{text}</p>
      </IonText>
    </button>
  );
};

const NewFeedCard: FC<{ buttons?: JSX.Element[] }> = ({ buttons }) => {
  return (
    <div className="rounded-[10px] px-[20px] py-[16px] bg-[#0779B80D]">
      <div className="flex gap-4">
        <img
          alt="Silhouette of a person's head"
          src={mockUserAvatar}
          className="aspect-square w-[40px] h-[40px] object-cover rounded-full"
        />
        <textarea
          placeholder="Chia sẻ ngay"
          rows={2}
          className="w-full p-1 bg-transparent "
        />
      </div>
      <Divider spacing={3} color="#E1E8ED" />
      <div className="flex items-center justify-center gap-8 pt-4">
        {...buttons ?? []}
      </div>
    </div>
  );
};

const NoScrollBarIonSegment = styled(IonSegment)`
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

const CustomIonSegmentButton = styled(IonSegmentButton)`
  text-transform: none;
  --color-i-want: #14171a;
  --color: var(--ion-color-medium);
  --color-checked: var(--color-i-want);
  --indicator-color: var(--color-i-want);
`;

const Blogs: FC<{
  blogs: typeof mockBlogs;
  render: (blog: (typeof mockBlogs)[0]) => JSX.Element;
  seperator: JSX.Element;
}> = ({ blogs, render, seperator }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          {render(blog)}
          {seperator}
        </div>
      ))}
    </div>
  );
};

const mentions = [
  "vhng",
  "trhph",
  "trtrith",
  "mhieung",
  "ltphq",
  "tthinhh",
  "hmaidg",
];

enum Segment {
  All,
  Event,
  Sharing,
  Communiation,
}

const SegmentTabs = {
  All: ({
    blogs,
    mentionInfo,
  }: {
    blogs: typeof mockBlogs;
    mentionInfo: ReturnType<typeof extractMentions<string>>;
  }) => (
    <SwiperSlide>
      <Blogs
        blogs={blogs}
        render={(blog) => (
          <div className="ion-padding-horizontal py-4">
            <BlogItem
              blog={blog}
              leftColumn={
                <BlogItem.LeftColumn avatar={blog.publisher.avatar} />
              }
              metaBar={
                <BlogItem.MetaBar
                  username={blog.publisher.userName}
                  createdAt={blog.createdAt}
                />
              }
              typeIndicator={
                <BlogItem.TypeIndicator>Sharing</BlogItem.TypeIndicator>
              }
              title={<BlogItem.Title>Hello, it's great</BlogItem.Title>}
              body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, earum quaerat recusandae est sed iure, ipsam atque nesciunt labore adipisci doloribus, soluta quam aut cupiditate molestias! Voluptas, id omnis dolor est repellat quibusdam sit corporis odio minus ducimus sed pariatur natus libero, beatae aspernatur? Dolores dignissimos maiores nesciunt at eos."
              carousel={<BlogItem.Carousel images={blog.images} />}
              mentions={
                <BlogItem.Mentions
                  firstMentions={mentionInfo.firstMentions}
                  restMentionsCount={mentionInfo.restMentionsCount}
                />
              }
              attachments={
                <BlogItem.Attachments icon={attachment} fileCount={3} />
              }
            />
          </div>
        )}
        seperator={<div className="h-[1px] bg-[#E1E8ED]"></div>}
      />
    </SwiperSlide>
  ),
  Event: ({ events }: { events: Event[] }) => {
    return (
      <div className="ion-padding-horizontal py-4">
        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <EventCard event={event} />
          ))}
        </div>
      </div>
    );
  },
};

const Home: React.FC = () => {
  const [segment, setSegment] = useState(Segment.All);
  const swiperRef = useRef<SwiperRef>(null!);

  const extractedMentions = extractMentions(mentions);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="">Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* TODO: this is out of asset  */}
        <div className="ion-padding-horizontal">
          <NewFeedCard
            buttons={[
              <NewFeedActionButton icon={media} text={"Ảnh/video"} />,
              <NewFeedActionButton icon={file} text={"Đính kèm"} />,
            ]}
          />
        </div>

        <div className="ion-padding-horizontal">
          <NoScrollBarIonSegment
            scrollable
            value={segment}
            mode="md"
            onIonChange={(event) => {
              const newSegment = event.detail.value as Segment;
              swiperRef.current.swiper.slideTo(newSegment);
              setSegment(newSegment);
            }}
          >
            <CustomIonSegmentButton value={Segment.All}>
              <IonLabel>Tất cả</IonLabel>
            </CustomIonSegmentButton>
            <CustomIonSegmentButton value={Segment.Event}>
              <IonLabel>Sự kiện</IonLabel>
            </CustomIonSegmentButton>
            <CustomIonSegmentButton value={Segment.Sharing}>
              <IonLabel>Sharing</IonLabel>
            </CustomIonSegmentButton>
            <CustomIonSegmentButton value={Segment.Communiation}>
              <IonLabel>Truyền thông</IonLabel>
            </CustomIonSegmentButton>
          </NoScrollBarIonSegment>
        </div>

        <Swiper
          ref={swiperRef}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={(swiper) => {
            if (swiper.activeIndex !== segment) {
              setSegment(swiper.activeIndex as Segment);
            }
          }}
          // onSwiper={(swiper) => { console.log()}}
        >
          <SwiperSlide>
            {SegmentTabs.All({
              blogs: mockBlogs,
              mentionInfo: extractedMentions,
            })}
          </SwiperSlide>
          <SwiperSlide>{SegmentTabs.Event({ events: mockEvents })}</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>

        <div className="mt-4"></div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
