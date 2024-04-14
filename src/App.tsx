import { Redirect, Route } from "react-router-dom";
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
import Home from "./pages/Home";
import Search from "./pages/Search";
import Create from "./pages/Create";

import "tailwindcss/tailwind.css";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Plan from "./pages/Plan";
import Account from "./pages/Account";
import {
  getIconString,
  tabBarIcon,
} from "./libs/constants/tabBarIcon.constant";

setupIonicReact({
  rippleEffect: false,
  mode: "md",
});

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            {[
              { path: "/home", component: <Home /> },
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

          <IonTabBar slot="bottom">
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
