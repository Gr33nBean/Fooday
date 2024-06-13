import CreatePost from "@/components/common/CreatePost";
import Event from "@/components/common/Event";
import Loading from "@/components/common/Layout/Loading";
import Post from "@/components/common/Post";
import { selectIsLoading } from "@/redux/features/dialogSlice";
import { useAppSelector } from "@/redux/hooks";
import { eventService } from "@/services/event.service";
import { postService } from "@/services/post.service";
import { Event as EventDataType, Post as PostDataType } from "@/services/type";
import {
  mapEventToUIObject,
  mapPostToUIObject,
  sortByTimestamp,
} from "@/utils";
import { useQuery } from "@tanstack/react-query";

const EventDetail = ({ id }: { id: string }) => {
  const isJustCreateComment = useAppSelector(selectIsLoading);

  const { data: detailData } = useQuery<EventDataType>({
    queryKey: [`event_detail_${id}`, !isJustCreateComment],
    queryFn: async () => {
      if (!id) {
        return undefined;
      }
      const res = await eventService.getEventDetail([Number(id)]);
      return res[0];
    },
  });

  const { data: postData } = useQuery<PostDataType[]>({
    queryKey: ["all_posts", !isJustCreateComment],
    queryFn: async () => {
      const res = await postService.getAll();
      if (res) {
        return res;
      } else {
        return [];
      }
    },
    enabled: !!detailData,
  });

  return (
    <div className="w-full ">
      {detailData && postData ? (
        <>
          <Event {...mapEventToUIObject(detailData)} />

          <CreatePost isCreatePostInEvent={detailData.id} />
          {postData
            .filter((item) => item?.eventId === detailData.id)
            .sort((a, b) => sortByTimestamp(a.createAt, b.createAt))
            .map((item, index) => (
              <div key={index}>
                <Post {...mapPostToUIObject(item)} />
              </div>
            ))}

          {postData.filter((item) => item?.eventId === detailData.id).length ===
            0 && (
            <p className="text-center py-2 text-dark-gray">Chưa có bài đăng</p>
          )}
        </>
      ) : (
        <div className="w-full py-10">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default EventDetail;
