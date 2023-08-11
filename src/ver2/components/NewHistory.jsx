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
import { useParams, useNavigate } from "react-router";
import ReactLoading from "react-loading";

export default function NewHistory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState(null);
  const [isActive, setIsActive] = useState(1);
  const fetchDataUser = async () => {
    try {
      const response = await axios.get(
        `http://14.225.7.221:8989/lovehistory/${id}`
      );
      setDataUser(response.data.sukien[0]);
      // console.log(response.data);
      // console.log(data)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchDataUser();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const redirect = (e) => {
    setIsActive(e);
    scrollToTop();
  };
  const renderLoading = (isLoading) => {
    if (isLoading) {
      return (
        <div className="fixed top-0 min-w-[100%] h-[100vh] z-[999]">
          <div className="absolute top-0 min-w-[100%] h-[100vh] bg-black opacity-70 z-10"></div>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
            }}
            className="absolute -translate-x-2/4 opacity-100 -translate-y-2/4 left-2/4 top-2/4 z-20"
          >
            <ReactLoading type={"bars"} color={"#C0C0C0"} />
          </div>
        </div>
      );
    }
    return null;
  };
  const checkUser = () => {
    const user = JSON.parse(window.localStorage.getItem("user-info"));
    console.log(user);
    if (user == null) {
      alert("Đăng nhập để tiếp tục");
      return (window.location.href = "/login");
    }
  };
  if (dataUser == null) return <>{renderLoading(true)}</>;
  return (
    <>
      <div
        className=" min-h-screen"
        style={{ background: "linear-gradient(to right, pink, violet)" }}
      >
        <Header />

        <div className="flex">
          <div className="lg:w-[30%] bg-menu min-h-screen">
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
              <div className=" flex justify-center">
                <ul className="py-10">
                  <li
                    className="cursor-pointer flex justify-center items-center h-32"
                    onClick={() => redirect(1)}
                  >
                    <div className="hover:bg-[#782353] rounded-3xl py-2 px-36">
                      First Meet
                    </div>
                  </li>
                  <li
                    className="cursor-pointer flex justify-center items-center h-32"
                    onClick={() => redirect(2)}
                  >
                    <div className="hover:bg-[#782353] rounded-3xl py-2 px-36">
                      First date
                    </div>
                  </li>
                  <li
                    className="cursor-pointer flex justify-center items-center h-32"
                    onClick={() => redirect(3)}
                  >
                    <div className="hover:bg-[#782353] rounded-3xl py-2 px-36">
                      Being in love
                    </div>
                  </li>
                  <li
                    className="cursor-pointer flex justify-center items-center h-32"
                    onClick={() => redirect(4)}
                  >
                    <div className="hover:bg-[#782353] rounded-3xl py-2 px-36">
                      Breking up
                    </div>
                  </li>
                  <li
                    className="cursor-pointer flex justify-center items-center h-32"
                    onClick={() => redirect(5)}
                  >
                    <div className="hover:bg-[#782353] rounded-3xl py-2 px-36">
                      Marry
                    </div>
                  </li>
                  <li
                    className="cursor-pointer flex justify-center items-center h-32"
                    onClick={() => redirect(6)}
                  >
                    <div className="hover:bg-[#782353] rounded-3xl py-2 px-36">
                      Divorce
                    </div>
                  </li>
                  <li
                    className="cursor-pointer flex justify-center items-center h-32"
                    onClick={() => redirect(7)}
                  >
                    <div className="hover:bg-[#782353] rounded-3xl py-2 px-36">
                      Remarry
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:w-[70%] bg-D9D9D9 min-h-screen">
            {isActive === 1 ? (
              <aside onClick={() => checkUser()}>
                <FirstMeet />
              </aside>
            ) : (
              ""
            )}
            {isActive === 2 ? (
              <aside onClick={() => checkUser()}>
                <FirstDate />
              </aside>
            ) : (
              ""
            )}
            {isActive === 3 ? (
              <aside onClick={() => checkUser()}>
                <BeingInLove />
              </aside>
            ) : (
              ""
            )}
            {isActive === 4 ? (
              <aside onClick={() => checkUser()}>
                <BreakingUp />
              </aside>
            ) : (
              ""
            )}
            {isActive === 5 ? (
              <aside onClick={() => checkUser()}>
                <Marry />
              </aside>
            ) : (
              ""
            )}
            {isActive === 6 ? (
              <aside onClick={() => checkUser()}>
                <Divorce />
              </aside>
            ) : (
              ""
            )}
            {isActive === 7 ? (
              <aside onClick={() => checkUser()}>
                <Remarry />
              </aside>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
