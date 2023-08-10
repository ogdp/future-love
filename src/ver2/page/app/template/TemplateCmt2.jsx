import React, { useState, useEffect } from "react";
import img1 from "../img/hoatren2.png";
import img2 from "../img/hoaduoi2.png";
import img3 from "../img/trentrai2.png";
import img4 from "../img/traigiua2.png";
import img5 from "../img/duoitrai2.png";
import img6 from "../img/phai2.png";
import img7 from "../img/khung2_1.png";
import img8 from "../img/khung2_2.png";
import vien from "../img/vien.png";

function TemplateCmt2(props) {
  // const { id } = useParams();
  const data = props.data;
  const { noi_dung_su_kien, count_comment, count_view, real_time } = data;
  const cmt =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096950-1@2x.png";
  const view =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096951-1@2x.png";

  return (
    <>
      <div>
        <div
          className={` lg:w-[1019px] w-[380px] mb-12 border-8 border-pink-300  h-[auto] bg-white z-[2] flex flex-colums rounded-[36px] `}
        >
          <div className="relative">
            <img src={img3} alt="" className="z-[1] " />
            <img src={img4} alt="" className="z-[1] mt-[20px] " />
            <img
              src={img2}
              alt=""
              className="z-[2] mt-[-200px] ml-[100px] absolute "
            />
            <img src={img5} alt="" className="z-[1] mt-[48px] " />
          </div>
          <div className="h[auto] w-[81%] relative ">
            <img src={img7} alt="" className="z-[1] ml-[-200px] mt-[70px] " />
            <img src={img8} alt="" className="z-[1] ml-[-230px] mt-[-385px] " />
            <div className="mt-[-370px] ml-[-30px] w-[40%]">
              <span
                key={data.id}
                to={`/ array / ${data.id}`}
                className="text-3xl flex self-center"
              >
                {data.ten_su_kien}
              </span>
              <p className="text-2xl font-[Montserrat] max-w-lg pt-3 max-h-[42rem] overflow-y-auto h-32 mt-[30px] h-[150px] z-[3]">
                {data.noi_dung_su_kien}
              </p>
              <div className="flex flex-row ">
                <div className="mt-[-20px] z-[3] absolute flex">
                  <img className="h-[28px] w-[35px] " src={cmt} />
                  <div className="text-2xl ml-[10px]">
                    {" "}
                    {data.count_comment}{" "}
                  </div>
                </div>
                <div className="mt-[-20px] ml-[100px] z-[3] absolute flex">
                  <img className="h-[28px] w-[35px] " src={view} />
                  <div className="text-2xl ml-[10px]"> {data.count_view} </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-2 font-bold">
              <img src={view} className="w-7" alt="view" />
              <span>{count_view}</span>
            </div>
          </div>
          <span className="font-bold">{real_time.split(",")[0]}</span>
        </div>
        <p className="text-base font-[Montserrat] max-w-lg pt-3 max-h-[42rem] overflow-y-auto h-32 mt-[30px] h-[150px] z-[3]">
          {noi_dung_su_kien}
        </p>
      </div>
      <div className="my-4 relative"></div>
    </>
  );
}

export default TemplateCmt2;
