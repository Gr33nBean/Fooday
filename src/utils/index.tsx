import { CommentProps } from "@/components/common/Comment";
import { EventProps } from "@/components/common/Event";
import { PostProps } from "@/components/common/Post";
import { RequestProps } from "@/components/common/Request";
import { ResourceUsingProps } from "@/components/common/ResourceUsing";
import { Conversation } from "@/libs/firebase/messageType";
import {
  Event,
  Post,
  PostComment,
  Request as RequestDataType,
  ResourceUsing,
  User,
} from "@/services/type";
import { GGFile, GGThumbnail } from "@/services/upload.service";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormatDateString(
  date: Date | number,
  hideHours = false,
  shorten = false
) {
  // format: hh:mm, dd Tháng mm, yyyy
  const temp: Date = new Date(
    typeof date == "number" ? date * 1000 : date.getTime()
  );
  let res: string = "";
  if (!hideHours) {
    res = `${temp.getHours().toString().padStart(2, "0")}:${temp
      .getMinutes()
      .toString()
      .padStart(2, "0")},`;
  }
  res += ` ${temp.getDate()}${shorten ? "/" : " Tháng "}${temp.getMonth() + 1}${
    shorten ? "/" : ", "
  }${temp.getFullYear()}`;

  return res;
}

export function getDateFromTimeStamp(timeStamp: number) {
  const date = new Date(timeStamp * 1000);
  return date;
}

export function convertDateToTimestamp(value: Date) {
  return Math.floor(value.getTime() / 1000);
}

export function getDistanceFromNow(timeStamp: number) {
  const date = new Date(timeStamp * 1000);
  const now = new Date();
  // distance in minutes
  const distance = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);
  if (distance < 60) {
    return `${distance} phút`;
  }
  if (distance < 60 * 24) {
    return `${Math.floor(distance / 60)} giờ`;
  }
  if (distance < 24 * 60 * 7) {
    return `${Math.floor(distance / (60 * 24))} ngày`;
  }
  if (distance < 24 * 60 * 7 * 4) {
    return `${Math.floor(distance / (60 * 24 * 7))} tuần`;
  }
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
}

export function mapPostToUIObject(post: Post): PostProps {
  const data: PostProps = {
    id: post.id,
    uid: post.creatorUid ?? "",
    userName: post.user?.username ?? "",
    createdAt: getDistanceFromNow(post.createAt), //post.createdAt,
    tag: post.postType?.id ?? "",
    name: post.title,
    content: post.content,
    imageUrls: post.images,
    tags: post.mentionUid,
    attachedFiles: post.files,
    avatar: post.user?.avatar ?? "",
    comments: post.comments,
    likes: post.likes,
  };

  return data;
}

export function mapEventToUIObject(event: Event): EventProps {
  const data: EventProps = {
    id: event.id,
    uid: event.reporterUid ?? "",
    userName: event.user?.username ?? "",
    createdAt: getDistanceFromNow(event.createAt ?? 0) ?? "",
    tag: event.eventType?.id ?? "",
    name: event.name,
    content: event.description,
    joinAmount: event.participantsUid?.length ?? 0,
    room: event.resource?.name ?? "",
    from: getFormatDateString(event.startAt, false, true),
    to: getFormatDateString(event.endAt, false, true),
    avatar: event.user?.avatar ?? "",
  };
  return data;
}

export function mapResourceUsingToUIObject(
  resource: ResourceUsing
): ResourceUsingProps {
  const data: ResourceUsingProps = {
    id: resource.id,
    uid: resource.borrowerUid ?? "",
    userName: resource.borrower?.username ?? "",
    createdAt: getDistanceFromNow(resource.createAt),
    tag: resource.resource?.resourceTypeId ?? "",
    name: "Mượn tài nguyên",
    resource: {
      name: resource.resource?.name ?? "",
      description: resource.resource?.description ?? "",
      images: resource.resource?.images ?? [""],
      resourceType: resource.resource?.resourceTypeId ?? "",
    },
    startAt: getDateFromTimeStamp(resource.startAt),
    endAt: getDateFromTimeStamp(resource.endAt),
    decidedAt: getDateFromTimeStamp(resource.decidedAt ?? 0),
    decisionDetail: resource.decisionDetail ?? "",
    approvalStatus: resource.approvalStatus,
    reporter: resource.reporter?.email.split("@")[0] ?? "",
    avatar: resource.borrower?.avatar ?? "",
  };

  return data;
}

export function mapCommentToUIObject(comment: PostComment): CommentProps {
  const data: CommentProps = {
    id: comment.id,
    userName: comment.user?.username ?? comment.userId,
    avatar: comment.user?.avatar ?? "",
    createdAt: getDistanceFromNow(comment.createAt),
    content: comment.content ?? "",
    imageUrls: comment.images ?? [""],
    attachedFiles: [],
  };

  return data;
}

export function mapRequestToUIObject(request: RequestDataType): RequestProps {
  const data: RequestProps = {
    id: request.id,
    uid: request.requesterUid ?? "",
    userName: request.requester?.username ?? "",
    avatar: request.requester?.avatar ?? "",
    createdAt: getDistanceFromNow(request.createAt),
    tag: request.requestTypeId ?? "",
    name: request.name,
    description: request.description,
    startAt: getDateFromTimeStamp(request.startAt),
    endAt: getDateFromTimeStamp(request.endAt),
    decidedAt: getDateFromTimeStamp(request.decidedAt ?? 0),
    decisionDetail: request.decisionDetail ?? "",
    approvalStatus: request.approvalStatus,
    reporter: request.reporter?.username ?? "",
  };
  return data;
}

export function getFileFromId(
  data: {
    fileName: string;
    id: string;
  }[],
  type = "image"
): { fileName: string; url: string }[] {
  return data.map((item) => ({
    fileName: item.fileName,
    url: (type === "image" ? GGThumbnail : GGFile) + item.id,
  }));
}

export function sortByTimestamp(a: number, b: number) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

export const getRecipientEmail = (
  conversationUsers: Conversation["users"],
  loggedInUser?: User | null
) => conversationUsers.find((userEmail) => userEmail !== loggedInUser?.email);
