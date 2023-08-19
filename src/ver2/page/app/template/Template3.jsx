// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import bgr from "../img/bg-3.png";
// import CmtPopup from "../CmtPopup";
// import Clock from "../../../components/CLockEvent";
// import moment from "moment";
// import { useParams } from "react-router";

// function Template3(props) {
//   const { id } = useParams();
//   const [isOpenPopup, setIsOpenPopup] = useState(false);
//   const data = props.data;
//   const stt = data.so_thu_tu_su_kien;
//   const cmt =
//     "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096950-1@2x.png";
//   const view =
//     "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096951-1@2x.png";
//   useEffect(() => {
//     if (isOpenPopup) {
//       const formData = new FormData();
//       formData.append("id_toan_bo_su_kien", id);
//       formData.append("so_thu_tu_su_kien", stt);

//       axios
//         .post("http://14.225.7.221:8989/countview", formData)
//         .then((response) => {
//           console.log("API response:", response.data.count_view);
//         })
//         .catch((error) => {
//           console.error("Lỗi khi gửi request API:", error);
//         });
//     }
//   }, [isOpenPopup, id, stt]);
//   return (
//     <div className="min-w-full min-h-full">
//       <div className="h-[10%] w-[100%] mt-[40px] ml-[30px]">
//         <Clock
//           data={moment(data.real_time)
//             .add(7, "hours")
//             .format("YYYY-MM-DD HH:mm:ss")}
//         />
//       </div>
//       <div>
//         <div className="relative  top-3 left-3  rounded-[50px] items-center justify-center ml-[50px] mr-2">
//           <div className="absolute z-20 top-[50px] left-[-40px] right-[100px] min-w-full min-h-full lg:w-[1019px] w-[300px] border-8 border-pink-300 h-[400px] rounded-[50px] flex flex-row items-center justify-center lg:h-[570px] ">
//             <img src={bgr} alt="" className="h-full w-full rounded-[50px]" />
//             <div className="absolute top-0  justify-center items-center flex">
//               <div
//                 className="lg:ml-[300px] max-w-[220px] lg:max-w-full  mt-[200px] lg:mt-[300px] lg:mr-[300px] flex flex-col items-center justify-center"
//                 onClick={setIsOpenPopup.bind(this, true)}
//               >
//                 <span
//                   key={data.id}
//                   to={`/ array / ${data.id}`}
//                   className="text-3xl lg:text-5xl mt-[-100px] flex items-center justify-center "
//                 >
//                   {data.ten_su_kien}
//                 </span>
//                 <p className="text-xl lg:text-3xl font-[Montserrat] lg:max-w-full pt-3 overflow-y-auto h-32 mt-[50px] items-center justify-center max-w-[100px]">
//                   {data.noi_dung_su_kien}
//                 </p>
//                 <div className="flex flex-row ">
//                   <div className="mt-[10px] flex">
//                     <img className="h-[28px] w-[35px] " src={cmt} />
//                     <div className="text-2xl ml-[10px]">
//                       {data.count_comment}
//                     </div>
//                   </div>
//                   <div className="mt-[10px] ml-[100px] flex">
//                     <img className="h-[28px] w-[35px] " src={view} />
//                     <div className="text-2xl ml-[10px]">{data.count_view}</div>
//                   </div>
//                 </div>
//                 <div className="my-4 ">
//                   <span
//                     style={{ fontStyle: "normal" }}
//                     className="text-time text-3xl "
//                   >
//                     {moment(data.real_time)
//                       .add(7, "hours")
//                       .format("YYYY-MM-DD HH:mm:ss")}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="absolute z-[10]  lg:top-0 top-[-30px] left-[-30px] lg:left-[-15px] w-1/2 h-[573px] float-left mt-[200px]">
//             <div className="lg:w-[290px] lg:h-[300px] w-[200px] h-[200px] overflow-hidden">
//               <img
//                 src={`${data.link_da_swap}`}
//                 alt=""
//                 className=" w-full h-full object-cover"
//               />
//             </div>
//           </div>
//           <div className="absolute z-10 top-0 lg:right-[-190px] w-1/2 h-[573px] float-right lg:mt-[200px] mt-[170px]  right-[30px] overflow-hidden">
//             <div className="lg:w-[290px] lg:h-[300px] w-[200px] h-[200px] overflow-hidden">
//               <img
//                 src={`${data.link_da_swap}`}
//                 alt=""
//                 className=" w-full h-full object-cover"
//               />
//             </div>
//           </div>
//           {isOpenPopup && (
//             <CmtPopup
//               setIsOpenPopup={setIsOpenPopup}
//               data={data}
//               TemplateCmt="TemplateCmt3"
//               stt={props.stt}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Template3;
import React, { useState, useEffect } from "react";
import axios from "axios";
import bgr from "../img/bg-3.png";
import CmtPopup from "../CmtPopup";
import Clock from "../../../components/CLockEvent";
import moment from "moment";

function Template3(props) {
  // const { id } = useParams();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const data = props.data;
  const cmt =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096950-1@2x.png";
  const view =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096951-1@2x.png";

  return (
    <div className="min-w-full min-h-full relative">
      <div className="w-[100%] mt-[30px] ml-[30px]">
        <Clock
          data={moment(data.real_time)
            .add(7, "hours")
            .format("YYYY-MM-DD HH:mm:ss")}
        />
      </div>
      <div>
        <div className="relative top-3 left-3  rounded-[50px] items-center justify-center ml-[50px] mr-2">
          <div className="absolute z-20 top-[50px] left-[-40px] right-[100px] min-w-full  lg:w-[1019px] w-[300px] border-8 border-pink-300 h-[400px] rounded-[50px] flex flex-row items-center justify-center ">
            <img src={bgr} alt="" className="h-full w-full rounded-[50px]" />
            <div className="absolute top-0  justify-center items-center flex">
              <div
                className="ml-[300px] lg:mt-full mt-[200px] mr-[300px]"
                onClick={setIsOpenPopup.bind(this, true)}
              >
                <span
                  key={data.id}
                  to={`/ array / ${data.id}`}
                  className="text-5xl mt-[-100px] flex items-center justify-center "
                >
                  {data.ten_su_kien}
                </span>
                <p className="text-3xl font-[Montserrat] max-w-lg pt-3 overflow-y-auto h-32 mt-[50px] items-center justify-center">
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
                    {moment(data.real_time)
                      .add(7, "hours")
                      .format("YYYY-MM-DD HH:mm:ss")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute  top-0 left-[-10px] w-1/2 h-[573px] float-left mt-[100px]"
          >
            <div className=" w-[280px] h-[260px] overflow-hidden">
              <img
                src={`${data.link_da_swap}`}
                alt=""
                className=" w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute z-10 top-0 right-0 w-1/2 h-[573px] float-right mt-[100px]">
            <div className="lg:w-[330px] lg:h-[300px] md:w-[220px] md:h-[270px] overflow-hidden lg:ml-[150px] md:ml-[110px] w-[220px] h-[220px] mt-[50px] ml-[-40px]">
              <img
                src={`${data.link_da_swap}`}
                alt=""
                className="w-full h-full object-cover mt-5"
              />
            </div>
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
  );
}

export default Template3;
