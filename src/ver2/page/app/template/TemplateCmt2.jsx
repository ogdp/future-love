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
import moment from "moment";

function TemplateCmt2(props) {
  // const { id } = useParams();
  const { data, onClick } = props;
  const {
    id,
    link_nu_goc,
    count_comment,
    count_view,
    real_time,
    ten_su_kien,
    noi_dung_su_kien,
    link_da_swap,
  } = data;
  const cmt =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096950-1@2x.png";
  const view =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096951-1@2x.png";
  return (
    <>
      <div
        className={`lg:w-full w-[380px] h-full border-8 border-pink-300  bg-white flex flex-col rounded-[36px] overflow-hidden`}
      >
        <div className="relative">
          <div
            style={{ backgroundImage: `url(${link_da_swap})` }}
            className="lg:w-full lg:h-[250px] w-full h-[250px] bg-center  bg-no-repeat bg-cover object-contain "
            onClick={onClick}
          >
            <img
              src={vien}
              className="absolute lg:top-[130px] top-[180px] left-0 right-0 object-contain "
              alt="avatar"
            />
          </div>
        </div>
        <div className="h-[auto] w-full relative ">
          <div className="flex items-center justify-evenly lg:flex-row flex-col">
            <div className="flex flex-col items-center gap-y-2 justify-center">
              <p
                key={id}
                to={`/ array / ${id}`}
                className="lg:text-3xl text-2xl  font-bold"
              >
                {ten_su_kien}
              </p>

              <div className="flex gap-x-7 items-center">
                <div className="flex items-center gap-x-2 font-bold">
                  <img src={cmt} className="w-7" alt="view" />
                  <span>{count_comment}</span>
                </div>
                <div className="flex items-center gap-x-2 font-bold">
                  <img src={view} className="w-7" alt="view" />
                  <span>{count_view}</span>
                </div>
              </div>
              <span className="font-bold">
                {" "}
                {moment(data.real_time)
                  .add(7, "hours")
                  .format("YYYY-MM-DD HH:mm:ss")}
              </span>
            </div>
            <p className="text-base font-[Montserrat] max-w-lg pt-3 overflow-y-auto lg:mt-[30px] mb-10 z-[3]">
              {noi_dung_su_kien}
            </p>
          </div>
          {/* <div className="my-4 relative"></div> */}
        </div>
      </div>
    </>
  );
}

export default TemplateCmt2;
