import "./App.scss";
import About from "./container/About";
import "./container/tailwincss.css";
import SideBar from "./container/SideBar";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import React from "react";
import History from "./container/History";
import ViewResult from "./container/View";
import useEvenStore from "./utils/store";
import Historyv2 from "./ver2/page/Historyv2";
import Home from "./ver2/page/Home";
import View from "./ver2/page/viewv2";
import NewHistory from "./ver2/components/NewHistory";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Register from "./ver2/page/Register";
import Login from "./ver2/page/Login";
import Profile from "./ver2/components/Profile";
import "./ver2/css/index.css";
import LayoutGuest from "./ver2/layouts/LayoutGuest";
import LayoutUser from "./ver2/layouts/LayoutUser";
import NotFound from "./ver2/components/NotFound";
import ProfileGuest from "./ver2/components/ProfileGuest";
function App() {
  const user = window.localStorage.getItem("user-info");
  if (!user)
    return (
      <Routes>
        <Route path="" element={<LayoutGuest />}>
          <Route index element={<Historyv2 />} />
          <Route path="home" element={<Historyv2 />} />
          <Route path="love" element={<Home />} />
          <Route path="detail/:id/:userId" element={<NewHistory />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="user/:id" element={<ProfileGuest />} />
        </Route>
        <Route path="*" exact={true} element={<NotFound />} />
      </Routes>
    );

  return (
    <Routes>
      <Route path="" element={<LayoutUser />}>
        <Route index element={<Historyv2 />} />
        <Route path="home" element={<Historyv2 />} />
        <Route path="love" element={<Home />} />
        <Route path="detail/:id/:userId" element={<NewHistory />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="user/:id" element={<ProfileGuest />} />
      </Route>
      <Route path="*" exact={true} element={<NotFound />} />
    </Routes>
  );
}

export default App;
