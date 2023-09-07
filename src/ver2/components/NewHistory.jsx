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
import no_avatar from "./image/no-avatar.png";
import ImagePopup from "../page/app/ImagePopup";

export default function NewHistory() {
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const { id } = useParams();
  const route = useNavigate();
  const [idUser, setIdUser] = useState(0);
  const [dataUser, setDataUser] = useState(null);
  const [isActive, setIsActive] = useState(1);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const history = createBrowserHistory();
  const [dataComment, setDataComment] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const params = window.location.href;
  const arrayUrl = params.split("/");
  const stt_su_kien = arrayUrl[arrayUrl.length - 1];
  // Show cmt
  const [showMoreStates, setShowMoreStates] = useState({});
  const showCmt = (id) => {
    setShowMoreStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      history.push(`/detail/${id}/${newPage}`);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      history.push(`/detail/${id}/${newPage}`);
    }
  };

  //cuon trang
  const pagesToHandleScroll = [1, 2, 3, 4, 5, 6];
  const isMobileDevice = window.innerWidth <= 768; // Kích thước màn hình dưới 768px coi như là điện thoại

  useEffect(() => {
    fetchDataUser();

    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      setScrollPosition(currentScrollPosition);

      const isAtBottom =
        currentScrollPosition >=
        document.body.scrollHeight - window.innerHeight;
      const isAtTop = currentScrollPosition === 0;

      if (
        !isMobileDevice &&
        isAtBottom &&
        pagesToHandleScroll.includes(isActive)
      ) {
        const nextPage = isActive + 1;
        redirect(nextPage);
      }

      // if (!isMobileDevice && isAtTop && isActive > 1) {
      //   const previousPage = isActive - 1;
      //   redirect(previousPage);
      // } else if (!isMobileDevice && isAtTop && isActive === 1) {
      //   window.scrollTo(0, 1); // Ngăn chặn cuộn từ trang 1 thẳng đến trang 4
      // }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isActive, isMobileDevice]);

  useEffect(() => {
    axios
      .get(
        `http://14.225.7.221:8989/lovehistory/comment/${stt_su_kien}?id_toan_bo_su_kien=${id}`
      )
      .then((response) => {
        setDataComment(response.data.comment);
        console.log(response.data.comment);
      });
  }, [params]);

  const fetchDataUser = async () => {
    try {
      const response = await axios.get(
        `http://14.225.7.221:8989/lovehistory/${id}`
      );
      setDataUser(response.data.sukien[0]);
      setIdUser(response.data.sukien[0].user_name_tao_sk);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const redirect = (e) => {
    setIsActive(e);
    setIsOpenSidebar(false);
    const newUrl = `/detail/${id}/${e}`;
    history.replace(newUrl);
  };

  useEffect(() => {
    fetchDataUser();
    const currentTab = parseInt(stt_su_kien);
    setIsActive(currentTab);
  }, []);
  const handleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const handleOpenImagePopup = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImagePopupOpen(true);
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

  return (
    <>
      <div
        className=" min-h-screen overflow-hidden"
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
            className={`lg:col-span-3 z-[10] bg-menu lg:block ${
              isOpenSidebar
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
                  onClick={() => handleOpenImagePopup(dataUser.link_nam_goc)}
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
                  onClick={() => handleOpenImagePopup(dataUser.link_nu_goc)}
                />
              </div>
            </div>
            <div className=" lg:text-[26px] font-[Montserrat] mb-8 text-2xl flex justify-center font-bold text-[#FFFFFF]">
              Event creator:{idUser}
            </div>
            <div className="slab lg:text-[26px] text-2xl font-bold text-[#FFFFFF]">
              <div className=" flex justify-center">
                <ul className="flex flex-col gap-y-8 w-full ">
                  <li
                    className={`cursor-pointer flex justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2 ${
                      isActive === 1 ? "bg-[#782353] text-white" : ""
                    }`}
                    onClick={() => redirect(1)}
                  >
                    First Meet
                  </li>
                  <li
                    className={`cursor-pointer flex justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2 ${
                      isActive === 2 ? "bg-[#782353] text-white" : ""
                    }`}
                    onClick={() => redirect(2)}
                  >
                    First date
                  </li>
                  <li
                    className={`cursor-pointer flex justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2 ${
                      isActive === 3 ? "bg-[#782353] text-white" : ""
                    }`}
                    onClick={() => redirect(3)}
                  >
                    Being in love
                  </li>
                  <li
                    className={`cursor-pointer flex justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2 ${
                      isActive === 4 ? "bg-[#782353] text-white" : ""
                    }`}
                    onClick={() => redirect(4)}
                  >
                    Breking up
                  </li>
                  <li
                    className={`cursor-pointer flex justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2 ${
                      isActive === 5 ? "bg-[#782353] text-white" : ""
                    }`}
                    onClick={() => redirect(5)}
                  >
                    Marry
                  </li>
                  <li
                    className={`cursor-pointer flex justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2 ${
                      isActive === 6 ? "bg-[#782353] text-white" : ""
                    }`}
                    onClick={() => redirect(6)}
                  >
                    Divorce
                  </li>
                  <li
                    className={`cursor-pointer flex justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2 ${
                      isActive === 7 ? "bg-[#782353] text-white" : ""
                    }`}
                    onClick={() => redirect(7)}
                  >
                    Remarry
                  </li>
                  <li>
                    {/* mobile search */}
                    {/* <div className="flex gap-x-4 mx-4 items-center py-3 px-4  lg:hidden  border rounded-full bg-white">
                      <i className="fa fa-search lg:text-4xl text-2xl text-black" />
                      <input
                        type="search"
                        placeholder="Search"
                        className="placeholder:text-xl border-none outline-none w-full h-full"
                      />
                    </div> */}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:col-span-9 col-span-12 bg-D9D9D9 min-h-screen">
            <div>
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
            </div>
            <div className="flex justify-between items-center lg:hidden">
              <div
                className={`cursor-pointer flex justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2 ${
                  isActive === 1 ? "bg-[#782353] text-white" : ""
                }`}
                onClick={() => redirect(1)}
              >
                First Meet
              </div>
              <div
                className={`cursor-pointer flex justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2 ${
                  isActive === 2 ? "bg-[#782353] text-white" : ""
                }`}
                onClick={() => redirect(2)}
              >
                First date
              </div>
              <div
                className={`cursor-pointer flex justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2 ${
                  isActive === 3 ? "bg-[#782353] text-white" : ""
                }`}
                onClick={() => redirect(3)}
              >
                Being in love
              </div>
              <div
                className={`cursor-pointer flex justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2 ${
                  isActive === 4 ? "bg-[#782353] text-white" : ""
                }`}
                onClick={() => redirect(4)}
              >
                Breking up
              </div>
              <div
                className={`cursor-pointer flex justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2 ${
                  isActive === 5 ? "bg-[#782353] text-white" : ""
                }`}
                onClick={() => redirect(5)}
              >
                Marry
              </div>
              <div
                className={`cursor-pointer flex justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2 ${
                  isActive === 6 ? "bg-[#782353] text-white" : ""
                }`}
                onClick={() => redirect(6)}
              >
                Divorce
              </div>
              <div
                className={`cursor-pointer flex justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2 ${
                  isActive === 7 ? "bg-[#782353] text-white" : ""
                }`}
                onClick={() => redirect(7)}
              >
                Remarry
              </div>
            </div>
            {/* <div style={{ justifyContent: "center" }} className="flex gap-x-2">
              <button
                // className="text-blue-700 cursor-pointer  lg:hidden "
                onClick={handlePreviousPage}
                disabled={currentPage === 1} // Disable nút Previous nếu đang ở trang đầu tiên
              >
                Previous
              </button>
              <button
                // className="text-blue-700 cursor-pointer  lg:hidden"
                onClick={handleNextPage}
                disabled={currentPage === totalPages} // Disable nút Next nếu đang ở trang cuối cùng
              >
                Next
              </button>
            </div> */}
            <div className="flex flex-col pt-10 mb-16 w-full font-[Montserrat] ">
              {dataComment.map((item, index) => {
                const isShowingFullText = showMoreStates[item.id_comment];
                if (index < 1) {
                  return (
                    <div className="flex flex-col gap-y-4 px-4 py-3 mx-4 border border-gray-400 rounded-md shadow-md hover:bg-gray-100">
                      <div className="flex items-center gap-x-4">
                        {item.avatar_user &&
                        item.avatar_user.startsWith("http") ? (
                          <img
                            src={item.avatar_user}
                            alt=""
                            className="w-16 h-16 rounded-full"
                          />
                        ) : (
                          <img
                            src={no_avatar}
                            alt=""
                            className="w-16 h-16 rounded-full"
                          />
                        )}
                        <div className="flex-grow">
                          <h3 className="text-3xl font-semibold">
                            {item.user_name ? item.user_name : "Guest"}
                          </h3>
                          <div className="text-2xl font-normal break-words">
                            <span
                              className={
                                isShowingFullText ? "text-base" : "text-xl"
                              }
                            >
                              {isShowingFullText
                                ? item.noi_dung_cmt
                                : `${item.noi_dung_cmt.substring(0, 260)}`}
                            </span>
                            {item.noi_dung_cmt.length > 256 && (
                              <span
                                className="text-base hover:underline cursor-pointer"
                                onClick={() => showCmt(item.id_comment)}
                                style={{ color: "blue" }}
                              >
                                {isShowingFullText ? "UnLess" : "Show more"}
                              </span>
                            )}
                          </div>
                          {item.imageattach && (
                            <img
                              src={item.imageattach}
                              className="w-[150px] h-[120px] mt-[10px] cursor-pointer"
                              alt="avt"
                              onClick={() =>
                                handleOpenImagePopup(item.imageattach)
                              }
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row justify-end gap-x-4">
                        <div className="text-lg text-gray-600">
                          {item.device_cmt}
                        </div>
                        <div className="text-lg text-gray-600">
                          {item.thoi_gian_release}
                        </div>
                        <div className="text-lg text-gray-600">
                          <p>{item.dia_chi_ip}</p>
                          <p>{item.location}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              {dataComment.length > 10 && (
                <div className="flex justify-center items-center mt-4 text-lg">
                  <span className="text-blue-700 cursor-pointer">
                    View all comments
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isImagePopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="max-w-screen-xl w-80% p-4 bg-white rounded-lg shadow-lg text-center relative">
            <button
              onClick={() => setIsImagePopupOpen(false)}
              className="mt-2 mr-2 px-2 py-1 bg-red-500 hover:bg-red-600 rounded-lg absolute top-0 right-0 text-sm text-white"
            >
              Close
            </button>
            <img
              src={selectedImage}
              alt="Ảnh lớn"
              className="w-100 h-auto mx-auto z-99999"
              style={{ maxHeight: "80vh" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
