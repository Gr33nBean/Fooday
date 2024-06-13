import Avatar from "@/components/common/Avatar";
import FileInput from "@/components/common/Input/File";
import Textarea from "@/components/common/Input/Textarea";
import Loading from "@/components/common/Layout/Loading";
import SubHeader from "@/components/common/Layout/SubHeader";
import { useRecipient } from "@/hooks/useRecipient";
import { db } from "@/libs/firebase/firebase.config";
import { Conversation, IMessage } from "@/libs/firebase/messageType";
import { selectSignedUser } from "@/redux/features/accountSlice";
import { useAppSelector } from "@/redux/hooks";
import { User } from "@/services/type";
import { getFormatDateString, sortByTimestamp } from "@/utils";
import {
  convertFirestoreTimestampToDate,
  transformMessage,
} from "@/utils/getMessagesInConversation";
import { IonContent, IonNavLink } from "@ionic/react";
import {
  addDoc,
  collection,
  doc,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { MouseEventHandler, useEffect, useMemo, useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import UserDetail from "./UserDetail";

const MessageDetail = ({
  conversation,
  recipient,
}: {
  conversation: Conversation;
  recipient?: User;
}) => {
  const signedUser = useAppSelector(selectSignedUser);
  const { recipient: recipientFB } = useRecipient(
    conversation.users,
    signedUser
  );

  const queryGetAllMessage = query(
    collection(db, "messages"),
    where("conversation_id", "==", conversation.id as string)
  );

  const [messagesSnapshot, __loading, __error] =
    useCollection(queryGetAllMessage);

  const allMessage: IMessage[] = useMemo(() => {
    if (!messagesSnapshot) return [];
    return messagesSnapshot.docs
      .map((message) => transformMessage(message))
      .sort(
        (a, b) => -1 * sortByTimestamp(a.sent_at.getTime(), b.sent_at.getTime())
      );
  }, [messagesSnapshot]);
  console.log(allMessage);

  const imageRef = useRef<any>(null);
  const [images, setImages] = useState<File[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const addMessageToDbAndUpdateLastSeen = async () => {
    // update last seen in 'users' collection
    await setDoc(
      doc(db, "users", signedUser?.email as string),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    ); // just update what is changed

    // add new message to 'messages' collection
    await addDoc(collection(db, "messages"), {
      conversation_id: conversation.id,
      sent_at: serverTimestamp(),
      text: newMessage,
      user: signedUser?.email,
    });

    // reset input field
    setNewMessage("");
  };

  const sendMessageOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (!newMessage) return;
    addMessageToDbAndUpdateLastSeen();
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessage, endOfMessagesRef]);

  return (
    <>
      <SubHeader title={recipient?.email ?? ""} />
      <IonContent className="">
        <div className="w-full h-full relative flex flex-col overflow-y-auto">
          {/* header */}
          <div className="w-full flex items-center border-b border-extra-light-gray ion-padding-horizontal sticky top-0 bg-white py-2 z-20">
            <div>
              <Avatar src={recipient?.avatar} className="!size-[46px]" />
            </div>
            <div className="w-[calc(100%-46px-24px)] px-3 text-sm  text-start font-normal">
              <p className="w-full truncate font-semibold">
                {recipient?.username ?? ""}
              </p>
              <p className="w-full truncate text-xs ">
                {recipientFB
                  ? getFormatDateString(
                      convertFirestoreTimestampToDate(recipientFB.lastSeen)
                    )
                  : ""}
              </p>
            </div>
            <button className="text-blue">
              <IonNavLink
                routerDirection="forward"
                component={() => <UserDetail uid={recipient?.uid} />}
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
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </IonNavLink>
            </button>
          </div>

          {/* content */}
          <div className="flex-1 ion-padding-horizontal">
            {__loading ? (
              <div className="w-full py-5 flex items-center justify-center">
                <Loading />
              </div>
            ) : (
              <div className="">
                {allMessage.map((message, index) => {
                  const isMine = signedUser?.email === message.user;
                  let time = getFormatDateString(message.sent_at, false, true);
                  let today = getFormatDateString(new Date(), true, true);
                  // check if sent_at is today
                  if (time.includes(today)) {
                    time = time.split(",")[0];
                  }
                  return (
                    <div
                      key={index}
                      className="w-full flex items-end pt-2 pb-1"
                      style={{
                        flexDirection: isMine ? "row-reverse" : "row",
                      }}
                    >
                      <div
                        className="max-w-[calc(80%)] flex items-end"
                        style={{
                          flexDirection: isMine ? "row-reverse" : "row",
                        }}
                      >
                        <div>
                          <Avatar
                            src={
                              isMine ? signedUser?.avatar : recipient?.avatar
                            }
                          />
                        </div>
                        <div className="w-[calc(100%-32px)] px-2">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: message.text,
                            }}
                            className="w-full bg-blue bg-opacity-10 p-2 px-3 rounded-md text-sm font-normal "
                            style={{
                              whiteSpace: "pre-line",
                            }}
                          />
                          <p
                            className="w-full text-xs font-medium text-dark-gray pt-[2px]"
                            style={{
                              textAlign: isMine ? "right" : "left",
                            }}
                          >
                            {time}
                          </p>
                        </div>
                      </div>
                      <div className="flex-1"></div>
                    </div>
                  );
                })}

                <div ref={endOfMessagesRef} className="w-full h-4"></div>
              </div>
            )}
          </div>

          {/* chat */}
          <div className="w-full py-2 bg-[#F0F7FE] ion-padding-horizontal border-t border-extra-light-gray flex items-center justify-center sticky bottom-0 z-20">
            {[
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1da1f2"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                ),
                onclick: () => {
                  if (imageRef.current) {
                    // click
                    imageRef.current.click();
                  }
                },
              },
            ].map((item, index) => (
              <button key={index} onClick={item.onclick} className="hidden">
                {item.icon}
              </button>
            ))}

            <div className="w-[calc(100%-24px)] ion-padding-horizontal ">
              <div className="pb-2">
                <FileInput
                  ref={imageRef}
                  files={images}
                  type="image"
                  handleChange={setImages}
                  isChat={true}
                />
              </div>

              <Textarea
                placeholder="Nhập tin nhắn..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={2}
                className="resize-none "
                labelClassName="!border-blue"
              />
            </div>

            <button
              className="text-blue"
              disabled={!newMessage}
              onClick={sendMessageOnClick}
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
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </div>
        </div>
      </IonContent>
    </>
  );
};

export default MessageDetail;
