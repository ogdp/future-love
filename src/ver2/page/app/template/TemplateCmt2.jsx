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
  const { data, onClick } = props;
  const {
    id,
    link_nu_goc,
    
    count_comment,
    count_view,
    real_time,
    ten_su_kien,
    noi_dung_su_kien,
  } = data;
  const cmt =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096950-1@2x.png";
  const view =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096951-1@2x.png";
  function handlePopupImage(src) {
    console.log("====================================");
    console.log(src);
    console.log("====================================");
    onClick();
  }
  return (
    <>
      <div
        className={`lg:w-full w-[380px] border-8 border-pink-300  h-[auto] bg-white flex flex-col rounded-[36px] overflow-hidden`}
      >
        <div className="relative">
          <div
            style={{ backgroundImage: `url(${link_nu_goc})` }}
            className="lg:w-full lg:h-[250px] w-max bg-top  bg-no-repeat bg-cover object-contain "
            onClick={() => handlePopupImage(link_nu_goc)}
          >
            <img
              src={vien}
              className="absolute top-[100px] left-0 right-0 object-contain "
              alt="avatar"
            />
          </div>
        </div>
        <div className="h-[auto] w-full relative ">
          <div className="flex items-center justify-evenly">
            <div className="flex flex-col items-center gap-y-2 justify-center">
              <p key={id} to={`/ array / ${id}`} className="text-2xl font-bold">
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
              <span className="font-bold">{real_time.split(",")[0]}</span>
            </div>
            <p className="text-base font-[Montserrat] max-w-lg pt-3 max-h-[42rem] overflow-y-auto h-32 mt-[30px] h-[150px] z-[3]">
              {noi_dung_su_kien}
            </p>
          </div>
          <div className="my-4 relative"></div>
        </div>
      </div>
    </>
  );
}

export default TemplateCmt2;
