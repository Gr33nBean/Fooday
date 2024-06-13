import Comment from "@/components/common/Comment";
import CreatePost from "@/components/common/CreatePost";
import Loading from "@/components/common/Layout/Loading";
import Post from "@/components/common/Post";
import {
  selectIsLoading,
  setIsOpenCreateComment,
} from "@/redux/features/dialogSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { commentService } from "@/services/comment.service";
import { postService } from "@/services/post.service";
import { PostComment, Post as PostDataType } from "@/services/type";
import {
  mapCommentToUIObject,
  mapPostToUIObject,
  sortByTimestamp,
} from "@/utils";
import { useQuery } from "@tanstack/react-query";
const PostDetail = ({ id }: { id: string }) => {
  const isJustCreateComment = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();
  const { data: detailData } = useQuery<PostDataType>({
    queryKey: [`post_detail_${id}`, !isJustCreateComment],
    queryFn: async () => {
      if (!id) {
        return undefined;
      }
      const res = await postService.getPostDetail([Number(id)]);
      return res[0];
    },
  });

  const { data: commentData } = useQuery<PostComment[]>({
    queryKey: [`all_comments`, !isJustCreateComment],
    queryFn: async () => {
      const res = await commentService.getAll();
      return res;
    },
    enabled: !!detailData,
  });

  return (
    <div className="w-full ">
      {detailData && commentData ? (
        <>
          <Post {...mapPostToUIObject(detailData)} isDetail={true} />

          <div
            className="cursor-pointer w-full"
            onClick={() => {
              dispatch(setIsOpenCreateComment(detailData.id));
            }}
          >
            <CreatePost
              placeholder="Đăng bình luận"
              buttonText="Bình luận"
              isComment={true}
            />
          </div>

          {commentData
            .filter((item) => item.postId === detailData.id)
            .sort((a, b) => sortByTimestamp(a.createAt, b.createAt))
            .map((item, index) => (
              <div key={index}>
                <Comment {...mapCommentToUIObject(item)} />
              </div>
            ))}
          {commentData.filter((item) => item.postId === detailData.id)
            .length === 0 && (
            <p className="text-center py-2 text-dark-gray">Chưa có bình luận</p>
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

export default PostDetail;
