import React, { useState } from "react";
import img1 from "../../../components/image/finish.png";
import img2 from "../img/phaitren1.png";
import img3 from "../img/phaiduoi1.png";
import img4 from "../img/traitren1.png";
import img5 from "../img/traiduoi1.png";
import CmtPopup from "../CmtPopup";
import Clock from "../../../components/CLockEvent";

function Template1(props) {
  // const { id } = useParams();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const data = props.data;
  console.log("====================================");
  console.log(props);
  console.log("====================================");
  const cmt =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096950-1@2x.png";
  const view =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096951-1@2x.png";

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="mb-10 mt-20">
        <Clock data={data.real_time} />
      </div>
      <div
        className={`border-8 border-pink-300 w-full lg:h-[550px] bg-white rounded-[36px] flex lg:flex-row flex-col-reverse mt-[50px] items-center justify-center relative gap-x-20 overflow-hidden lg:mb-[180px] mb-[60px]`}
      >
        <div className="-ml-2 bg-no-repeat bg-cover lg:w-[55%] w-full flex flex-col justify-between mt-8">
          <div>
            <img
              src={img2}
              alt=""
              className="lg:ml-[5px] lg:mt-[3px] absolute top-0 left-0"
            />
          </div>
          {/* image love */}
          <div className="flex flex-col lg:ml-[100px] mx-14 items-center justify-center mt-[100px]">
            <span
              key={data.id}
              to={`/ array / ${data.id}`}
              className="text-5xl mt-[-100px] "
            >
              {data.ten_su_kien}
            </span>
            <p className="text-3xl font-[Montserrat] max-w-lg pt-3 max-h-[42rem] overflow-y-auto mt-[50px] text-center lg:text-left">
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
            <div className="lg:my-4 my-10">
              <span
                style={{ fontStyle: "normal" }}
                className="text-time text-3xl mb-4 block"
              >
                {data.real_time}
              </span>
            </div>
          </div>
          {/* image swap */}
          <div className="absolute left-0 bottom-0">
            <img src={img3} alt="" className="" />
          </div>
        </div>
        <div className="bg-no-repeat bg-cover w-[55%] flex flex-col justify-between ">
          <div className="absolute right-0 top-0">
            <img src={img4} alt="" />
          </div>
          <div
            className="flex align-center items-center justify-center"
            onClick={setIsOpenPopup.bind(this, true)}
          >
            <div>
              <div
                style={{ backgroundImage: `url(${data.link_da_swap})` }}
                className=" lg:w-[450px] lg:h-[450px]  rounded-full bg-center bg-no-repeat bg-cover 5  "
              >
                <div
                  style={{ backgroundImage: `url(${img1})` }}
                  className="rounded-[32px] bg-no-repeat bg-cover lg:w-[495px] lg:h-[465px] w-[300px] h-[300px] ml-[-35px] mt-6"
                />
              </div>
              {/* first event */}
            </div>
          </div>
          <div className="absolute right-0 bottom-0">
            <img src={img5} alt="" className="" />
          </div>
        </div>
        {isOpenPopup && (
          <CmtPopup
            setIsOpenPopup={setIsOpenPopup}
            data={data}
            TemplateCmt="TemplateCmt1"
            stt={props.stt}
          />
        )}
      </div>
    </div>
  );
}

export default Template1;
