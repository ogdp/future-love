import React, { useState, useEffect } from "react";
import bgr from "../img/bg-3.png";
import moment from "moment";

function TemplateCmt3(props) {
  // const { id } = useParams();
  const { data, onClick } = props;

  const cmt =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096950-1@2x.png";
  const view =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096951-1@2x.png";

  return (
    <div className="relative z-[20]">
      <div
        className={` lg:w-[1019px] w-[380px] mb-12 border-8 border-pink-300 lg:h-[80%] bg-white rounded-[36px] flex flex-col items-center justify-center relative overflow-hidden z-[20]`}
      >
        <img
          src={bgr}
          alt=""
          className="mt-160px] object-cover w-full rounded-[36px]"
        />

        <div className="absolute flex flex-col items-start">
          <span
            key={data.id}
            to={`/ array / ${data.id}`}
            className="text-5xl mt-[50px] flex items-center justify-center "
          >
            {data.ten_su_kien}
          </span>
          <p className="text-3xl font-[Montserrat] max-w-lg pt-3 overflow-y-auto mt-[50px] h-[150px] items-center justify-center">
            {data.noi_dung_su_kien}
          </p>
          <div className="flex flex-row ">
            <div className="mt-[10px] flex">
              <img className="h-[28px] w-[35px] " src={cmt} alt="" />
              <div className="text-2xl ml-[10px]">{data.count_comment}</div>
            </div>
            <div className="mt-[10px] ml-[100px] flex">
              <img className="h-[28px] w-[35px] " src={view} alt="" />
              <div className="text-2xl ml-[10px]">{data.count_view}</div>
            </div>
          </div>
          <div className="my-4 ">
            <span
              style={{ fontStyle: "normal" }}
              className="text-time text-3xl text-center"
            >
               {moment(data.real_time).add(7, 'hours').format("YYYY-MM-DD HH:mm:ss")}
            </span>
          </div>
        </div>
      </div>
      {/* <div className="absolute top-0 z-10 left-[18px] w-1/2 float-left mt-[110px]">
        <div className=" w-[270px] h-[300px] overflow-hidden z-[10]">
          <img
            src={`${data.link_da_swap}`}
            alt=""
            className=" w-full h-full object-cover"
          />
        </div>
      </div> */}
    </div>
  );
}

export default TemplateCmt3;
