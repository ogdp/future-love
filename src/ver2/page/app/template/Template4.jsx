import React, { useState, useEffect } from "react";
import CmtPopup from "../CmtPopup";
import Clock from "../../../components/CLockEvent";



function Template4(props) {

    // const { id } = useParams();
    const [isOpenPopup, setIsOpenPopup] = useState(false)
    const data = props.data

    const cmt = "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096950-1@2x.png"
    const view = "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096951-1@2x.png"

    return (
        <div>
            <div className="h-[10%] w-[100%]">
                    <Clock data={data.real_time} />
            </div>
            <div
                className={` lg:w-[1019px] w-[380px] mb-12 border-8 border-pink-300  h-[auto] bg-white rounded-[36px] flex flex-row `}
            >
                <div className="w-[50%] h-[auto]" style={{
                    backgroundImage: `url(${data.link_da_swap})`, backgroundSize: "cover",
                    backgroundPosition: "center center"
                }}>

                </div>
                <div className="w-[50%] h-[auto] mt-[70px] ml-[20px]" onClick={setIsOpenPopup.bind(this, true)}>
                    {/* <div className="content-none absolute border-[100px 0 0 173.2px]"> */}
                    <span key={data.id} to={`/ array / ${data.id}`} className="text-5xl mt-[-100px] "  >{data.ten_su_kien}</span>
                    <p className="text-3xl font-[Montserrat] max-w-lg pt-3 max-h-[42rem] overflow-y-auto h-32 mt-[50px] h-[150px]">
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
                        <span style={{ fontStyle: "normal" }} className="text-time text-3xl ">{data.real_time}</span>
                    </div>
                    {/* </div> */}
                </div>
                {isOpenPopup && <CmtPopup setIsOpenPopup={setIsOpenPopup} data={data} TemplateCmt="TemplateCmt4" stt={props.stt}/>}
            </div>
        </div>
    );
}

export default Template4;