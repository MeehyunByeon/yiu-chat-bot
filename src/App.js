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
import ScrollToTop from "./scrollTop";

import Layout from "./pages/Layout/Layout";
import Main from "./pages/Main/Main";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route exact path="/*" element={<Main />} />
          {/* <Route exact path="/album" element={<Album />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
