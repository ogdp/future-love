import React, { useState, useEffect } from "react";
import axios from "axios";
import bgr from "../img/bg-3.png";
import CmtPopup from "../CmtPopup";
import Clock from "../../../components/CLockEvent";

function Template3(props) {
  // const { id } = useParams();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const data = props.data;

  const cmt =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096950-1@2x.png";
  const view =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096951-1@2x.png";

  return (
    <div className="min-w-full min-h-full m-auto">
      <div className="h-[10%] w-[100%]">
        <Clock data={data.real_time} />
      </div>
      <div>
        <div className="relative top-3 left-3  rounded-[50px] items-center justify-center ml-[50px] mr-2">
          <div className="absolute z-20 top-[50px] left-[-40px] right-[100px] min-w-full min-h-full lg:w-[1019px] w-[300px] border-8 border-pink-300 h-[573px] rounded-[50px] flex flex-row items-center justify-center ">
            <img
              src={bgr}
              alt=""
              className="h-full w-full rounded-[50px]"
              srcset=""
            />
            <div class="absolute top-0  justify-center items-center flex">
              <div
                className="ml-[400px] mt-[200px] mr-[300px]"
                onClick={setIsOpenPopup.bind(this, true)}
              >
                <span
                  key={data.id}
                  to={`/ array / ${data.id}`}
                  className="text-5xl mt-[-100px] flex items-center justify-center "
                >
                  {data.ten_su_kien}
                </span>
                <p className="text-3xl font-[Montserrat] max-w-lg pt-3 h-[auto] overflow-y-auto h-32 mt-[50px] h-[150px] items-center justify-center">
                  {data.noi_dung_su_kien}
                </p>
                <div className="flex flex-row ">
                  <div className="mt-[10px] flex">
                    <img className="h-[28px] w-[35px] " src={cmt} />
                    <div className="text-2xl ml-[10px]">
                      {data.count_comment}
                    </div>
                  </div>
                  <div className="mt-[10px] ml-[100px] flex">
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
            </div>
          </div>
          <div className="absolute z-10 top-0 left-0 w-1/2 h-[573px] float-left mt-[80px]">
            <div className="w-[500px] h-[450px] overflow-hidden">
              <img
                src={`${data.link_nam_goc}`}
                alt=""
                srcset=""
                className="w-full"
              />
            </div>
          </div>
          <div className="absolute z-10 top-0 right-0 w-1/2 h-[573px] float-right mt-[80px]">
            <div className="w-[450px] h-[450px] overflow-hidden float-right">
              <img
                src={`${data.link_nu_goc}`}
                alt=""
                srcset=""
                className="w-full"
              />
            </div>
          </div>
          {isOpenPopup && (
            <CmtPopup
              setIsOpenPopup={setIsOpenPopup}
              data={data}
              TemplateCmt="TemplateCmt3"
              stt={props.stt}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Template3;
