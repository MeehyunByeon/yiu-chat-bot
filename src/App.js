import logo from "./logo.svg";
import "./App.css";

import {
  Router,
  Routes,
  Route,
  Link,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import ScrollToTop from "./scrollTop";

import Layout from "./pages/Layout/Layout";
import Main from "./pages/Main/Main";
import Main_Mobile from "./pages/Main/Main_Mobile";

function App() {
  // const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });
  // const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 });
  // const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  // const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 });
  // const isPortrait = useMediaQuery({ orientation: "portrait" });
  // const isRetina = useMediaQuery({ minResolution: "2dppx" });

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
  };
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    return isTablet ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };
  const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 });
    return isNotMobile ? children : null;
  };

  const showScreen = () => {
    return (
      <div>
        <Desktop mode="Desktop">
          <Main />
        </Desktop>
        <Tablet mode="Tablet">
          <Main />
        </Tablet>
        <Mobile mode="Mobile">
          <Main_Mobile />
        </Mobile>
        <Default mode="Not mobile">
          <Main />
          {/* Not mobile (desktop or laptop or tablet) */}
        </Default>
      </div>
    );
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        {/* <div className="App">
          <header className="App-header">
            <BrowserView>
              <h1> This is rendered only in browser </h1>
            </BrowserView>
            <MobileView>
              <h1> This is rendered only on mobile </h1>
            </MobileView>
          </header>
        </div> */}
        <Routes>
          <Route exact path="/*" element={<Main />} />
          {/* <Route exact path="/album" element={<Album />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
