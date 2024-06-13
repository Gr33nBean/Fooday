import ProfileInfo from "@/components/UI/Profile/ProfileInfo";
import Loading from "@/components/common/Layout/Loading";
import SubHeader from "@/components/common/Layout/SubHeader";
import { User } from "@/services/type";
import { userService } from "@/services/user.service";
import { IonContent } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";

const UserDetail = ({ uid }: { uid?: string }) => {
  const { data, isLoading } = useQuery<User | undefined>({
    queryKey: [uid],
    queryFn: async () => {
      if (uid) {
        const res = await userService.getUser([uid]);
        return res[0];
      } else {
        return undefined;
      }
    },
  });
  return (
    <>
      <SubHeader
        title={isLoading ? "Đang tìm kiếm" : data?.username ?? "Không tìm thấy"}
      />
      <IonContent fullscreen>
        {isLoading ? (
          <div className="w-full flex items-center justify-center py-3">
            <Loading />
          </div>
        ) : (
          <>{data && <ProfileInfo data={data} isGuest={true} />}</>
        )}
      </IonContent>
    </>
  );
};

export default UserDetail;
