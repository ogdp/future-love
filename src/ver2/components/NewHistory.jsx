import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NewHistory.scss";
import axios from "axios";
import FirstMeet from "./../page/app/FirstMeet";
import FirstDate from "../page/app/FirstDate";
import BeingInLove from "../page/app/BeingInLove";
import BreakingUp from "../page/app/BreakingUp";
import Marry from "../page/app/Marry";
import Divorce from "../page/app/Divorce";
import Remarry from "../page/app/Remarry";
import nam1 from "./image/nam1.png";
import nu1 from "./image/nu1.png";
import { useNavigate } from "react-router";

function NewHistory() {
  const [isActive, setIsActive] = useState(1);
  const [isScroll, setIsScroll] = useState(true);
  const [dataUser, setDataUser] = useState([]);
  const route = useNavigate();
  const redirect = (e, id) => {
    setIsActive(e);
    scrollToTop();
    // route.push(`/${id}`);
  };
  const user = JSON.parse(localStorage.getItem("user-info"));
  console.log(user);
  const idUser = user.id_user;
  console.log("====================================");
  console.log(idUser);
  console.log("====================================");
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const scrollThreshold =
      0.8 * (document.documentElement.scrollHeight - window.innerHeight);
    if (scrollY > scrollThreshold) {
      setIsActive((prevActive) => prevActive + 1);
      setIsScroll(false);
      scrollToTop();
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // useEffect(() => {
  //      window.addEventListener("scroll", handleScroll)
  //      return () => {
  //           window.removeEventListener("scroll", handleScroll);
  //      };
  // })

  // useEffect(() => {
  //      const enableScroll = () => {
  //           setIsScroll(true);
  //      };

  //      window.addEventListener("wheel", enableScroll);

  //      return () => {
  //           window.removeEventListener("wheel", enableScroll);
  //      };
  // }, []);

  const fetchDataUser = async () => {
    try {
      const response = await axios.get(
        `http://14.225.7.221:8989/lovehistory/${idUser}`
      );
      setDataUser(response.data.sukien[0]);
      console.log(response.data);
      // console.log(data)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchDataUser();
  }, []);

  return (
    <div
      className=""
      style={{ background: "linear-gradient(to right, pink, violet)" }}
    >
      <Header />

      <div className="grid grid-cols-12">
        <div className="lg:col-span-3 bg-menu">
          <div className=" lg:h-[30%] lg:w-[100%] flex items-center justify-center">
            <div
              style={{
                backgroundImage: `url(${nam1})`,
                backgroundSize: "cover",
                width: "150px",
                height: "150px",
                overflow: "hidden",
              }}
            >
              <img
                src={dataUser.link_nam_goc}
                alt=""
                className="lg:w-[80%] lg:h-[80%] object-cover rounded-[50%] lg:mt-[25px] lg:ml-[6px]"
              />
            </div>
            <div
              style={{
                backgroundImage: `url(${nu1})`,
                backgroundSize: "cover",
                width: "150px",
                height: "150px",
              }}
            >
              <img
                src={dataUser.link_nu_goc}
                alt=""
                className="lg:w-[80%] lg:h-[80%] object-cover rounded-[50%] lg:ml-[25px] lg:mt-[6px]"
              />
            </div>
          </div>
          <div className="slab text-[30px] font-bold text-[#FFFFFF]">
            <div className="">
              <ul className="py-10 flex flex-col gap-y-6">
                <li
                  className="cursor-pointer flex justify-center items-center py-10 px-36 rounded-3xl  hover:bg-[#782353] "
                  onClick={() => redirect(1)}
                >
                  First Meet
                </li>
                <li
                  className="cursor-pointer flex justify-center items-center py-10 px-36 rounded-3xl  hover:bg-[#782353] "
                  onClick={() => redirect(2)}
                >
                  First date
                </li>
                <li
                  className="cursor-pointer flex justify-center items-center py-10 px-36 rounded-3xl  hover:bg-[#782353] "
                  onClick={() => redirect(3)}
                >
                  Being in love
                </li>
                <li
                  className="cursor-pointer flex justify-center items-center py-10 px-36 rounded-3xl  hover:bg-[#782353] "
                  onClick={() => redirect(4)}
                >
                  Breking up
                </li>
                <li
                  className="cursor-pointer flex justify-center items-center py-10 px-36 rounded-3xl  hover:bg-[#782353] "
                  onClick={() => redirect(5)}
                >
                  Marry
                </li>
                <li
                  className="cursor-pointer flex justify-center items-center py-10 px-36 rounded-3xl  hover:bg-[#782353] "
                  onClick={() => redirect(6)}
                >
                  Divorce
                </li>
                <li
                  className="cursor-pointer flex justify-center items-center py-10 px-36 rounded-3xl  hover:bg-[#782353] "
                  onClick={() => redirect(7)}
                >
                  Remarry
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="lg:col-span-9 bg-D9D9D9 min-h-screen">
          {isActive === 1 ? <FirstMeet /> : ""}
          {isActive === 2 ? <FirstDate /> : ""}
          {isActive === 3 ? <BeingInLove /> : ""}
          {isActive === 4 ? <BreakingUp /> : ""}
          {isActive === 5 ? <Marry /> : ""}
          {isActive === 6 ? <Divorce /> : ""}
          {isActive === 7 ? <Remarry /> : ""}
        </div>
      </div>
    </div>
  );
}

export default NewHistory;
