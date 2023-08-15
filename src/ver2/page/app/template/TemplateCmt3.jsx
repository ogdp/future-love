import React, { useState, useEffect } from "react";
import bgr from "../img/nen3.jpg";

function TemplateCmt3(props) {
  // const { id } = useParams();
  const { data, onClick } = props;

  const cmt =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096950-1@2x.png";
  const view =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096951-1@2x.png";

  return (
    <div
      style={{
        backgroundImage: `url(${bgr})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
      className={` lg:w-[1019px] w-[380px] mb-12 border-8 border-pink-300 lg:h-[80%] bg-white rounded-[36px] flex flex-row items-center justify-center`}
    >
      {/* <div className="heart-overlay" style={{ backgroundImage: `url(${data.link_nam_goc})` }}>
                <div className="heart-overlay__shape"></div>
            </div> */}
      <div>
        <span
          key={data.id}
          to={`/ array / ${data.id}`}
          className="text-5xl mt-[-100px] flex items-center justify-center "
        >
          {data.ten_su_kien}
        </span>
        <p className="text-3xl font-[Montserrat] max-w-lg pt-3 overflow-y-auto mt-[50px] h-[150px] items-center justify-center">
          {data.noi_dung_su_kien}
        </p>
        <div className="flex flex-row ">
          <div className="mt-[10px] flex">
            <img className="h-[28px] w-[35px] " src={cmt} />
            <div className="text-2xl ml-[10px]">{data.count_comment}</div>
          </div>
          <div className="mt-[10px] ml-[100px] flex">
            <img className="h-[28px] w-[35px] " src={view} />
            <div className="text-2xl ml-[10px]">{data.count_view}</div>
          </div>
        </div>
        <div className="my-4 ">
          <span style={{ fontStyle: "normal" }} className="text-time text-3xl ">
            {data.real_time}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TemplateCmt3;
