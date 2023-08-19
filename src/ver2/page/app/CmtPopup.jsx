import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import send from "./img/send.png";
import TemplateCmt1 from "./template/TemplateCmt1";
import TemplateCmt2 from "./template/TemplateCmt2";
import TemplateCmt3 from "./template/TemplateCmt3";
import TemplateCmt4 from "./template/TemplateCmt4";
import ImagePopup from "./ImagePopup";
import { useNavigate, useParams } from "react-router-dom";
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
  const [location, setLocation] = useState([]);
  const user = JSON.parse(localStorage.getItem("user-info"));
  const route = useNavigate();
  console.log(props);
  const [imgComment, setImgComment] = useState("");
  const templateCmt = props.TemplateCmt;
  const closePopup = () => {
    props.setIsOpenPopup(false);
    console.log("====================================");
    console.log("OKkek");
    console.log("====================================");
  };
  const fetchDataCmt = async () => {
    console.log(1234);
    try {
      const response = await axios.get(
        `http://14.225.7.221:8989/lovehistory/comment/${props.data.so_thu_tu_su_kien}?id_toan_bo_su_kien=${param.id}`
      );
      const data = await response.data.comment;
      console.log(response.data.comment);
      setDataCmt(data);
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
  const ne = window.navigator.userAgent;
  console.log("hii", ne);

  const platform = window.navigator.platform;
  console.log("User Operating System:", platform);
  const ipComment = localStorage.getItem("ip");
  const ip = navigator.geolocation;
  console.log("====================================");
  console.log(ip);
  console.log("====================================");
  useEffect(() => {
    fetch(`https://api.ip.sb/geoip/${ipComment}`)
      .then((resp) => resp.json())
      .then((data) => {
        setLocation(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [ipComment]);

  const HandleSendCmt = async (e) => {
    const url = "http://14.225.7.221:8989/lovehistory/comment";
    let comment = {};
    // if (user !== null) {
    // }
    comment = {
      device_cmt: platform,
      id_toan_bo_su_kien: param.id,
      ipComment: ipComment,
      so_thu_tu_su_kien: props.data.so_thu_tu_su_kien,
      imageattach: imgComment ? imgComment : "",
      id_user: user?.id_user,
      location: location.city,
    };
    //  else {
    //   comment = {
    //     device_cmt: platform,
    //     id_toan_bo_su_kien: param.id,
    //     ipComment: ipComment,
    //     so_thu_tu_su_kien: props.data.so_thu_tu_su_kien,
    //     imageattach: imgComment ? imgComment : "",
    //     id_user: null,
    //     location: location.city,
    //   };
    // }
    if (!inputValue.trim() && !imgComment) {
      toast.warning("Comment cannot be empty!");
      return;
    }
    const data = { ...comment, noi_dung_cmt: inputValue };
    await axios
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setInputValue("");
        console.log("====================================");
        console.log(response.data);
        console.log("====================================");
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
  // Handle Popup
  const [isImgPopup, setImgPopup] = useState(false);
  const handlePopup = () => {
    setImgPopup(!isImgPopup);
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
      <div className="w-[400px] h-full z-[9999]" onClick={closePopup}></div>
      {isImgPopup ? (
        <ImagePopup imgSrc={props.data.link_da_swap} closeImg={closePopup} />
      ) : (
        <div className="rounded-lg rounded-t-[36px] flex flex-col h-[95%] w-max bg-white gap-y-4 overflow-y-auto">
          <div className="w-full h-[95%] relative">
            <TemplateComponent data={props.data} onClick={handlePopup} />
          </div>
          <div className=" mt-5 flex flex-col gap-y-2 ">
            {dataCmt?.length > 0 &&
              dataCmt.map((cmt, index) => (
                <div className="flex items-stretch gap-x-4" key={index}>
                  <div className="overflow-hidden rounded-[50%] w-[40px] h-[40px] ml-[20px]">
                    {cmt.avatar_user && cmt.avatar_user.startsWith("http") ? (
                      <img
                        src={cmt.avatar_user}
                        alt=""
                        className="w-[100%] h-[100%]  rounded-[50%]"
                      />
                    ) : (
                      <img
                        src={noAvatar}
                        alt=""
                        className="w-[100%] h-[100%]  rounded-[50%]"
                      />
                    )}
                  </div>
                  <div className="">
                    <div className="row">
                      <div className="flex items-center">
                        <h1 className="lg:text-2xl text-xl font-semibold">
                          {cmt?.user_name ? cmt?.user_name : "Guest"}
                        </h1>
                        <p className="lg:text-base text-sm ml-2 ">
                          {cmt?.thoi_gian_release}
                        </p>
                      </div>
                    </div>

                    <p className="lg:text-xl text-base font-[Montserrat] max-w-[75%]">
                      {" "}
                      {cmt?.noi_dung_cmt}
                    </p>
                    {cmt?.imageattach ? (
                      <img
                        className="w-[60px] h-[50px]"
                        src={cmt.imageattach}
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
          </div>
          <div className="flex items-center justify-around mx-3 gap-x-4 rounded-full shadow-sm shadow-slate-300">
            <div className="overflow-hidden rounded-full w-[50px]">
              <img
                src={user?.id_user ? user.link_avatar : noAvatar}
                alt=""
                className="w-[100%] h-[100%] object-cover"
              />
            </div>

            <div className="w-full py-3 px-4 border bg-white border-gray-500 rounded-full">
              <form
                onSubmit={onSubmitComment}
                className="flex items-center gap-x-4"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="w-full h-auto border-none outline-none font-[Montserrat]"
                ></input>
                <div className="inline-block relative">
                  <label for="file-input">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/685/685655.png"
                      width="20px"
                      height="20px"
                      alt=""
                    />
                    <input
                      type="file"
                      onChange={onChangeImgComment}
                      accept=".jpg"
                      className="absolute left-0 top-0 opacity-0 w-[100%] h-[100%]"
                    />
                  </label>
                </div>
                <button
                  className="w-[30px] float-right"
                  onClick={HandleSendCmt}
                >
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
                <img className="w-[80px] h-[70px]" src={imgComment} />
                <button className="mt-[-50px]" onClick={removeImgComment}>
                  <i className="fas fa-times font-bold" />
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
      <div className="w-[400px] h-full z-[9999]" onClick={closePopup}></div>
    </div>
  );
}

export default CmtPopup;
