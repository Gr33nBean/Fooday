import { selectSignedUser } from "@/redux/features/accountSlice";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect } from "react";
import Avatar from "../Avatar";
import Tag from "../Tag";
import MoreOptions, { MoreOptionsType } from "./MoreOptions";
import { Type, getColorFromType } from "@/constants/type";
import { IonNavLink } from "@ionic/react";
import UserDetail from "@/pages/UserDetail";
import OpenDetail from "@/pages/OpenDetail";

export type PostBaseType = {
  uid?: string;
  userName: string;
  createdAt?: string;
  typeTag?: Type;
  tag?: string;
  name?: string;
  joinAmount?: number;
  avatar?: string;
  type?: MoreOptionsType;
  id: number;
  isResource?: boolean;
};

const PostBase = ({
  userName,
  createdAt,
  tag,
  typeTag,
  name,
  children,
  joinAmount,
  openDetail,
  avatar,
  uid,
  type,
  id,
  isResource,
}: PostBaseType & { children: React.ReactNode; openDetail?: string }) => {
  const [color, setColor] = React.useState<string>("");
  useEffect(() => {
    setColor(getColorFromType(typeTag ?? "post"));
  }, [typeTag]);

  const signedUser = useAppSelector(selectSignedUser);
  return (
    <div
      className={`relative w-full flex items-start ion-padding-horizontal py-3 border-b-[0.5px] transition-all duration-150 ${
        openDetail ? "hover:bg-extra-extra-light-gray cursor-pointer" : ""
      }  border-extra-light-gray`}
    >
      <button
        className="z-[5] h-fit"
        disabled={isResource}
        style={{
          pointerEvents: isResource ? "none" : "all",
        }}
      >
        <IonNavLink
          routerDirection="forward"
          component={() => <UserDetail uid={uid} />}
        >
          <Avatar src={avatar} />
        </IonNavLink>
      </button>

      <div className={`w-[calc(100%-32px)] pl-2 flex flex-col gap-1 z-[5]`}>
        {/* Name and tag */}
        <div>
          <div className={`w-full flex items-center gap-3 text-xs`}>
            <button
              className={`font-semibold text-dark-gray text-start flex-1 cursor-pointer`}
              style={{
                pointerEvents: isResource ? "none" : "all",
              }}
              disabled={isResource}
            >
              <IonNavLink
                routerDirection="forward"
                component={() => <UserDetail uid={uid} />}
              >
                <span>{userName}</span>
              </IonNavLink>
            </button>

            <div className={`flex items-center gap-3`}>
              {createdAt && (
                <p className={`font-normal text-dark-gray`}>{createdAt}</p>
              )}

              {uid === signedUser?.uid && <MoreOptions type={type} id={id} />}
            </div>
          </div>

          <div className={`flex flex-1 text-sm items-center gap-1`}>
            {tag && <Tag text={tag} color={color} />}
            {name && (
              <button
                className={`font-semibold flex-1 text-start paragraph-overflow-ellipsis paragraph-overflow-ellipsis-1`}
                disabled={isResource || !openDetail}
                style={{
                  pointerEvents: isResource || !openDetail ? "none" : "all",
                }}
              >
                <IonNavLink
                  routerDirection="forward"
                  component={() => <OpenDetail openDetail={openDetail} />}
                >
                  <span>{name}</span>
                </IonNavLink>
              </button>
            )}

            <p
              className={`font-normal text-dark-gray`}
              style={{
                display: joinAmount && joinAmount > 0 ? "block" : "none",
              }}
            >
              {joinAmount} người tham gia
            </p>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default PostBase;
