import React, { useEffect, useState } from "react";
import girl from "./image/girl.jpg";
import { AiFillHeart } from "react-icons/ai";
import ReactLoading from "react-loading";
import { format } from "date-fns";
import Historyv2 from "../../ver2/page/Historyv2";
import { createBrowserHistory } from "history";
import "../css/Header.css";
import img1 from "../components/image/finish.png";
import img2 from "../components/image/12.png";
import bg1 from "../components/image/bg-1.png";
import bg2 from "../components/image/bg-2.png";
import vec1 from "../components/image/Vector1.png";
import vec2 from "../components/image/Vector2.png";

// import image1 from "../components/image/khung-vien-dep-33-removebg-preview.png"
// import image2 from "../components/image/khung-vien-dep-powerpoint_022258315.png"

function EventHistory(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const history = createBrowserHistory();
  const [count, setCount] = useState(1);
  const seenIds = {};

  const resultsPerPage = 8;

  // const images = [
  //   { url: image1, alt: 'Image 1' },
  //   { url: image2, alt: 'Image 2' },
  // ];

  // for (let i = 0; i < images.length; i++) {
  //   const image = images[i];
  //   // console.log(`Image URL: ${image.url}`);
  //   // console.log(`Image Alt: ${image.alt}`);
  // }

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://14.225.7.221:8989/lovehistory/page/${count}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      console.log(jsonData.list_sukien);
      // console.log("absjadaskdkahdkashdkjashdkjashdkashdkakdj")
      setData(jsonData.list_sukien);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const changePageUp = () => {
    if (count <= currentPage) {
    }
    setCount(count + 1);
    fetchData();
  };
  const changePageDown = () => {
    if (count > 1) {
      setCount(count - 1);
      fetchData();
    }
  };

  useEffect(() => {
    const loadingTypes = [
      "bars",
      "bubbles",
      "spinningBubbles",
      "spin",
      "cubes",
      "balls",
      "spokes",
      "cylon",
    ];
    fetchData();
    const randomIndex = Math.floor(Math.random() * loadingTypes.length);
    const randomType = loadingTypes[randomIndex];
    setLoadingType(randomType);
  }, []);

  const formatDateTime = (dateTime) => {
    return format(new Date(dateTime), "HH:mm:ss dd/MM/yyyy");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEventHistory = (idsk) => {
    history.push({
      pathname: `/detail/${idsk}`,
    });
    console.log(idsk);
    window.location.reload();
  };

  const sortedData = data.sort((a, b) => {
    const dateA = new Date(a.real_time);
    const dateB = new Date(b.real_time);
    return dateB - dateA;
  });

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = sortedData.slice(
    indexOfFirstResult,
    indexOfLastResult
    // images
  );

  const totalPages = Math.ceil(sortedData.length / resultsPerPage);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="loader-container">
          <ReactLoading type={loadingType} color="#000000" />
          <p className="mt-4 text-gray-500 text-3xl">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <div className="cursor-pointer">
        {props.data && props.search ? (
          <div>
            {props.data.map((array, index) => (

              <div
                onClick={() => handleEventHistory(array.sukien[array.sukien.length-1].id_toan_bo_su_kien)}
                key={index}
                className={`lg:w-[100vh] h-[230px] mx-3 lg:h-[380px] mb-4 border-8 border-pink-300  bg-white rounded-[36px]`}
              >
                {array.sukien[array.sukien.length-1].id_template === 1 && 4 ? (
                  <div
                    style={{ backgroundImage: `url(${bg1})` }}
                    className="bg-no-repeat lg:bg-contain bg-center lg:w-full lg:h-full"
                  >
                    <div className="grid grid-cols-2 ">
                      <div className="lg:w-[300px] flex flex-col justify-center lg:ml-28 ml-5 lg:mt-0 mt-20">
                        {/* image love */}
                        <span
                          key={array.sukien[array.sukien.length-1].id}
                          to={`/ array / ${array.sukien[array.sukien.length-1].id}`}
                          className="lg:text-[24px] starborn mb-4 leading-tight"
                        >
                          {array.sukien[array.sukien.length-1].ten_su_kien}
                        </span>
                        <p className="slab font-semibold lg:text-[16px]">
                          {array.sukien[array.sukien.length-1].noi_dung_su_kien}
                        </p>
                        <div className="my-4 slab font-semibold lg:text-[16px]">
                          <span
                            style={{ fontStyle: "normal", marginTop: 100 }}
                            className="text-time"
                          >
                            {array.sukien[array.sukien.length-1].real_time}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center mt-16">
                        {/* image swap */}
                        <div
                          style={{
                            backgroundImage: `url(${array.sukien[array.sukien.length-1].link_da_swap})`,
                          }}
                          className=" lg:w-[295px] w-[100px] h-[100px] lg:h-[295px] rounded-full bg-no-repeat bg-cover mt-1"
                        />
                        <div
                          style={{ backgroundImage: `url(${img1})` }}
                          className="absolute rounded-full bg-center bg-no-repeat bg-cover lg:w-[320px] w-[120px] h-[120px] lg:h-[320px]"
                        />
                      </div>
                    </div>
                    {/* first event */}
                  </div>
                ) : array.sukien[array.sukien.length-1].id_template === 2 ? (
                  <div
                    style={{ backgroundImage: `url(${bg2})` }}
                    className="bg-no-repeat bg-cover rounded-[29px] h-[214px] bg-center lg:w-full lg:h-full"
                  >
                    <div className="grid grid-cols-3">
                      <div className="flex justify-center items-center">
                        <div
                          style={{ backgroundImage: `url(${vec1})` }}
                          className="bg-no-repeat bg-cover lg:w-60 lg:h-60 w-32 h-32"
                        ></div>
                      </div>
                      <div className="flex flex-col justify-center items-center mt-12">
                        {/* image love */}
                        <span
                          key={array.sukien[array.sukien.length-1].id}
                          to={`/ array / ${array.sukien[array.sukien.length-1].id}`}
                          className="lg:text-[24px] starborn leading-tight mb-4"
                        >
                          {array.sukien[array.sukien.length-1].ten_su_kien}
                        </span>
                        <div className="box lg:h-52 h-36 mt-3">
                          <p className="slab font-semibold lg:text-[16px]">
                            {array.sukien[array.sukien.length-1].noi_dung_su_kien}
                          </p>
                        </div>

                        <div className="my-4 slab font-semibold lg:text-[16px]">
                          <span
                            style={{ fontStyle: "normal", marginTop: 100 }}
                            className="text-time"
                          >
                            {array.sukien[array.sukien.length-1].real_time}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <div
                          style={{ backgroundImage: `url(${vec2})` }}
                          className="bg-no-repeat bg-cover lg:w-60 lg:h-60 w-32 h-32"
                        ></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{ backgroundImage: `url(${bg2})` }}
                    className="bg-no-repeat bg-cover rounded-[29px] h-[214px] bg-center lg:w-full lg:h-full"
                  >
                    <div className="flex flex-col justify-center items-center">
                      {/* image love */}
                      <div className=" lg:w-[370px] w-80 lg:mt-36 mt-16">
                        <span
                          key={array.sukien[array.sukien.length-1].id}
                          to={`/ array / ${array.sukien[array.sukien.length-1].id}`}
                          className="lg:text-[24px] starborn mb-4 leading-tight"
                        >
                          {array.sukien[array.sukien.length-1].ten_su_kien}
                        </span>
                        <div className="mt-3">
                          <p className="slab font-semibold lg:text-[16px]">
                            {array.sukien[array.sukien.length-1].noi_dung_su_kien}
                          </p>
                        </div>
                      </div>

                      <div className="my-4 slab font-semibold lg:text-[16px]">
                        <span
                          style={{ fontStyle: "normal", marginTop: 100 }}
                          className="text-time"
                        >
                          {array.sukien[array.sukien.length-1].real_time}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            ))}
          </div>
        ) : (
          <div>
            {currentResults.map((array, index) => (

              <div
                onClick={() => handleEventHistory(array.sukien[array.sukien.length-1].id_toan_bo_su_kien)}
                key={index}
                className={`lg:w-[100vh] h-[230px] mx-3 lg:h-[380px] mb-4 border-8 border-pink-300  bg-white rounded-[36px]`}
              >
                {array.sukien[array.sukien.length-1].id_template === 1 && 4 ? (
                  <div
                    style={{ backgroundImage: `url(${bg1})` }}
                    className="bg-no-repeat lg:bg-contain bg-center lg:w-full lg:h-full"
                  >
                    <div className="grid grid-cols-2 ">
                      <div className="lg:w-[300px] flex flex-col justify-center lg:ml-28 ml-5 lg:mt-0 mt-20">
                        {/* image love */}
                        <span
                          key={array.sukien[array.sukien.length-1].id}
                          to={`/ array / ${array.sukien[array.sukien.length-1].id}`}
                          className="lg:text-[24px] starborn mb-4 leading-tight"
                        >
                          {array.sukien[array.sukien.length-1].ten_su_kien}
                        </span>
                        <p className="slab font-semibold lg:text-[16px]">
                          {array.sukien[array.sukien.length-1].noi_dung_su_kien}
                        </p>
                        <div className="my-4 slab font-semibold lg:text-[16px]">
                          <span
                            style={{ fontStyle: "normal", marginTop: 100 }}
                            className="text-time"
                          >
                            {array.sukien[array.sukien.length-1].real_time}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center mt-16">
                        {/* image swap */}
                        <div
                          style={{
                            backgroundImage: `url(${array.sukien[array.sukien.length-1].link_da_swap})`,
                          }}
                          className=" lg:w-[295px] w-[100px] h-[100px] lg:h-[295px] rounded-full bg-no-repeat bg-cover mt-1"
                        />
                        <div
                          style={{ backgroundImage: `url(${img1})` }}
                          className="absolute rounded-full bg-center bg-no-repeat bg-cover lg:w-[320px] w-[120px] h-[120px] lg:h-[320px]"
                        />
                      </div>
                    </div>
                    {/* first event */}
                  </div>
                ) : array.sukien[array.sukien.length-1].id_template === 2 ? (
                  <div
                    style={{ backgroundImage: `url(${bg2})` }}
                    className="bg-no-repeat bg-cover rounded-[29px] h-[214px] bg-center lg:w-full lg:h-full"
                  >
                    <div className="grid grid-cols-3">
                      <div className="flex justify-center items-center">
                        <div
                          style={{ backgroundImage: `url(${vec1})` }}
                          className="bg-no-repeat bg-cover lg:w-60 lg:h-60 w-32 h-32"
                        ></div>
                      </div>
                      <div className="flex flex-col justify-center items-center mt-12">
                        {/* image love */}
                        <span
                          key={array.sukien[array.sukien.length-1].id}
                          to={`/ array / ${array.sukien[array.sukien.length-1].id}`}
                          className="lg:text-[24px] starborn leading-tight mb-4"
                        >
                          {array.sukien[array.sukien.length-1].ten_su_kien}
                        </span>
                        <div className="box lg:h-52 h-36 mt-3">
                          <p className="slab font-semibold lg:text-[16px]">
                            {array.sukien[array.sukien.length-1].noi_dung_su_kien}
                          </p>
                        </div>

                        <div className="my-4 slab font-semibold lg:text-[16px]">
                          <span
                            style={{ fontStyle: "normal", marginTop: 100 }}
                            className="text-time"
                          >
                            {array.sukien[array.sukien.length-1].real_time}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <div
                          style={{ backgroundImage: `url(${vec2})` }}
                          className="bg-no-repeat bg-cover lg:w-60 lg:h-60 w-32 h-32"
                        ></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{ backgroundImage: `url(${bg2})` }}
                    className="bg-no-repeat bg-cover rounded-[29px] h-[214px] bg-center lg:w-full lg:h-full"
                  >
                    <div className="flex flex-col justify-center items-center">
                      {/* image love */}
                      <div className=" lg:w-[370px] w-80 lg:mt-36 mt-16">
                        <span
                          key={array.sukien[array.sukien.length-1].id}
                          to={`/ array / ${array.sukien[array.sukien.length-1].id}`}
                          className="lg:text-[24px] starborn"
                        >
                          {array.sukien[array.sukien.length-1].ten_su_kien}
                        </span>
                        <div className="mt-3">
                          <p className="slab font-semibold lg:text-[16px]">
                            {array.sukien[array.sukien.length-1].noi_dung_su_kien}
                          </p>
                        </div>
                      </div>

                      <div className="my-4 slab font-semibold lg:text-[16px]">
                        <span
                          style={{ fontStyle: "normal", marginTop: 100 }}
                          className="text-time"
                        >
                          {array.sukien[array.sukien.length-1].real_time}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* <div className="pagination text-4xl flex justify-center my-6">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={`pagination-button ${pageNumber === currentPage ? "active bg-red-700" : ""
                    } bg-[#ff9f9f] hover:bg-[#ff9f9f8c] text-white font-medium py-2 px-4 rounded ml-2`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div> */}

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
      </div>
    </div>
  );
}

export default EventHistory;
