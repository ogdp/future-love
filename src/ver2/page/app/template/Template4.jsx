import React, { useState, useEffect } from "react";
import CmtPopup from "../CmtPopup";
import Clock from "../../../components/CLockEvent";

function Template4(props) {
  // const { id } = useParams();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const data = props.data;

  const cmt =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096950-1@2x.png";
  const view =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096951-1@2x.png";

  return (
    <div className="flex flex-col items-center ">
      <div className="my-20">
        <Clock data={data.real_time} />
      </div>
      <div
        className={` lg:w-[1019px] w-[400px] h-full  border-8 border-pink-300  bg-white rounded-[36px] flex lg:flex-row flex-col gap-x-10 overflow-hidden mb-[300px]`}
        onClick={setIsOpenPopup.bind(this, true)}
      >
        <div
          className="h-[300px] lg:h-auto lg:w-[60%] w-full"
          style={{
            backgroundImage: `url(${data.link_da_swap})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        />
        <div className="h-[auto] lg:mt-[70px] mt-[30px] lg:ml-[20px] text-center lg:text-left flex flex-col items-center my-8">
          {/* <div className="content-none absolute border-[100px 0 0 173.2px]"> */}
          <span
            key={data.id}
            to={`/ array / ${data.id}`}
            className="lg:text-5xl text-4xl "
          >
            {data.ten_su_kien}
          </span>
          <p className="lg:text-3xl text-2xl font-[Montserrat] max-w-lg overflow-y-auto  lg:mt-[50px] mt-[20px] text-center">
            {data.noi_dung_su_kien}
          </p>
          <div className="flex flex-row ">
            <div className="flex mt-[10px]">
              <img className="h-[28px] w-[35px] " src={cmt} />
              <div className="text-2xl ml-[10px]">{data.count_comment}</div>
            </div>
            <div className="flex mt-[10px] ml-[100px]">
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
          {/* </div> */}
        </div>
        {isOpenPopup && (
          <CmtPopup
            setIsOpenPopup={setIsOpenPopup}
            data={data}
            TemplateCmt="TemplateCmt4"
            stt={props.stt}
          />
        )}
      </div>
    </div>
  );
}

export default Template4;
