import { db } from "@/libs/firebase/firebase.config";
import { AppUser, Conversation } from "@/libs/firebase/messageType";
import { User } from "@/services/type";
import { getRecipientEmail } from "@/utils";
import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export const useRecipient = (
  conversationUsers: Conversation["users"],
  signedUser?: User
) => {
  // get recipient email
  const recipientEmail = getRecipientEmail(conversationUsers, signedUser);

  // get recipient avatar
  const queryGetRecipient = query(
    collection(db, "users"),
    where("email", "==", recipientEmail)
  );
  const [recipientsSnapshot, __loading, __error] =
    useCollection(queryGetRecipient);

  // recipientSnapshot?.docs could be an empty array, leading to docs[0] being undefined
  // so we have to force "?" after docs[0] because there is no data() on "undefined"
  const recipient = recipientsSnapshot?.docs[0]?.data() as AppUser | undefined;

  return {
    recipient,
    recipientEmail,
  };
};
