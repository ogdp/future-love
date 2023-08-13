import React, { useState } from "react";
import { Link } from "react-router-dom";

const HistoryCommentList = ({ datas }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [actionCMT, setActionCMT] = useState({ status: false, value: 0 });
  const [count, setCount] = useState(1);
  const resultsPerPage = 10;

  if (!datas || datas.length == 0)
    return (
      <>
        <h2 className="text-center py-6">Không có dữ liệu</h2>
      </>
    );
  const dataSort = datas.sort((a, b) => {
    const dateA = new Date(a.thoi_gian_release);
    const dateB = new Date(b.thoi_gian_release);
    return dateB - dateA;
  });

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = dataSort.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(dataSort.length / resultsPerPage);
  const changePageUp = () => {
    if (count < totalPages) {
      setCount(count + 1);
      setCurrentPage(count + 1);
      // fetchData();
    }
  };
  const changePageDown = () => {
    if (count > 1) {
      setCount(count - 1);
      setCurrentPage(count - 1);
      //   fetchData();
    }
  };

  //   console.log(datas);
  //   console.log(totalPages);
  console.log(currentResults);
  function getTime(time_core) {
    const providedTime = new Date(time_core); // Lưu ý: Tháng bắt đầu từ 0 (0 - 11)
    const currentTime = new Date();
    // Tính khoảng thời gian (tính bằng mili giây)
    const timeDifference = currentTime - providedTime;
    // Chuyển đổi khoảng thời gian từ mili giây sang phút
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    // Tính số ngày, giờ và phút
    const days = Math.floor(minutesDifference / (60 * 24));
    const hours = Math.floor((minutesDifference % (60 * 24)) / 60);
    const minutes = minutesDifference % 60;
    // Tạo kết quả dựa trên số ngày, giờ và phút
    let result = "";
    if (days > 0) {
      result = `${days} ngày`;
    } else if (hours > 0) {
      result = `${hours} giờ`;
    } else {
      result = `${minutes} phút`;
    }
    return result;
  }
  return (
    <>
      <div className="flex justify-center">
        <div className="lg:py-7 shadow-[rgba(0,0,0,0.05)_0px_6px_24px_0px,rgba(0,0,0,0.08)_0px_0px_0px_1px] my-16 lg:w-[1200px] w-[350px] mt-8 lg:mt-0 h-fit bg-white lg:rounded-[36px] max-lg:py-4 rounded-[10px] text-center font-[Montserrat] items-center content-center">
          {currentResults.map((item, index) => (
            <aside key={index} className="px-4">
              <div className="flex justify-between border-b border-[#ff000000] hover:border-gray-300 transition-all">
                <div className="max-lg: lg:max-w-[85%]">
                  <Link to={`/detail/${item.id_toan_bo_su_kien}/6`}>
                    <div className="flex py-2 lg:py-3">
                      <div className="lg:hidden">
                        <div className="w-[40px] h-[40px] bg-white overflow-hidden rounded-full">
                          <img
                            src={item.avatar_user}
                            alt="Avatar user notfound"
                            className="w-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="max-lg:hidden max-lg:w-[50px] max-lg:h-[50px] lg:w-[80px] lg:h-[80px] rounded-full overflow-hidden">
                        <img
                          src={item.avatar_user}
                          alt=""
                          className="w-full object-cover"
                        />
                      </div>
                      <div className="max-lg:pl-2 max-lg:pr-2 lg:ml-4 flex flex-col justify-center lg:gap-3 text-left">
                        <h2 className="line-clamp-1 max-lg:text-lg lg:text-2xl font-medium">
                          Bạn đã comment vào sự kiện của{" "}
                          <span className="underline">{item.user_name}</span>
                        </h2>
                        <h5 className="line-clamp-1 max-lg:text-sm text-base">
                          {item.noi_dung_cmt}
                        </h5>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="flex justify-center items-center max-lg:gap-2 lg:gap-3 lg:max-w-[15%]">
                  <span className="font-medium max-lg:text-base text-2xl text-gray-700">
                    {getTime(item.thoi_gian_release)}
                  </span>
                  <div className="relative">
                    <button
                      className="lg:text-[5px] max-lg:text-[3px] flex gap-1 py-3"
                      onClick={() =>
                        setActionCMT({
                          status: !actionCMT.status,
                          value: item.id_comment,
                        })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                      </svg>
                    </button>
                    {actionCMT.status && actionCMT.value == item.id_comment && (
                      <div className="shadow-[rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.06)_0px_1px_2px_0px] absolute mt-[140%] top-0 right-0 z-10 py-2 px-2 rounded-sm bg-slate-100 text-lg text-black">
                        <button className="py-1 px-3 hover:bg-blue-400 hover:text-white w-full">
                          Edit
                        </button>
                        <button className="py-1 px-3 hover:bg-red-400 hover:text-white">
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          ))}

          {/* <aside className="px-4">
            <div className="flex lg:justify-between border-b border-[#ff000000] hover:border-gray-300 transition-all">
              <div className="max-lg: lg:max-w-[85%]">
                <Link to="/">
                  <div className="flex py-2 lg:py-3">
                    <div className="lg:hidden">
                      <div className="w-[40px] h-[40px] bg-red-500 overflow-hidden rounded-full">
                        <img
                          src="https://images.unsplash.com/photo-1595350363780-74f91284c61a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                          alt=""
                          className="w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="max-lg:hidden max-lg:w-[50px] max-lg:h-[50px] lg:w-[80px] lg:h-[80px] rounded-full overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1595350363780-74f91284c61a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                        alt=""
                        className="w-full object-cover"
                      />
                    </div>
                    <div className="max-lg:pl-2 max-lg:pr-2 lg:ml-4 flex flex-col justify-center lg:gap-3 text-left">
                      <h2 className="line-clamp-1 max-lg:text-lg lg:text-2xl font-medium">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Veritatis repellendus exercitationem incidunt.
                      </h2>
                      <h5 className="line-clamp-1 max-lg:text-sm text-base">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Veritatis repellendus exercitationem incidunt.
                      </h5>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="flex justify-center items-center max-lg:gap-2 lg:gap-3 lg:max-w-[15%]">
                <span className="font-bold max-lg:text-base text-2xl">3m</span>
                <button className="lg:text-[5px] max-lg:text-[3px] flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                  </svg>
                </button>
              </div>
            </div>
          </aside> */}
        </div>
      </div>
      <div className="pagination text-4xl flex justify-center my-6">
        <button
          type="button"
          className="py-2 px-3 bg-[#ff9f9f] rounded hover:bg-[#ff9f9f8c]"
          onClick={() => changePageDown()}
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
          {count}
        </button>
        <button
          type="button"
          className="py-2 px-3 bg-[#ff9f9f] rounded hover:bg-[#ff9f9f8c]"
          onClick={() => changePageUp()}
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
    </>
  );
};

export default HistoryCommentList;
