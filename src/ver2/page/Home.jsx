import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import boy from "../components/image/nam.png";
import boyM from "../components/image/Component131.png";
import girlM from "../components/image/Component130.png";
import uilPlus from "../components/image/uil_plus.png";
import girl from "../components/image/nu.png";
import heart from "../components/image/heart.png";
import imgBg from "../components/image/backgroundLove.jpg";
import { BsFillHeartFill } from "react-icons/bs";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Clock from "../components/clock";
import {
  getFullFaceDescription,
  createMatcher,
  loadModels,
} from "../../api/face";
import "../css/AddEvent.css";
import RenderRandomWaitImage from "../components/randomImages";

const JSON_PROFILE = require("../../descriptors/bnk48.json");
// Initial State
const INIT_STATE = {
  imageURL: null,
  fullDesc: null,
  detections: null,
  descriptors: null,
  match: null,
};

//
function Home() {
  const Api_key = "892b947dfa3a2a18ccb9574d2c1fe14e";
  const server =
    "http://14.225.7.221:8989/getdata?device_them_su_kien=321478&ip_them_su_kien=321478&id_user=1&ten_nam=321478&ten_nu=321478";
  const [showModal, setShowModal] = React.useState(false);
  const [nam1, setBoy] = useState(boy);
  const [nu1, setNu] = useState(girl);
  const [nam2, setBoy2] = useState(boyM);
  const [nu2, setNu2] = useState(girlM);
  const [uil, setUil] = useState(uilPlus);
  const [bsHeart, setHeart] = useState(heart);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [faceMatcher, setFaceMatcher] = useState(null);
  const [dataImg, setDataImg] = useState({ ...INIT_STATE, faceMatcher: null });
  const [showImg, setShowImg] = useState({ img1: null, img2: null });
  const [randomImages, setRandomImages] = useState(null);
  const [isModelWarning, setIsModelWarning] = useState(false);

  //
  useEffect(() => {
    const initialize = async () => {
      try {
        await loadModels();
        setFaceMatcher(await createMatcher(JSON_PROFILE));
      } catch (error) {
        console.log(error);
      }
    };

    initialize();
  }, []);
  const uploadImage = async (image, setImage) => {
    const formData = new FormData();
    formData.append("image", image);
    try {
      if (image) {
        const input = document.getElementById(
          setImage === setImage1 ? "male" : "female"
        );
        if (input) {
          input.style.display = "none";
        }
        const apiResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${Api_key}`,
          formData
        );
        setImage(apiResponse.data.data.url);
        return { success: apiResponse.data.data.url };
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const closeUploadImg = async () => {
    setImage1(null);
    setImage2(null);
    setShowModal(false);
    setIsLoading(false);
    setShowImg({ img1: null, img2: null });
    document.querySelector("#img1").value = "";
    document.querySelector("#img2").value = "";
    return;
  };

  const validImage = async (image) => {
    const send = dataImg;
    try {
      const fullDesc = await getFullFaceDescription(image);
      if (!!fullDesc) {
        send.fullDesc = fullDesc;
        send.detections = fullDesc.map((fd) => fd.detection);
        send.descriptors = fullDesc.map((fd) => fd.descriptor);
      }
      if (!!send.descriptors && !!send.faceMatcher) {
        let match = await send.descriptors.map((descriptor) =>
          send.faceMatcher.findBestMatch(descriptor)
        );
        send.match = match;
      }
      return fullDesc;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeImage = async (event, setImage, atImg) => {
    let file = event.target.files[0];
    if (!file) {
      // closeUploadImg();
      // setShowModal(true);
      return;
    }
    setIsLoading(true);
    try {
      if (!URL.createObjectURL(file)) return setShowModal(true);
      const res = await validImage(URL.createObjectURL(file));
      // console.log(res);
      if (!res || res == null || res.length == 0) return setShowModal(true);
      setIsLoading(false);
      // console.log("hợp lê ::", res);
      if (atImg == "img1") {
        let send = showImg;
        send.img1 = URL.createObjectURL(file);
        setShowImg(send);
        setImage(file);
      } else {
        let send = showImg;
        send.img2 = URL.createObjectURL(file);
        setShowImg(send);
        setImage(file);
      }
    } catch (error) {
      console.log(error);
      setShowModal(true);
      setIsLoading(false);
      closeUploadImg();
    }
  };
  const fetchData = async () => {
    if (image1 == null || image2 == null) return setIsModelWarning(true);
    setIsLoading(true);
    try {
      const res1 = await uploadImage(image1, setImage1);
      const res2 = await uploadImage(image2, setImage2);
      setRandomImages([res1.success, res2.success]);
      const res3 = await createEvent({
        img1: res1.success,
        img2: res2.success,
      });
      if (!res3.success || res3.success == undefined) {
        // setShowModal(true);
        await alert(res3.message);
        return window.location.reload();
      }
      setIsLoading(false);
      if (!res3.success.data.sukien || res3.success.data.sukien.length === 0) {
        await alert("Không nhận được id sự kiện");
        return window.location.reload();
      }
      toast.success("Upload and save data completed successfully");
      navigate("/detail/" + res3.success.data.sukien[0].id_toan_bo_su_kien);
    } catch (error) {
      setRandomImages(null);
      setIsLoading(false);
      console.log(error);
    }
  };
  const createEvent = async (linkImg) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: server,
      headers: {
        Link_img1: String(linkImg.img1),
        Link_img2: String(linkImg.img2),
      },
    };
    try {
      const response = await axios.request(config);
      return { success: response };
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      return error;
    }
  };
  useEffect(
    () => {
      // console.log("effect", image1);
      // console.log("effect", image2);
    },
    [image1],
    [image2]
  );
  const renderLoading = () => {
    if (isLoading) {
      return (
        <div className="fixed top-0 min-w-[100%] h-[100vh] z-30">
          <div className="absolute top-0 min-w-[100%] h-[100vh] bg-red-500 opacity-30 z-10"></div>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
            }}
            className="absolute -translate-x-2/4 opacity-100 -translate-y-2/4 left-2/4 top-2/4 z-20"
          >
            <ReactLoading type={"bars"} color={"#C0C0C0"} />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{ backgroundImage: `url(${imgBg})` }}
      className="bg-no-repeat bg-cover"
    >
      <Header />
      <div className="flex justify-center mt- mb-24">
        <Clock check={randomImages} />
      </div>
      {randomImages !== null && (
        <RenderRandomWaitImage images1={randomImages} />
      )}
      {isLoading ? renderLoading() : ""}
      <div className="lg:block hidden">
        <div className="flex justify-between lg:mx-52 pb-32">
          <div>
            <div
              style={{
                backgroundImage: `url(${nam1})`,
                height: `411px`,
                width: `410px`,
              }}
              alt=""
              className="responsiveImg relative"
            >
              <div
                className="responsiveImg absolute cursor-pointer w-[331px] h-[331px] rounded-[50%] mt-110 ml-6 bg-center bg-no-repeat bg-cover bottom-0 mb-[14px]"
                style={
                  showImg.img1
                    ? { backgroundImage: `url(${showImg.img1})` }
                    : null
                }
              ></div>
              <input
                onChange={(e) => {
                  handleChangeImage(e, setImage1, "img1");
                }}
                style={
                  showImg.img1
                    ? { backgroundImage: `url(${showImg.img1})` }
                    : null
                }
                type="file"
                accept="image/*"
                id="img1"
                className={
                  image1
                    ? " opacity-0 responsiveImg cursor-pointer w-[331px] h-[331px] rounded-[50%] mt-110 ml-6 bg-center bg-no-repeat bg-cover"
                    : " opacity-0 cursor-pointer w-[331px] h-[331px] rounded-[50%] absolute mt-110 ml-6 bg-center bg-no-repeat bg-black"
                }
              />
            </div>
            <div className="text-center lg:mt-16 text-3xl slab text-[#7A1E3E] font-semibold">
              Your Name Here!
            </div>
          </div>

          <div
            onClick={() => fetchData()}
            className="flex justify-center items-center transition-transform duration-300 hover:scale-125 mx-auto"
          >
            <img
              src={bsHeart}
              alt=""
              className="cursor-pointer lg:w-48 lg:h-44 bg-center bg-no-repeat"
            />
          </div>

          {/*  */}
          {/* <div className="flex justify-center items-center transition-transform duration-300 hover:scale-125 ">
          <BsFillHeartFill className="w-48 h-48 text-[#FF9F9F] " />
          <span
            onClick={fetchData}
            className="text-4xl font-bold mt-14 absolute text-[#7A1E3E]"
          >
            Bắt đầu
          </span>
        </div> */}

          {/*  */}
          <div className="">
            <div
              style={{
                backgroundImage: `url(${nu1})`,
                height: `419px`,
                width: `407px`,
              }}
              alt=""
              className=""
            >
              <div
                className="responsiveImg absolute cursor-pointer w-[331px] h-[331px] rounded-[50%] mt-4 ml-24 bg-center bg-no-repeat bg-cover"
                style={
                  showImg.img2
                    ? { backgroundImage: `url(${showImg.img2})` }
                    : null
                }
              ></div>
              <input
                onChange={(e) => handleChangeImage(e, setImage2, "img2")}
                id="img2"
                style={
                  image2
                    ? { backgroundImage: `url(${image2})` }
                    : { backgroundImage: `url(${uil})` }
                }
                type="file"
                accept="image/*"
                className={
                  image2
                    ? " opacity-0 cursor-pointer w-[331px] h-[331px] rounded-[50%] absolute mt-4 ml-24 bg-center bg-no-repeat bg-cover"
                    : "opacity-0 cursor-pointer w-[331px] h-[331px] rounded-[50%] ml-24 mt-4 absolute bg-center bg-no-repeat"
                }
              />
            </div>

            <div className="text-center lg:mt-16 text-3xl slab text-[#7A1E3E] font-semibold">
              Her Name Here!
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-row h-4/5  justify-evenly content-center items-center relative top-32">
        <div className="flex flex-col items-center  relative">
          <img src={boy} alt="" className="w-500 h-500 static" />
          <input
            onChange={(e) => handleChangeImage(e, setImage1)}
            style={{ backgroundImage: `url(${image1})` }}
            type="file"
            className="w-[360px] h-[360px]  rounded-[50%] absolute bottom-8 left-8 z-10 bg-center bg-no-repeat bg-cover bg-[#FFDAB9]"
          />

        </div>

        <div className="flex flex-col items-center transition-transform duration-300 hover:scale-125 ">
          <BsFillHeartFill className="w-48 h-48 text-[#FF9F9F] " />
          <span
            onClick={fetchData}
            className="text-4xl font-bold mt-14 absolute text-[#7A1E3E]"
          >
            Bắt đầu
          </span>
        </div>
        <div className="flex flex-col items-center  relative">
          <img src={girl} alt="" className="w-500 h-500 static" />
          <input
            onChange={(e) => handleChangeImage(e, setImage2)}
            style={{ backgroundImage: `url(${image2})` }}
            type="file"
            className="w-[360px] h-[360px]  rounded-[50%] absolute top-8 right-8  z-10 bg-center bg-no-repeat bg-cover bg-[#FFDAB9] "
          />
        </div>
      </div> */}

      <div className="flex justify-between mx-9 pb-32 lg:hidden">
        <div className="">
          <div
            style={{
              backgroundImage: `url(${nam2})`,
              height: `120px`,
              width: `120px`,
            }}
            alt=""
            className="responsiveImg"
          >
            <div
              className="responsiveImg absolute mt-8 ml-2 cursor-pointer w-[95px] h-[97.5px] rounded-[50%] bg-center bg-no-repeat bg-cover"
              style={image1 ? { backgroundImage: `url(${image1})` } : null}
            >
              <input
                onChange={(e) => handleChangeImage(e, setImage1)}
                style={image1 ? { backgroundImage: `url(${image1})` } : null}
                type="file"
                className={
                  image1
                    ? "opacity-0 responsiveImg cursor-pointer w-[97px] h-[95.5px] rounded-[50%] bg-center bg-no-repeat bg-cover"
                    : "opacity-0 bg-black cursor-pointer w-[97px] h-[95.5px] rounded-[50%] absolute mt-love3 ml-love3 bg-center bg-no-repeat"
                }
              />
            </div>
          </div>
          <div className="text-center mb-64 lg:text-3xl text-2xl mt-4 slab">
            Your Name Here!
          </div>
        </div>

        <div className="flex justify-center -mt-56 items-center transition-transform duration-300 hover:scale-125 mx-auto">
          <img
            src={bsHeart}
            alt=""
            className="cursor-pointer w-24 h-20 bg-center bg-no-repeat"
          />
        </div>

        <div className="">
          <div
            style={{
              backgroundImage: `url(${nu2})`,
              height: `120px`,
              width: `116px`,
            }}
            alt=""
            className="responsiveImg"
          >
            <div
              className="flex justify-center absolute mt-2 responsiveImg cursor-pointer w-[95px] h-[95.5px] rounded-[50%] ml-7 bg-center bg-no-repeat bg-cover"
              style={image2 ? { backgroundImage: `url(${image2})` } : null}
            >
              <input
                onChange={(e) => handleChangeImage(e, setImage2)}
                style={image2 ? { backgroundImage: `url(${image2})` } : null}
                type="file"
                className={
                  image2
                    ? "opacity-0 responsiveImg cursor-pointer w-[95px] h-[95.5px] rounded-[50%] mt-2 ml-7 bg-center bg-no-repeat bg-cover"
                    : "opacity-0 bg-black cursor-pointer w-[95px] h-[95.5px] rounded-[50%] absolute mt-2 ml-7 bg-center bg-no-repeat"
                }
              />
            </div>
          </div>
          <div className="text-center mb-64 lg:text-3xl text-2xl mt-4 slab">
            Her Name Here!
          </div>
        </div>
      </div>

      {isModelWarning ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-96 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 slab text-3xl leading-relaxed">
                    Hãy chọn ảnh để tiếp tục
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-[#FF2C61] slab hover:bg-[#ED709D] hover:text-white font-bold uppercase px-6 py-3 rounded-xl text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setIsModelWarning(false);
                    }}
                  >
                    Tiếp tục
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-96 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 slab text-3xl leading-relaxed">
                    Không nhận diện được khuôn mặt
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-[#FF2C61] slab hover:bg-[#ED709D] hover:text-white font-bold uppercase px-6 py-3 rounded-xl text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      closeUploadImg();
                    }}
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {/* footer */}

      <div className="ocean">
        <div className="wave absolute"></div>
        <div className="wave2"></div>
      </div>
    </div>
  );
}

export default Home;
