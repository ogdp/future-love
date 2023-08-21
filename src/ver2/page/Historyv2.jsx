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

  const handleLogout = () => {
    localStorage.clear();
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const toggleVersion = () => {
    navigate("/love");
  };

  const onSearch = (value) => {
    if (value === "") {
      axios.get(
        `http://14.225.7.221:8989/lovehistory/page/1`
      ).then((response) => {
        setDataSearch(response.data.list_sukien);
      })
    }
    axios
      .get(`http://14.225.7.221:8989/search?word=${value}`)
      .then((response) => {
        setDataSearch(response.data.list_sukien);
      });
    // const params = {
    //   word: search_w,
    // };
    // await axios
    //   .get("http://14.225.7.221:8989/search", { params: params })
    //   .then((response) => {
    //     setDataSearch(response.data?.list_sukien[0]?.sukien);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };
  // useEffect(() => {
  //   onSearch();
  // }, []);
  return (
    <div
      className="Historyv2 flex flex-col min-h-screen"
      style={{
        background: "linear-gradient(to right, #F0A3BF, #A86ED4 )",
      }}
    >
      <Header onSearch={onSearch} />
      <b className="starborn text-white lg:text-5xl text-3xl ml-12 mb-3 mt-5">
        Events
      </b>
      <div className="grid xl:grid-cols-2 sm:grid-cols-1 mx-6 sm:mx-10 lg:mx-6 justify-center">
        <div className="flex justify-center">
          <EventHistory search={search_w} data={dataSearch} />
        </div>
        <div className="">
          <Comments />
        </div>
      </div>
    </div>
  );
}

export default Historyv2;
