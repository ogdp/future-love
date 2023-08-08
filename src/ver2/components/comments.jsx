import React, { useEffect, useState } from "react";
import girl from "./image/girl.jpg";
import useEventStore from "../../utils/store";
import axios from "axios";

function Comments() {
  const [data, setData] = useState([]);
  const setEvent = useEventStore((state) => state.setEvent);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;
  const [countCM, setCountCM] = useState(1);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://14.225.7.221:8989/lovehistory/pageComment/${countCM}`);
      setData(res.data.comment);
      setEvent(res.data);
      console.log(res);
      const ipAddress = data.dia_chi_ip; // Lấy địa chỉ IP từ dữ liệu response
      console.log(`Địa chỉ IP của bạn là: ${ipAddress}`);
    } catch (error) {
      console.log(error);
    }
  };

  const changeUp = () => {

    setCountCM(countCM + 1)
    fetchData()
  }
  const changeDown = () => {
    if (countCM > 1) {
      setCountCM(countCM - 1)
    }
    fetchData()
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const dataSort = data.sort((a, b) => {
    const dateA = new Date(a.thoi_gian_release);
    const dateB = new Date(b.thoi_gian_release);

    return dateB - dateA;
  });

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = dataSort.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(dataSort.length / resultsPerPage);

  return (
    <div className=" lg:w-[100vh] h-max bg-white rounded-[36px] mx-3 slab">
      <ul className="p-8 ">
        {currentResults.map((data, i) => (

          <li className="flex items-center py-4" key={i}>
            <div className="lg:w-[10%] w-[20%]">

              {data.avatar_user ?
                <img src={data.avatar_user} alt="" className="w-[60px] h-[60px] border border-3 rounded-[50%]" />
                :
                <img src={girl} alt="" className="w-[60px] h-[60px] border border-3 rounded-[50%]" />}
            </div>
            <div className="flex flex-col lg:w-[80%] w-[60%]">
              <span className="text-[18px] font-semibold">
                {data.user_name}
              </span>
              <span className="text-[16px]">
                {data.noi_dung_cmt}
              </span>
            </div>
            <div className="lg:w-[10%] w-[20%] text-[13px]">
              {data.thoi_gian_release}
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
        <button type="button" className="py-2 px-3 bg-[#ff9f9f] rounded hover:bg-[#ff9f9f8c]" onClick={() => changeDown()}>
          <svg fill="white" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" /><path d="M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z" /></svg>
        </button>
        <button type="button" className="mx-3 text-white font-medium py-2 px-4 rounded bg-red-700">{countCM}</button>
        <button type="button" className="py-2 px-3 bg-[#ff9f9f] rounded hover:bg-[#ff9f9f8c]" onClick={() => changeUp()}>
          <svg fill="white" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" /><path d="M9.293 8.707 12.586 12l-3.293 3.293 1.414 1.414L15.414 12l-4.707-4.707-1.414 1.414z" /></svg>
        </button>
      </div>
    </div>
  );
}

export default Comments;