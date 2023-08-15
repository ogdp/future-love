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
import FirstMeet from "./ver2/page/app/FirstMeet";
import FirstDate from "./ver2/page/app/FirstDate";
import BeingInLove from "./ver2/page/app/BeingInLove";
import BreakingUp from "./ver2/page/app/BreakingUp";
import Marry from "./ver2/page/app/Marry";
import Remarry from "./ver2/page/app/Remarry";
import Divorce from "./ver2/page/app/Divorce";
function App() {
  const user = window.localStorage.getItem("user-info");
  if (!user)
    return (
      <Routes>
        <Route path="" element={<LayoutGuest />}>
          <Route index element={<Historyv2 />} />
          <Route path="home" element={<Historyv2 />} />
          <Route path="love" element={<Home />} />
          <Route path="detail/:id" element={<NewHistory />} />
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
        <Route path="detail/:id" element={<NewHistory />}>
          <Route path="1" element={<FirstMeet />} />
          <Route path="2" element={<FirstDate />} />
          <Route path="3" element={<BeingInLove />} />
          <Route path="4" element={<BreakingUp />} />
          <Route path="5" element={<Marry />} />
          <Route path="6" element={<Divorce />} />
          <Route path="7" element={<Remarry />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="user/:id" element={<ProfileGuest />} />
      </Route>
      <Route path="*" exact={true} element={<NotFound />} />
    </Routes>
  );
}

export default App;
