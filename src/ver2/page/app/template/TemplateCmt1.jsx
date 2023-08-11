import React, { useState } from "react";
import img1 from "../../../components/image/finish.png";
import img2 from "../img/phaitren1.png";
import img3 from "../img/phaiduoi1.png";
import img4 from "../img/traitren1.png";
import img5 from "../img/traiduoi1.png";

function TemplateCmt1(props) {
  // const { id } = useParams();
  const data = props.data;

  const cmt =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096950-1@2x.png";
  const view =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096951-1@2x.png";

  return (
    <div className="h-[auto] flex align-center items-center justify-center">
      <div
        className={` lg:w-[1019px] w-[380px] mb-12 border-8 border-pink-300  h-[auto] bg-white rounded-[36px] flex flex-row mt-[50px]`}
      >
        <div className="-ml-2 bg-no-repeat bg-cover w-[55%] flex flex-col justify-between">
          <div>
            <img src={img2} alt="" className="ml-[10px] mt-[5px]" />
          </div>
          {/* image love */}
          <div className="flex flex-col ml-[100px]">
            <span
              key={data.id}
              to={`/ array / ${data.id}`}
              className="text-5xl mt-[-100px] "
            >
              {data.ten_su_kien}
            </span>
            <p className="text-3xl font-[Montserrat] max-w-lg pt-3 max-h-[42rem] overflow-y-auto h-32 mt-[50px] h-[150px]">
              {data.noi_dung_su_kien}
            </p>
            <div className="flex flex-row ">
              <div className="flex mt-[30px]">
                <img className="h-[28px] w-[35px] " src={cmt} />
                <div className="text-2xl ml-[10px]">{data.count_comment}</div>
              </div>
              <div className="flex mt-[30px] ml-[100px]">
                <img className="h-[28px] w-[35px] " src={view} />
                <div className="text-2xl ml-[10px]">{data.count_view}</div>
              </div>
            </div>
            <div className="my-4 ">
              <span
                style={{ fontStyle: "normal" }}
                className="text-time text-3xl "
              >
                {data.real_time}
              </span>
            </div>
          </div>
          {/* image swap */}
          <div className="ml-[8px] mb-[3px]">
            <img src={img3} alt="" className="" />
          </div>
        </div>
        <div className="bg-no-repeat bg-cover w-[55%] flex flex-col justify-between ">
          <div className=" ml-[315px]">
            <img src={img4} alt="" />
          </div>
          <div className="flex align-center items-center justify-center">
            <div>
              <div
                style={{ backgroundImage: `url(${data.link_da_swap})` }}
                className=" lg:w-[450px] lg:h-[450px] w-[405px] h-[405px] rounded-full bg-center bg-no-repeat bg-cover 5  "
              >
                <div
                  style={{ backgroundImage: `url(${img1})` }}
                  className="rounded-[32px] bg-no-repeat bg-cover w-[495px] h-[465px] ml-[-35px]"
                />
              </div>
              {/* first event */}
            </div>
          </div>
          <div className="ml-[315px]">
            <img src={img5} alt="" className="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateCmt1;
