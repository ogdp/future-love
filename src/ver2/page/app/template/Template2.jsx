import React from "react";
import Clock from "../../../components/CLockEvent";
import img1 from "../img/vien.png";
import firstdate from "../img/firstdate.png";
function Template2(props) {
  const data = props.data;
  console.log("====================================");
  console.log(data);
  console.log("====================================");
  const { real_time, noi_dung_su_kien, link_nu_goc, count_view, count_comment } =
    data;
  const cmt =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096950-1@2x.png";
  const view =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096951-1@2x.png";

  return (
    <div className="">
      <div>
        <Clock data={real_time} />
      </div>
      <div className=" lg:w-[1019px] w-max mb-12 border-8 border-pink-300  h-[600px]  rounded-[36px] flex flex-row mt-[50px] overflow-hidden relative">
        <div
          style={{ backgroundImage: `url(${link_nu_goc})` }}
          className="lg:w-full lg:h-[340px] w-max h-[405px] bg-top  bg-no-repeat bg-cover object-contain  5 z-20 "
        >
          <img
            src={img1}
            className="absolute top-[180px] object-contain w-full  z-[-1] "
            alt="avatar"
          />
          <div className="absolute bottom-28 left-10 flex items-center justify-evenly w-full">
            <div className="flex flex-col gap-y-3 items-center">
              <img src={firstdate} className="" alt="first date" />
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
            <p className="max-w-[400px]">
                {noi_dung_su_kien}
            </p>
          </div>
        </div>
      </div>
      {/* <img src={data.link_nu_chua_swap} /> */}
    </div>
  );
}

export default Template2;
