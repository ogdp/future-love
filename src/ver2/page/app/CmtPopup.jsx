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
  const param = useParams();
  const [dataCmt, setDataCmt] = useState([]);
  const user = JSON.parse(localStorage.getItem("user-info"));
  console.log(user);
  const [imgComment, setImgComment] = useState("");
  const templateCmt = props.TemplateCmt;
  const closePopup = () => {
    props.setIsOpenPopup(false);
  };
  const fetchDataCmt = async () => {
    console.log(1234);
    try {
      const response = await axios.get(
        `http://14.225.7.221:8989/lovehistory/comment/${props.data.so_thu_tu_su_kien}?id_toan_bo_su_kien=${param.id}`
      );
      console.log(response.data.comment);
      setDataCmt(response.data.comment);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataCmt();
  }, []);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };
  const HandleSendCmt = async (e) => {
    const url = "http://14.225.7.221:8989/lovehistory/comment";
    const comment = {
      device_cmt: "Simulator (iPhone 14 Plus)",
      id_toan_bo_su_kien: param.id,
      ipComment: "14.232.159.109",
      so_thu_tu_su_kien: props.data.so_thu_tu_su_kien,
      imageattach: imgComment ? imgComment : "",
      id_user: user.id_user,
      location: "Ha Noi",
    };
    const data = { ...comment, noi_dung_cmt: inputValue };
    await axios
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setInputValue("");
        setDataCmt((prev) => [...prev, response.data.comment]);
        setImgComment("");
        toast.success("Commented!!!");
      })
      .catch((error) => {
        toast.error("comment failed");
        console.error("Lỗi khi gửi dữ liệu:", error);
      });
  };
  const TemplateComponent = templateComponents[templateCmt];
  const onSubmitComment = (event) => {
    event.preventDefault();
  };
  const onChangeImgComment = async (event) => {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    const apiResponse = await axios.post(
      `https://api.imgbb.com/1/upload?key=283182a99cb41ed4065016b64933524f`,
      formData
    );
    setImgComment(apiResponse.data.data.url);
  };
  const removeImgComment = () => {
    setImgComment("");
  };
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
          <TemplateComponent data={props.data} onClick={closePopup} />
        </div>
        <div className="overflow-y-auto">
          {dataCmt.length > 0 &&
            dataCmt.map((cmt, index) => (
              <div className="flex items-stretch gap-x-4" key={index}>
                <div className="overflow-hidden rounded-[50%] w-[40px] h-[40px] ml-[20px]">
                  <img
                    src={cmt.avatar_user ? cmt.avatar_user : noAvatar}
                    alt=""
                    className="w-[100%] h-[100%] object-cover rounded-[50%]"
                  />
                </div>
                <div className="">
                  <h1 className="lg:text-2xl text-xl font-semibold">
                    {cmt.user_name ? cmt.user_name : "Guest"}
                  </h1>
                  <p className="lg:text-xl text-base"> {cmt.noi_dung_cmt}</p>
                  {cmt.imageattach ? (
                    <img
                      className="w-[60px] h-[50px]"
                      src={cmt.imageattach}
                    ></img>
                  ) : (
                    ""
                  )}
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
              src={user.id_user ? user.link_avatar : noAvatar}
              alt=""
              className="w-[100%] h-[100%] object-cover"
            />
          </div>

          <div className="w-full py-3 px-4 border bg-white border-gray-500 rounded-full">
            <form onSubmit={onSubmitComment}>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="w-full h-auto border-none outline-none"
              ></input>
              <div className="inline-block relative">
                <label for="file-input">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/685/685655.png"
                    width="20px"
                    height="20px"
                  />
                  <input
                    type="file"
                    onChange={onChangeImgComment}
                    accept=".jpg"
                    className="absolute left-0 top-0 opacity-0 w-[100%] h-[100%]"
                  />
                </label>
              </div>
              <button className="w-[30px] float-right" onClick={HandleSendCmt}>
                <img
                  src={send}
                  alt=""
                  className="w-[100%] h-[100%] object-cover"
                />
              </button>
            </form>
          </div>
          {imgComment ? (
            <>
              <img
                className="w-[80px] h-[70px]"
                src={imgComment}
              />
              <button className="mt-[-50px]" onClick={removeImgComment}>
                <i className="fas fa-times font-bold" />
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="w-full h-full z-[9999]" onClick={closePopup}></div>
    </div>
  );
}

export default CmtPopup;
