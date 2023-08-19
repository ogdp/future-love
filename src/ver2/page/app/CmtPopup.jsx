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
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const handleOpenImagePopup = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImagePopupOpen(true);

  };
  const closePopup = () => {
    props.setIsOpenPopup(false);

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
  const userAgent = window.navigator.userAgent;

  // Tách thông tin trình duyệt và phiên bản từ chuỗi User-Agent
  const browserInfo = userAgent.match(/(chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i);
  const browserName = browserInfo[1];
  const browserVersion = browserInfo[2];

  console.log("Browser:", browserName);
  console.log("Version:", browserVersion);


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
  // const deviceCmt = `${platform}-${browserName}-verson${browserVersion}`;


  const HandleSendCmt = async (e) => {
    const url = "http://14.225.7.221:8989/lovehistory/comment";
    let comment = {};
    // if (user !== null) {
    // }

    comment = {
      device_cmt: userAgent,
      id_toan_bo_su_kien: param.id,
      ipComment: ipComment,
      so_thu_tu_su_kien: props.data.so_thu_tu_su_kien,
      imageattach: imgComment ? imgComment : "",
      id_user: user?.id_user,
      location: location.city,
    };

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
                  <div
                    className="flex flex-col gap-x-2 font-[Montserrat]"
                  >
                    <span className="lg:text-[18px] text-lg font-semibold">
                      {cmt.user_name ? cmt.user_name : "Guest"}
                    </span>
                    <span
                      className="lg:text-[16px] text-base mt-3 max-w-[25vw] "
                      style={{ whiteSpace: "pre-wrap" }}                      
                    > 
                      {cmt.noi_dung_cmt}
                    </span>
                    {cmt.imageattach ? (
                      <img
                        className="w-[60px] h-[50px]"
                        src={cmt.imageattach}
                        alt=""
                        onClick={() => handleOpenImagePopup(cmt.imageattach)}
                      />
                    ) : (
                      ""
                    )}
                    <span className="lg:text-base text-sm">{cmt.device_cmt}</span>
                  </div>

                  <div className="lg:text-[13px] text-sm ml-auto font-[Montserrat]">
                    {cmt.thoi_gian_release}
                  </div>
                  <div className="lg:w-[15%] w-[20%] lg:text-[13px] text-sm font-[Montserrat]">
                    <p> {cmt.dia_chi_ip}</p>
                    <p> {cmt.location}</p>
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
                <textarea 
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  className=" w-full h-[50px] border-none outline-none font-[Montserrat]"
                ></textarea>
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
      {isImagePopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="max-w-screen-xl w-80% p-4 bg-white rounded-lg shadow-lg text-center relative">
            <button
              onClick={() => setIsImagePopupOpen(false)}
              className="mt-2 mr-2 px-2 py-1 bg-red-500 hover:bg-red-600 rounded-lg absolute top-0 right-0 text-sm text-white"
            >
              Close
            </button>
            <img
              src={selectedImage}
              alt="Ảnh lớn"
              className="w-100 h-auto mx-auto z-99999"
              style={{ maxHeight: "80vh" }}
            />
          </div>
        </div>
      )}
    </div>

  );
}

export default CmtPopup;
