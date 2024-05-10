import { IonIcon, IonText } from "@ionic/react";
import { FC } from "react";

export type BlogAttachmentsProps = {
  icon: string;
  fileCount: number;
};

const BlogAttachments: FC<BlogAttachmentsProps> = ({ icon, fileCount }) => {
  return (
    <div className="flex items-center gap-1">
      <IonIcon icon={icon} color="primary" className="text-xl" />
      <IonText
        color="primary"
        className="font-bold transition-colors active:text-secondary"
      >
        <p>{fileCount} file đính kèm</p>
      </IonText>
    </div>
  );
};

export default BlogAttachments;
