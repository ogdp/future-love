import React, { useState } from "react";
import Clock from "../../../components/CLockEvent";
import img1 from "../img/vien.png";
import firstdate from "../img/firstdate.png";
import CmtPopup from "../CmtPopup";
import moment from "moment/moment";
function Template2(props) {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const data = props.data;
  console.log("====================================");
  console.log(props);
  console.log("====================================");
  const {
    real_time,
    noi_dung_su_kien,
    link_nu_goc,
    count_view,
    count_comment,
    ten_su_kien,
    link_da_swap,
  } = data;
  const cmt =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096950-1@2x.png";
  const view =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096951-1@2x.png";
  return (
    <div className="mt-20 mb-10 flex flex-col items-center">
      <div>
        <Clock
          data={moment(data.real_time)
            .add(7, "hours")
            .format("YYYY-MM-DD HH:mm:ss")}
        />
      </div>
      <div className=" lg:w-[1019px] w-[400px] h-[500px] mb-[120px] border-8 border-pink-300  lg:h-[600px] bg-white  rounded-[36px] flex flex-row mt-[50px] overflow-hidden relative">
        <div
          style={{ backgroundImage: `url(${link_da_swap})` }}
          className="lg:w-full lg:h-[340px] w-full h-[400px] bg-top  bg-no-repeat bg-cover object-contain  z-20"
          onClick={setIsOpenPopup.bind(this, true)}
        >
          <img
            src={img1}
            className="absolute lg:top-[180px] top-[150px] object-contain w-[600px] h-[400px] lg:w-full"
            alt="avatar"
          />
          <div className="absolute lg:bottom-28 lg:left-10 bottom-4 px-4 flex items-center lg:justify-evenly w-full flex-col lg:flex-row justify-center">
            <div className="flex flex-col lg:gap-y-3 items-center justify-center">
              {/* <img src={firstdate} className="" alt="first date" /> */}
              <p className="lg:text-5xl text-3xl  mb-2 font-bold">
                {ten_su_kien}
              </p>
              <div className="flex text-2xl lg:text-3xl gap-x-7 items-center">
                <div className="flex items-center gap-x-2 font-bold">
                  <img src={cmt} className="w-7" alt="view" />
                  <span>{count_comment}</span>
                </div>
                <div className="flex items-center gap-x-2 font-bold">
                  <img src={view} className="w-7" alt="view" />
                  <span>{count_view}</span>
                </div>
              </div>
              <span className="font-bold text-2xl lg:text-3xl">
                {moment(data.real_time)
                  .add(7, "hours")
                  .format("YYYY-MM-DD HH:mm:ss")}
              </span>
            </div>
            <p className="max-w-[400px] text-center text-2xl lg:text-3xl font-[Montserrat]">
              {noi_dung_su_kien}
            </p>
          </div>
        </div>
        {isOpenPopup && (
          <div className="z-20">
            <CmtPopup
              setIsOpenPopup={setIsOpenPopup}
              data={data}
              TemplateCmt="TemplateCmt2"
              stt={props.stt}
            />
          </div>
        )}
        {}
      </div>
      {/* <img src={data.link_nu_chua_swap} /> */}
    </div>
  );
}

export default Template2;
