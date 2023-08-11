import React, { useState, useEffect } from "react";
import axios from "axios";
import send from "./img/send.png";
import TemplateCmt1 from "./template/TemplateCmt1";
import TemplateCmt2 from "./template/TemplateCmt2";
import TemplateCmt3 from "./template/TemplateCmt3";
import TemplateCmt4 from "./template/TemplateCmt4";
import { useParams } from "react-router-dom";
import noAvatar from "../app/img/no-avatar.png";
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
  console.log(data);
  console.log("====================================");
  const closePopup = () => {
    props.setIsOpenPopup(false);
    // setImgSrc(props.data.link_nu_goc);
    // setIsImgPopup();
  };
  useEffect(() => {
    const fetchDataCmt = async () => {
      try {
        const response = await axios.get(
          `http://14.225.7.221:8989/lovehistory/comment/user/${idUser}`
        );
        setDataCmt(response.data.comment_user);
        console.log(response.data.comment_user);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDataCmt();
  }, []);
  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await axios.get(
          `http://14.225.7.221:8989/lovehistory/comment/1?id_toan_bo_su_kien=${idUser}`
        );
        console.log(response.data.comment);
        setDataUser(response.data.comment[0]);
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

  const HandleSendCmt = async () => {
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
        setDataCmt((prev) => [...prev, response.data.comment]);
        setDataSend(response.data.comment);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi dữ liệu:", error);
      });
  };
  console.log("====================================");
  console.log("Data user", dataUser);
  console.log("====================================");
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
        zIndex: 999,
      }}
    >
      <div className="w-full h-full" onClick={closePopup}></div>
      <div className="rounded-lg rounded-t-[36px] flex flex-col h-[95%] w-max bg-white gap-y-4">
        <div className="w-max h-[85%]">
          <TemplateComponent data={data} onClick={closePopup} />
        </div>

        {/* {comment} */}
        <div className="overflow-y-auto bg-white">
          {dataCmt.length > 0 &&
            dataCmt.map(
              (cmt, index) =>
                cmt.so_thu_tu_su_kien === props.stt && (
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
                      <h1 className="text-lg font-semibold">{cmt.user_name}</h1>
                      <p className="text-base"> {cmt.noi_dung_cmt}</p>
                      <p className="text-sm">{cmt.thoi_gian_release}</p>
                    </div>
                  </div>
                )
            )}
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
          <div className="w-[30px]" onClick={() => HandleSendCmt()}>
            <img src={send} alt="" className="w-[100%] h-[100%] object-cover" />
          </div>
        </div>
      </div>
      <div className="w-full h-full" onClick={closePopup}></div>
    </div>
  );
}

export default CmtPopup;
