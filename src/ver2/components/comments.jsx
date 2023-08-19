import React, { useEffect, useState, useTransition } from "react";
import no_avatar from "./image/no-avatar.png";
import useEventStore from "../../utils/store";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

function Comments() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const setEvent = useEventStore((state) => state.setEvent);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 25;
  const [countCM, setCountCM] = useState(1);
  const navigate = useNavigate();
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
  if (isLoading) {
    return (
      <div className="lg:w-[100vh] text-center flex bg-white rounded-[36px] mx-3 slab h-max">
        Loading...
      </div>
    );
  }
  return (
    <div className=" lg:w-full h-max bg-white rounded-[36px] mx-3 slab">
      <ul className="p-6 ">
        {currentResults.map((data, i) => (
          <li
            className="flex items-center py-4 gap-x-6 cursor-pointer"
            key={i}
            onClick={() =>
              visitProfile(data.id_toan_bo_su_kien, data.so_thu_tu_su_kien)
            }
          >
            <div className="">
              {data.avatar_user && data.avatar_user.startsWith("http") ? (
                <img
                  src={data.avatar_user}
                  alt=""
                  className="w-[60px] h-[60px] border border-3 rounded-[50%]"
                />
              ) : (
                <img
                  src={no_avatar}
                  alt=""
                  className="w-[60px] h-[60px] border border-3 rounded-[50%]"
                />
              )}
            </div>
            <div className="flex flex-col gap-x-2">
              <span className="lg:text-[18px] text-lg font-semibold">
                {data.user_name}
              </span>
              <span
                className="lg:text-[16px] text-base mt-3 max-w-[25vw] "
                style={{ whiteSpace: "pre-wrap" }}
              >
                {wrapText(data.noi_dung_cmt, maxLineLength)}
                {/* {data.noi_dung_cmt} */}
              </span>
              {data.imageattach ? (
                <img
                  className="w-[60px] h-[50px]"
                  src={data.imageattach}
                  alt=""
                />
              ) : (
                ""
              )}
              <span className="lg:text-base text-sm">{data.device_cmt}</span>
            </div>

            <div className="lg:text-[13px] text-sm ml-auto">
              {data.thoi_gian_release}
            </div>
            <div className="lg:w-[15%] w-[20%] lg:text-[13px] text-sm">
              <p> {data.dia_chi_ip}</p>
              <p> {data.location}</p>
            </div>
          </li>

          // <li className="flex flex-row w-full h-32 lg:justify-between justify-around" key={i}>
          //   {data.imageattach === null && data.imageattach === undefined && (
          //     <img src={data.avatar_user} alt="" className="w-20 h-20 rounded-[50%] " />
          //   )}

          //   <span className="text-[16px]"> {data.device_cmt}</span>
          //   <span className="text-[16px] max-w-xl">
          //     {data.noi_dung_cmt.length > 10
          //       ? data.noi_dung_cmt.slice(0, 50) + "..."
          //       : data.noi_dung_cmt}
          //   </span>
          //   <span className="text-[16px]">
          //     {data.dia_chi_ip.length > 15
          //       ? data.dia_chi_ip.slice(0, 15) + "..."
          //       : data.dia_chi_ip}
          //   </span>
          // </li>
        ))}

        {/* {[...Array(25)].map((_, index) => (
          <li className="flex flex-row w-full h-32 justify-between" key={index}>
            <img src={girl} alt="" className="w-20 h-20 rounded-[50%]" />
            <span className="text-[16px] max-w-xl">
              Love makes every moment brighter, warmer, and infinitel...
            </span>
            <span className="text-[16px]">1m</span>
          </li>
        ))} */}
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
