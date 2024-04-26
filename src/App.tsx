import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, useRouteMatch } from "react-router-dom";
import Create from "./pages/Create";
import Home, { mockBlogs } from "./pages/Home";
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
import "./theme/tailwind.css";
import "./theme/variables.css";

import { useState } from "react";
import { BlogCarousel } from "./components/UI/Home/Blog/BlogCarousel";
import { BlogDiet } from "./components/UI/Home/Blog/BlogDiet";
import BlogItem from "./components/UI/Home/Blog/BlogItem";
import { BlogLeftColumn } from "./components/UI/Home/Blog/BlogLeftColumn";
import { BlogMetaBar } from "./components/UI/Home/Blog/BlogMetaBar";
import {
  getIconString,
  tabBarIcon,
} from "./libs/constants/tabBarIcon.constant";
import Account from "./pages/Account";
import Plan from "./pages/Plan";

setupIonicReact({
  rippleEffect: false,
  mode: "ios",
});

const BlogDetail = () => {
  const match = useRouteMatch<{ id: string }>("/blog/:id");
  const foundBlog = mockBlogs.find((b) => b.blog.id === match?.params.id);

  if (!foundBlog) {
    return <p>Blog not found</p>;
  }

  const { blog, carousel, diet } = foundBlog;

  return (
    <>
      <BlogItem
        blog={blog}
        metaBar={
          <BlogMetaBar
            username={blog.userName}
            createdAt={blog.createdAt}
            avatar={blog.avatar}
          />
        }
        carousel={<BlogCarousel images={carousel.images} />}
        diet={<BlogDiet {...diet} />}
      />

      <div className="h-[1px] bg-gray-300"></div>

      <ul>
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <li>This is a comment</li>
          ))}
      </ul>
    </>
  );
};

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("home");

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab);
  };
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            {[
              { path: "/home", component: <Home /> },
              { path: "/blog/:id", component: <BlogDetail /> },
              { path: "/search", component: <Search /> },
              { path: "/create", component: <Create /> },
              { path: "/plan", component: <Plan /> },
              { path: "/account", component: <Account /> },
            ].map(({ path, component }, index) => (
              <Route exact path={path} key={index}>
                {component}
              </Route>
            ))}

            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom" color={"light"}>
            {[
              {
                tab: "home",
                href: "/home",
                icon: getIconString(tabBarIcon.home),
              },
              {
                tab: "search",
                href: "/search",
                icon: getIconString(tabBarIcon.search),
              },
              {
                tab: "create",
                href: "/create",
                icon: getIconString(tabBarIcon.create),
              },
              {
                tab: "plan",
                href: "/plan",
                icon: getIconString(tabBarIcon.plan),
              },
              {
                tab: "account",
                href: "/account",
                icon: getIconString(tabBarIcon.account),
              },
            ].map(({ tab, href, icon }, index) => (
              <IonTabButton tab={tab} href={href} key={index}>
                <IonIcon aria-hidden="true" icon={icon} />
              </IonTabButton>
            ))}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
