import { IonText } from "@ionic/react";
import { FC } from "react";

export type BlogAttachmentsProps = {
  icon: string;
  fileCount: number;
};

const BlogAttachments: FC<BlogAttachmentsProps> = ({ icon, fileCount }) => {
  return (
    <IonText
      color="primary"
      className="flex items-center gap-1 font-bold transition-colors active:text-secondary"
    >
      <img src={icon} alt="attachment icon" className="w-4 h-4" />
      <p>{fileCount} file đính kèm</p>
    </IonText>
  );
};

export default BlogAttachments;
