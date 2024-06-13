import Avatar from "@/components/common/Avatar";
import Loading from "@/components/common/Layout/Loading";
import SubHeader from "@/components/common/Layout/SubHeader";
import useDebounce from "@/hooks/useDebounce";
import { selectSignedUser } from "@/redux/features/accountSlice";
import { useAppSelector } from "@/redux/hooks";
import { User } from "@/services/type";
import { userService } from "@/services/user.service";
import { IonContent, IonNavLink } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import MessageDetail from "./MessageDetail";
import { addDoc, collection, query, where } from "firebase/firestore";
import { db } from "@/libs/firebase/firebase.config";
import { useCollection } from "react-firebase-hooks/firestore";
import { Conversation } from "@/libs/firebase/messageType";
import { getRecipientEmail } from "@/utils";

const MessagePage: React.FC = () => {
  const signedUser = useAppSelector(selectSignedUser);

  const { data, isLoading } = useQuery<User[]>({
    queryKey: ["all_users"],
    queryFn: async () => {
      const res = await userService.getAll();
      return res;
    },
  });

  const dataExceptSignedUser = useMemo(() => {
    return data ? data.filter((user) => user?.uid !== signedUser?.uid) : [];
  }, [data, signedUser?.uid]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Conversation[]>([]);

  const queryGetConversationsForCurrentUser = query(
    collection(db, "conversations"),
    where("users", "array-contains", signedUser?.email)
  );
  const [conversationsSnapshot, __loading, __error] = useCollection(
    queryGetConversationsForCurrentUser
  );

  const isConversationAlreadyExists = (recipientEmail: string) =>
    conversationsSnapshot?.docs.find((conversation) =>
      (conversation.data() as Conversation).users.includes(recipientEmail)
    );

  useDebounce(
    () => {
      if (!signedUser) {
        return;
      }
      const conversations = conversationsSnapshot?.docs.map(
        (conversation) =>
          ({
            id: conversation.id,
            ...conversation.data(),
          } as Conversation)
      );

      const final: Conversation[] = [
        ...(conversations ?? []),
        ...dataExceptSignedUser
          .filter((item) => {
            if (isConversationAlreadyExists(item.email)) {
              return false;
            }
            return true;
          })
          .map((item) => {
            return {
              id: "",
              users: [signedUser.email, item.email],
            };
          }),
      ];

      setFilter(
        final?.filter((item) => {
          if (!search) {
            return true;
          }

          const recipient = getRecipientEmail(item.users, signedUser);
          if (recipient?.toLowerCase().includes(search.toLowerCase())) {
            return true;
          }
          return false;
        }) ?? []
      );
    },
    [dataExceptSignedUser, conversationsSnapshot, search, signedUser],
    800
  );
  return (
    <>
      <SubHeader title="Tin nhắn" />
      <IonContent class="ion-padding-horizontal">
        <div className="py-2">
          <div className="bg-extra-light-gray flex items-center rounded-full px-4 py-3 gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#657786"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>

            <input
              placeholder="Tìm kiếm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm font-normal"
            />
          </div>

          {isLoading || __loading ? (
            <div className="w-full py-3 flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <div className="w-full">
              {filter.map((item, index) => {
                const recipient = getRecipientEmail(item.users, signedUser);
                const user = data?.find((user) => user?.email === recipient);
                return (
                  <IonNavLink
                    key={index}
                    routerDirection="forward"
                    component={() => (
                      <MessageDetail conversation={item} recipient={user} />
                    )}
                    onClick={async () => {
                      const createConversation = async (
                        recipientEmail: string
                      ) => {
                        if (!recipientEmail) return;

                        if (!isConversationAlreadyExists(recipientEmail)) {
                          await addDoc(collection(db, "conversations"), {
                            users: [signedUser?.email, recipientEmail],
                          });
                        }
                      };

                      if (
                        recipient &&
                        !isConversationAlreadyExists(recipient) &&
                        signedUser?.email
                      ) {
                        await createConversation(recipient);
                      }
                    }}
                    className="min-w-full block"
                  >
                    <button className="w-full">
                      <div className="w-full flex py-2 items-center border-b border-extra-light-gray">
                        <div>
                          <Avatar
                            src={user?.avatar ?? ""}
                            className="!size-[48px]"
                          />
                        </div>
                        <div className="w-[calc(100%-48px)] text-start pl-2 font-normal text-sm">
                          <p className="w-full truncate font-semibold">
                            {user?.username ?? ""}
                          </p>
                          <p className="w-full truncate text-xs ">
                            {user?.email ?? ""}
                          </p>
                        </div>
                      </div>
                    </button>
                  </IonNavLink>
                );
              })}
            </div>
          )}
        </div>
      </IonContent>
    </>
  );
};

export default MessagePage;
