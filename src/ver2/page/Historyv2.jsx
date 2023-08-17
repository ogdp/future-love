// import Header from "../components/Header";
import EventHistory from "../components/eventHistory";
import Comments from "../components/comments";
import axios from "axios";
import React, { useEffect, useState } from "react";
import img from "../components/image/Screenshot_1.png";
import { BsFillHeartFill } from "react-icons/bs";
import { SlMenu } from "react-icons/sl";
import useEvenStore from "../../utils/store";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Historyv2() {
  const [search_w, keyWord] = useState("");
  const [dataSearch, setDataSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const version = useEvenStore((state) => state.version);
  const setVersion = useEvenStore((state) => state.setVersion);
  const navigate = useNavigate();

  // function getOS() {
  //   const userAgent = window.navigator.userAgent;
  //   const platform = window.navigator.platform;
  //   const macPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
  //   const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
  //   const iosPlatforms = ["iPhone", "iPad", "iPod"];
    
  //   if (macPlatforms.includes(platform)) {
  //     return "Mac OS";
  //   } else if (iosPlatforms.includes(platform)) {
  //     return "IOS";
  //   } else if (windowsPlatforms.includes(platform)) {
  //     return "Windows";
  //   } else if (/Android/.test(userAgent)) {
  //     return "Android";
  //   } else if (/Linux/.test(platform)) {
  //     return "Linux";
  //   }
    
  //   return "Unknown";
  // }
  // const userOS = getOS();
  // console.log("User Operating System:", userOS);
  const platform = window.navigator.platform;
  console.log("User Operating System:", platform);



  const handleLogout = () => {
    localStorage.clear();
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const toggleVersion = () => {
    navigate("/love");
  };

  const onSearch = async () => {
    const params = {
      word: search_w,
    };
    await axios
      .get("http://61.28.226.120:8989/search", { params: params })
      .then((response) => {
        setDataSearch(response.data?.list_sukien[0]?.sukien);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    onSearch();
  }, []);
  return (
    <div
      className="Historyv2 flex flex-col min-h-screen"
      style={{
        background: "linear-gradient(to right, #F0A3BF, #A86ED4 )",
      }}
    >
      <Header />
      <b className="starborn text-white lg:text-5xl text-3xl ml-12 mb-3 mt-5">
        Events
      </b>
      <div className="lg:flex lg:mt-0">
        <div className="flex justify-center lg:w-[50%]">
          <EventHistory search={search_w} data={dataSearch} />
        </div>
        <div></div>
        <div className="flex justify-center lg:w-[50%]">
          <Comments />
        </div>
      </div>
    </div>
  );
}

export default Historyv2;
