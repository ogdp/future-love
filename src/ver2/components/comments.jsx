import React, { useEffect, useState, useTransition } from "react";
import no_avatar from "./image/no-avatar.png";
import useEventStore from "../../utils/store";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useRef } from "react";

function Comments() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const setEvent = useEventStore((state) => state.setEvent);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 25;
  const [countCM, setCountCM] = useState(1);
  const navigate = useNavigate();
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const handleOpenImagePopup = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImagePopupOpen(true);
  };
  function wrapText(text, maxLineLength) {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach((word) => {
      if (word.length > maxLineLength) {
        const slicedWords = [];
        for (let i = 0; i < word.length; i += maxLineLength) {
          slicedWords.push(word.slice(i, i + maxLineLength));
        }
        slicedWords.forEach((slicedWord) => {
          if (currentLine.length + slicedWord.length + 1 <= maxLineLength) {
            currentLine += (currentLine.length > 0 ? " " : "") + slicedWord;
          } else {
            lines.push(currentLine);
            currentLine = slicedWord;
          }
        });
      } else if (currentLine.length + word.length + 1 <= maxLineLength) {
        currentLine += (currentLine.length > 0 ? " " : "") + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine.length > 0) {
      lines.push(currentLine);
    }

    return lines.join("\n");
  }
  const windowWidth = window.innerWidth;
  const maxLineLength = Math.floor(windowWidth * 0.025);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `http://14.225.7.221:8989/lovehistory/pageComment/${countCM}`
      );
      const comments = await res.data.comment;
      setData(res.data.comment);
      setEvent(res.data);
      console.log("====================================");
      console.log(res.data.comment);
      console.log("====================================");
      const ipAddress = comments.dia_chi_ip; // Lấy địa chỉ IP từ dữ liệu response
      console.log(`Địa chỉ IP của bạn là: ${ipAddress}`);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const changeUp = () => {
    if (countCM <= totalPages) {
      setCountCM(countCM + 1);
    }
  };

  const changeDown = () => {
    if (countCM > 1) {
      setCountCM(countCM - 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [countCM]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const dataSort = data.sort((a, b) => {
    const dateA = new Date(a.thoi_gian_release);
    const dateB = new Date(b.thoi_gian_release);

    return dateB - dateA;
  });
  const visitProfile = (idsk, so_thu_tu_su_kien) => {
    navigate(`/detail/${idsk}/${so_thu_tu_su_kien}`);
  };
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = dataSort.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(dataSort.length / resultsPerPage);

  // Show cmt
  const [showMoreStates, setShowMoreStates] = useState({});
  const showCmt = (id) => {
    setShowMoreStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (isLoading) {
    return (
      <div className=" text-center flex bg-white rounded-[36px] mx-3 slab h-max">
        Loading...
      </div>
    );
  }
  return (
    <div className="h-max bg-white rounded-[36px] mx-3 slab">
      <ul className="px-4 py-6">
        {currentResults.map((data, i) => {
          const isShowingFullText = showMoreStates[data.id_comment];
          return (
            <li
              className="flex justify-start py-4 gap-x-6 cursor-pointer"
              key={i}
            >
              <div className="w-[60px] h-[60px]">
                {data.avatar_user && data.avatar_user.startsWith("http") ? (
                  <Link
                    className="w-full h-full"
                    to={data.id_user === 0 ? "" : `/user/${data.id_user}`}
                  >
                    <img
                      src={data.avatar_user}
                      alt=""
                      className="w-full h-full border border-3 rounded-[50%] object-cover"
                    />
                  </Link>
                ) : (
                  <Link
                    className="w-full h-full"
                    to={data.id_user === 0 ? "" : `/user/${data.id_user}`}
                  >
                    <img
                      src={no_avatar}
                      alt=""
                      className="w-full h-full border border-3 rounded-full"
                    />
                  </Link>
                )}
              </div>
              <div className="flex flex-col gap-x-2 max-w-[60%] md:max-w-[75%]"
              onClick={() =>
                visitProfile(
                  data.id_toan_bo_su_kien,
                  data.so_thu_tu_su_kien
                )
              }>
                <span
                  className="lg:text-2xl text-lg font-semibold"

                >
                  {data.user_name ? data.user_name : "Guest"}
                </span>
                <span className={`lg:text-lg text-base mt-3`} >
                  {isShowingFullText
                    ? data.noi_dung_cmt
                    : `${data.noi_dung_cmt.substring(0, 260)}`}
                </span>
                {data.noi_dung_cmt.length > 256 && (
                  <span
                    className="text-lg hover:underline"
                    onClick={() => showCmt(data.id_comment)}
                    style={{ color: "blue" }}
                  >
                    {isShowingFullText ? "UnLess" : "Show more"}
                  </span>
                )}

                {data.imageattach ? (
                  <img
                    className="w-[60px] h-[60px]"
                    src={data.imageattach}
                    alt=""
                    onClick={() =>
                      visitProfile(
                        data.id_toan_bo_su_kien,
                        data.so_thu_tu_su_kien
                      )
                    }
                  />
                ) : (
                  ""
                )}
                <span className="lg:text-base text-sm">{data.device_cmt}</span>
              </div>
              <div className="ml-auto">
                <div className="lg:text-base text-sm ml-auto">
                  {data.thoi_gian_release}
                </div>
                <div className=" lg:text-base text-sm">
                  <p> {data.dia_chi_ip}</p>
                  <p> {data.location}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="pagination text-4xl flex justify-center my-6">
        <button
          type="button"
          className="py-2 px-3 bg-[#ff9f9f] rounded hover:bg-[#ff9f9f8c]"
          onClick={() => changeDown()}
        >
          <svg
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
            <path d="M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z" />
          </svg>
        </button>
        <button
          type="button"
          className="mx-3 text-white font-medium py-2 px-4 rounded bg-red-700"
        >
          {countCM}
        </button>
        <button
          type="button"
          className="py-2 px-3 bg-[#ff9f9f] rounded hover:bg-[#ff9f9f8c]"
          onClick={changeUp}
        >
          <svg
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
            <path d="M9.293 8.707 12.586 12l-3.293 3.293 1.414 1.414L15.414 12l-4.707-4.707-1.414 1.414z" />
          </svg>
        </button>
      </div>

    </div>

  );
}

export default Comments;
