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
import noAvatar from "./image/no-avatar.png";
import { createBrowserHistory } from "history";
import CmtPopup from "../page/app/CmtPopup";
export default function NewHistory() {
  const { id } = useParams();
  const route = useNavigate();
  const [dataUser, setDataUser] = useState(null);
  const [isActive, setIsActive] = useState(1);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const history = createBrowserHistory();
  const [dataComment, setDataComment] = useState([])
  const params = window.location.href
  const arrayUrl = params.split("/")
  const stt_su_kien = arrayUrl[arrayUrl.length - 1]
  console.log(stt_su_kien);
  useEffect(() => {
    axios.get(`http://61.28.226.120:8989/lovehistory/comment/${stt_su_kien}?id_toan_bo_su_kien=${id}`).then((response) => {
      setDataComment(response.data.comment);
      console.log(response.data.comment);
    })
  }, [params])
  const fetchDataUser = async () => {
    try {
      const response = await axios.get(
        `http://61.28.226.120:8989/lovehistory/${id}`
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
    setIsOpenSidebar(false);
    console.log("====================================");
    console.log(id);
    console.log("====================================");
    history.replace({
      pathname: `/detail/${id}/${e}`,
    });
  };
  const handleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };
  const renderLoading = (isLoading) => {
    if (isLoading) {
      return (
        <div className="fixed top-0 min-w-[100%] h-[100vh] z-[99]">
          <div className="absolute top-0 min-w-[100%] h-[100vh] bg-black opacity-70"></div>
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
  // const checkUser = () => {
  //   const user = JSON.parse(window.localStorage.getItem("user-info"));
  //   console.log(user);
  //   if (user == null) {
  //     alert("Đăng nhập để tiếp tục");
  //     return (window.location.href = "/login");
  //   }
  // };
  // if (dataUser == null) return <>{renderLoading(true)}</>;
  return (
    <>
      <div
        className=" min-h-screen"
        style={{ background: "linear-gradient(to right, pink, violet)" }}
      >
        <Header onClick={handleSidebar} />

        <div className="grid grid-cols-12">
          {isOpenSidebar && (
            <div
              style={{
                position: "fixed",
                top: 100,
                right: 0,
                left: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
              className="lg:hidden block"
            />
          )}
          <div
            className={`lg:col-span-3 z-[999] bg-menu lg:block ${isOpenSidebar
              ? "col-span-8 sm:col-span-6 transition-all transform duration-300 ease-linear block opacity-100 absolute top-40 left-0 bottom-0 h-full"
              : "transition-all transform hidden duration-300 ease-out "
              }`}
          >
            <div className=" lg:h-[30%] lg:w-[100%] flex items-center justify-center mt-4">
              <div
                style={{
                  backgroundImage: `url(${nam1})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  overflow: "hidden",
                }}
                className="lg:w-[150px] lg:h-[150px] w-[90px] h-[90px] object-cover"
              >
                <img
                  src={dataUser?.link_nam_goc}
                  alt=""
                  className="lg:w-[80%] lg:h-[80%] w-[80%] h-[80%] object-cover  rounded-full lg:mt-[25px] lg:ml-[6px] mt-6 ml-2"
                />
              </div>
              <div
                style={{
                  backgroundImage: `url(${nu1})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  overflow: "hidden",
                }}
                className="lg:w-[150px] lg:h-[150px] w-[90px] h-[90px]"
              >
                <img
                  src={dataUser?.link_nu_goc}
                  alt=""
                  className="lg:w-[80%] lg:h-[80%] w-[80%] h-[80%] object-fill  rounded-full lg:mt-[25px] ml-6 mt-2 lg:ml-9"
                />
              </div>
            </div>
            <div className="slab lg:text-[26px] text-2xl font-bold text-[#FFFFFF]">
              <div className=" flex justify-center">
                <ul className="flex flex-col gap-y-8 w-full">
                  <li
                    className="cursor-pointer flex justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2"
                    onClick={() => redirect(1)}
                  >
                    First Meet
                  </li>
                  <li
                    className="cursor-pointer flex justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2"
                    onClick={() => redirect(2)}
                  >
                    First date
                  </li>
                  <li
                    className="cursor-pointer flex justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2"
                    onClick={() => redirect(3)}
                  >
                    Being in love
                  </li>
                  <li
                    className="cursor-pointer flex justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2"
                    onClick={() => redirect(4)}
                  >
                    Breking up
                  </li>
                  <li
                    className="cursor-pointer flex justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2"
                    onClick={() => redirect(5)}
                  >
                    Marry
                  </li>
                  <li
                    className="cursor-pointer flex justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2"
                    onClick={() => redirect(6)}
                  >
                    Divorce
                  </li>
                  <li
                    className="cursor-pointer flex justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2"
                    onClick={() => redirect(7)}
                  >
                    Remarry
                  </li>
                  <li>
                    {/* mobile search */}
                    <div className="flex gap-x-4 mx-4 items-center py-3 px-4  lg:hidden  border rounded-full bg-white">
                      <i className="fa fa-search lg:text-4xl text-2xl text-black" />
                      <input
                        type="search"
                        placeholder="Search"
                        className="placeholder:text-xl border-none outline-none w-full h-full"
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:col-span-9 col-span-12 bg-D9D9D9 min-h-screen">
            {isActive === 1 ? (
              <aside>
                <FirstMeet />
              </aside>
            ) : (
              ""
            )}
            {isActive === 2 ? (
              <aside>
                <FirstDate />
              </aside>
            ) : (
              ""
            )}
            {isActive === 3 ? (
              <aside>
                <BeingInLove />
              </aside>
            ) : (
              ""
            )}
            {isActive === 4 ? (
              <aside>
                <BreakingUp />
              </aside>
            ) : (
              ""
            )}
            {isActive === 5 ? (
              <aside>
                <Marry />
              </aside>
            ) : (
              ""
            )}
            {isActive === 6 ? (
              <aside>
                <Divorce />
              </aside>
            ) : (
              ""
            )}
            {isActive === 7 ? (
              <aside>
                <Remarry />
              </aside>
            ) : (
              ""
            )}
            <div className="mt-[-150px] ml-[50px] mb-5">
              {dataComment.map((item, index) => {
                if (index < 10) {
                  return <div className="flex mt-[30px]">
                    <img src={item.avatar_user} className="w-[50px] h-[50px] rounded-full"></img>
                    <div className="ml-10 w-[900px]">
                      <h3 className="text-3xl">{item.user_name}</h3>
                      <div className="mt-3 w-[700px] break-words">
                        {item.noi_dung_cmt}
                      </div>
                      {item.imageattach ? <img src={item.imageattach} className="w-[150px] h-[120px] mt-[10px]"></img> : ""}
                    </div>
                    <div className="float-right">
                      <p className="text-xl">{item.thoi_gian_release}</p>
                    </div>
                  </div>
                }
              })}
             {dataComment.length>0? <div className="flex justify-center items-center mt-[40px] text-2xl"><a href={`/detail/${id}/${stt_su_kien}`}>View all comment</a></div>:""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
