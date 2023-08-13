import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import send from "./img/send.png";
import TemplateCmt1 from "./template/TemplateCmt1";
import TemplateCmt2 from "./template/TemplateCmt2";
import TemplateCmt3 from "./template/TemplateCmt3";
import TemplateCmt4 from "./template/TemplateCmt4";
import { useParams } from "react-router-dom";
import noAvatar from "../app/img/no-avatar.png";
import { toast } from "react-toastify";
const templateComponents = {
  TemplateCmt1: TemplateCmt1,
  TemplateCmt2: TemplateCmt2,
  TemplateCmt3: TemplateCmt3,
  TemplateCmt4: TemplateCmt4,
};

function CmtPopup(props) {
  const { idsk } = useParams();
  const [dataCmt, setDataCmt] = useState([]);
  const [dataUser, setDataUser] = useState(null);
  const [dataSend, setDataSend] = useState({});

  const user = JSON.parse(localStorage.getItem("user-info"));
  console.log(user);
  const idUser = user.id_user;
  console.log(user.id_user);

  const templateCmt = props.TemplateCmt;
  const data = props.data;
  console.log("====================================");
  console.log(idsk);
  console.log("====================================");
  const closePopup = () => {
    props.setIsOpenPopup(false);
    // setImgSrc(props.data.link_nu_goc);
    // setIsImgPopup();
  };
  // useEffect(() => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchDataCmt = async () => {
    try {
      const response = await axios.get(
        `http://14.225.7.221:8989/lovehistory/comment/user/${idUser}`
        // `http://14.225.7.221:8989/lovehistory/comment/user/${idUser}`
      );
      const data = await response.data.comment_user;
      console.log("====================================");
      console.log("data ee", data);
      console.log("====================================");
      setDataCmt(data);
      console.log("data", data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataCmt();
  }, []);
  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await axios.get(
          `http://14.225.7.221:8989/lovehistory/comment/1?id_toan_bo_su_kien=${idUser}`
        );
        console.log(response.data.comment);
        setDataUser(response.data.comment[1]);
        console.log("====================================");
        console.log(dataUser);
        console.log("====================================");
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataUser();
  }, []);

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };
  const sortCmt = dataCmt.sort(
    (a, b) => new Date(a.real_time) - new Date(b.real_time)
  );
  console.log("====================================");
  console.log(sortCmt);
  console.log("====================================");
  const HandleSendCmt = async (e) => {
    const url = "http://14.225.7.221:8989/lovehistory/comment";
    const {
      device_cmt,
      id_toan_bo_su_kien,
      dia_chi_ip,
      so_thu_tu_su_kien,
      imageattach,
      id_user,
      location,
    } = dataUser;
    const data = {
      noi_dung_cmt: inputValue,
      device_cmt,
      id_toan_bo_su_kien,
      so_thu_tu_su_kien,
      ipComment: dia_chi_ip,
      imageattach,
      id_user,
      location,
    };
    await axios
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Dữ liệu đã được gửi thành công:", response.data.comment);
        setInputValue("");
        // dataCmt.push(response.data.comment);
        setDataCmt((prev) => [...prev, response.data.comment]);
        toast.success("Commented!!!");
      })
      .catch((error) => {
        toast.error("comment failed");
        console.error("Lỗi khi gửi dữ liệu:", error);
      });
  };
  const TemplateComponent = templateComponents[templateCmt];

  return (
    <div
      style={{
        position: "fixed",
        background: "rgba(0,0,0,0.6)",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9990,
      }}
    >
      <div className="w-full h-full z-[9999]" onClick={closePopup}></div>
      <div className="rounded-lg rounded-t-[36px] flex flex-col h-[95%] w-max bg-white gap-y-4">
        <div className="w-max h-[85%]">
          <TemplateComponent data={data} onClick={closePopup} />
        </div>

        {/* {comment} */}
        <div className="overflow-y-auto">
          {sortCmt.length > 0 &&
            sortCmt.map((cmt, index) => (
              <div className="flex items-stretch gap-x-4" key={index}>
                {/* {other-avt} */}
                <div className="overflow-hidden rounded-[50%] w-[40px] h-[40px] ml-[20px]">
                  <img
                    src={cmt.imageattach ? cmt.imageattach : noAvatar}
                    alt=""
                    className="w-[100%] h-[100%] object-cover rounded-[50%]"
                  />
                </div>

                {/* { Name + Content } */}
                <div className="">
                  <h1 className="lg:text-2xl text-xl font-semibold">
                    {cmt.user_name ? cmt.user_name : "Guest"}
                  </h1>
                  <p className="lg:text-xl text-base"> {cmt.noi_dung_cmt}</p>
                  <p className="lg:text-base text-sm">
                    {cmt.thoi_gian_release}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className="flex items-center justify-around mx-3 gap-x-4 rounded-full shadow-sm shadow-slate-300">
          <div className="overflow-hidden rounded-full w-[50px]">
            <img
              src={
                dataUser?.avatar_user.split(":")[0] === "https"
                  ? dataUser.avatar_user
                  : noAvatar
              }
              alt=""
              className="w-[100%] h-[100%] object-cover"
            />
          </div>

          <div className="w-full py-3 px-4 border bg-white border-gray-500 rounded-full">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full h-auto border-none outline-none"
            ></input>
          </div>
          <button className="w-[30px]" onClick={HandleSendCmt}>
            <img src={send} alt="" className="w-[100%] h-[100%] object-cover" />
          </button>
        </div>
      </div>
      <div className="w-full h-full z-[9999]" onClick={closePopup}></div>
    </div>
  );
}

export default CmtPopup;
