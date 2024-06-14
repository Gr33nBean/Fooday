import {
  IonApp,
  IonIcon,
  IonNav,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  iosTransitionAnimation,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Create from "./pages/Create";
import Home from "./pages/Home";
import Search from "./pages/Search";

import "tailwindcss/tailwind.css";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import "./theme/global.css";
import "./theme/tailwind.css";
import "./theme/variables.css";

import { useEffect, useState } from "react";
import { getTabFromHref, routes } from "./constants/tabBarIcon.constant";
import Account from "./pages/Account";
import RequestHistory from "./pages/RequestHistory";
import GlobalModal from "./components/common/GlobalModal";
import { setIsOpenCreateModal } from "./redux/features/globalModalSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  selectUid,
  setSignedUser,
  setUid,
} from "./redux/features/accountSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./libs/firebase/firebase.config";
import { userService } from "./services/user.service";
import Login from "./pages/Login";
import { useQuery } from "@tanstack/react-query";
import { User } from "./services/type";
import Loading from "./components/common/Layout/Loading";
import ViewImage from "./components/common/Dialog/ViewImage";
import ProcessLoading from "./components/common/Layout/Loading/ProcessLoading";
import Comment from "./components/common/Dialog/Create/Comment";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import SplashScreen from "./pages/SplashCreen";

setupIonicReact({
  rippleEffect: false,
  mode: "ios",
  navAnimation: iosTransitionAnimation,
});

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(
    getTabFromHref(window.location.pathname)
  );

  const dispatch = useAppDispatch();
  const uid = useAppSelector(selectUid);

  const { data, isLoading, isSuccess } = useQuery<User>({
    queryKey: ["signedUser", uid],

    queryFn: async () => {
      if (!uid) return undefined;
      const res = await userService.getUser([uid]);
      return res[0];
    },
  });

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      dispatch(setUid(user.uid));
    } else {
      dispatch(setUid(""));
    }
  });

  useEffect(() => {
    const setUserInDb = async (data: User) => {
      try {
        await setDoc(
          doc(db, "users", data?.email as string),
          {
            email: data?.email ?? "",
            lastSeen: serverTimestamp(),
            photoURL: data?.avatar ?? "",
          },
          { merge: true } // just update what is changed
        );
      } catch (error) {
        console.log("ERROR SETTING USER INFO IN DB", error);
      }
    };

    if (data && isSuccess) {
      dispatch(setSignedUser(data));
      setUserInDb(data);
    }
  }, [data, isSuccess]);

  const [isShowSplash, setIsShowSplash] = useState(true);
  useEffect(() => {
    if (uid) {
      setTimeout(() => {
        setIsShowSplash(false);
      }, 3000);
    } else {
      setIsShowSplash(true);
    }
  }, [uid]);

  return (
    <IonApp>
      {uid ? (
        <>
          <SplashScreen
            style={{
              opacity: isShowSplash ? 1 : 0,
              pointerEvents: isShowSplash ? "all" : "none",
            }}
          />
          {!isShowSplash && (
            <>
              <IonReactRouter>
                <IonNav
                  className="bg-transparent"
                  root={() => (
                    <>
                      <IonTabs>
                        <IonRouterOutlet className="bg-transparent">
                          {[
                            { href: routes.home.href, component: <Home /> },
                            { href: routes.search.href, component: <Search /> },
                            { href: routes.create.href, component: <Create /> },
                            {
                              href: routes.requestHistory.href,
                              component: <RequestHistory />,
                            },
                            {
                              href: routes.account.href,
                              component: <Account />,
                            },
                          ].map(({ href, component }, index) => (
                            <Route exact path={href} key={index}>
                              {component}
                            </Route>
                          ))}
                          <Route exact path="/">
                            <Redirect to={routes.home.tab} />
                          </Route>
                        </IonRouterOutlet>

                        <IonTabBar
                          slot="bottom"
                          color={"light"}
                          className={`h-[68px] transition-all duration-300`}
                          onIonTabsDidChange={(a: any) => {
                            const tab = a.detail.tab;
                            setCurrentTab(tab);
                          }}
                        >
                          {[routes.home, routes.search].map(
                            ({ tab, href, icon }, index) => (
                              <IonTabButton tab={tab} href={href} key={index}>
                                <IonIcon
                                  className={`size-[28px] rounded-md  p-[10px] transition-all duration-300 ${
                                    currentTab === tab
                                      ? "bg-blue bg-opacity-10 text-blue shadow-[0px_0px_3px_0px_#00000026]"
                                      : "text-dark-gray"
                                  }`}
                                  aria-hidden="true"
                                  icon={icon}
                                />
                              </IonTabButton>
                            )
                          )}

                          <IonTabButton>
                            <div
                              className="size-full flex items-center justify-center cursor-pointer"
                              onClick={() => {
                                dispatch(setIsOpenCreateModal(true));
                              }}
                            >
                              <IonIcon
                                className={`size-[28px] rounded-md  p-[10px] transition-all duration-300`}
                                aria-hidden="true"
                                icon={routes.create.icon}
                              />
                            </div>
                          </IonTabButton>

                          {[routes.requestHistory, routes.account].map(
                            ({ tab, href, icon }, index) => (
                              <IonTabButton tab={tab} href={href} key={index}>
                                <IonIcon
                                  className={`size-[28px] rounded-md  p-[10px] transition-all duration-300 ${
                                    currentTab === tab
                                      ? "bg-blue bg-opacity-10 text-blue shadow-[0px_0px_3px_0px_#00000026]"
                                      : "text-dark-gray"
                                  }`}
                                  aria-hidden="true"
                                  icon={icon}
                                />
                              </IonTabButton>
                            )
                          )}
                        </IonTabBar>
                      </IonTabs>
                    </>
                  )}
                ></IonNav>
              </IonReactRouter>
              <GlobalModal />
              <ViewImage />
              <ProcessLoading />
              <Comment />
            </>
          )}
        </>
      ) : (
        <>
          {isLoading ? (
            <div className="w-screen h-screen flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <Login />
          )}
        </>
      )}
    </IonApp>
  );
};

export default App;
