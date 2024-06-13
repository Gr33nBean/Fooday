import MessagePage from "@/pages/Message";
import { IonHeader, IonNavLink, IonToolbar } from "@ionic/react";

const MainHeader = ({ refetch }: { refetch: () => void }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <div className="w-full ion-padding-horizontal py-2 flex items-center gap-2 font-extrabold text-blue text-sm">
          <p className="flex-1">Company</p>
          <button
            className="text-black"
            onClick={() => {
              refetch();
              console.log("hi");
            }}
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
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <IonNavLink
              routerDirection="forward"
              component={() => <MessagePage />}
            >
              <button className="rounded-full p-[6px] bg-blue bg-opacity-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#1da1f220"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
              </button>
            </IonNavLink>
          </div>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default MainHeader;
