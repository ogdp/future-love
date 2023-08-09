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

import * as faceapi from "face-api.js";
import "../css/AddEvent.css";
import RenderRandomWaitImage from "../components/randomImages";

function Home() {
  const Api_key = "892b947dfa3a2a18ccb9574d2c1fe14e";
  const server = "http://14.225.7.221:8989/getdata";
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
  const [showImg, setShowImg] = useState({ img1: null, img2: null });
  const [randomImages, setRandomImages] = useState(null);
  const [isModelWarning, setIsModelWarning] = useState(false);
  const [modelAlert, setModelAlert] = useState({ status: false, message: "" });

  //
  useEffect(() => {
    loadModels();
  }, []);
  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      // faceDetection();
    });
  };
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
    try {
      const imageElement = document.createElement("img");
      imageElement.src = image;
      const netInput = imageElement;
      // console.log(netInput); // object img with src = blob:....
      const detections = await faceapi
        .detectAllFaces(netInput, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      return detections;
    } catch (error) {
      console.log(error);
    }
  };

  const validateImgage = (res) => {
    if (!res || res == null || res.length > 1 || res.length == 0)
      return setModelAlert({
        status: true,
        message: "Ảnh chỉ được chứa 1 khuôn mặt",
      });

    const face_height = res[0].detection._box._height;
    const face_width = res[0].detection._box._width;
    const img_height = res[0].detection._imageDims._height;
    const img_width = res[0].detection._imageDims._width;
    if (img_width < 416 || img_height < 416) {
      return setModelAlert({
        status: true,
        message: "Kích thước hình ảnh quá nhỏ",
      });
    }

    if (img_height / img_width < 0.6 || img_width / img_height < 0.6) {
      return setModelAlert({
        status: true,
        message: "Ảnh không được quá dài hay quá rộng",
      });
    }

    if (img_width < 1000 && img_height < 1000) {
      if (416 < img_width && 416 < img_height) {
        if (
          ((face_height * face_width) / (img_height * img_width)) * 100 >
          50
        ) {
          return setModelAlert({
            status: true,
            message: "Tỉ lệ khuôn mặt chiếm quá lớn khung hình",
          });
        }

        if (
          ((face_height * face_width) / (img_height * img_width)) * 100 <
          15
        ) {
          return setModelAlert({
            status: true,
            message: `Tỉ lệ khuôn mặt quá bé`,
          });
        }
      }
    } else if (img_width > 1000 && img_height > 1000) {
      if (((face_height * face_width) / (img_height * img_width)) * 100 > 50) {
        return setModelAlert({
          status: true,
          message: "Tỉ lệ khuôn mặt chiếm quá lớn khung hình",
        });
      }

      if (((face_height * face_width) / (img_height * img_width)) * 100 < 10) {
        return setModelAlert({
          status: true,
          message: `Tỉ lệ khuôn mặt quá bé`,
        });
      }
    }

    return true;
  };

  const handleChangeImage = async (event, setImage, atImg) => {
    let file = event.target.files[0];
    if (!file) {
      return;
    }
    setIsLoading(true);
    try {
      if (!URL.createObjectURL(file)) return setShowModal(true);
      const res = await validImage(URL.createObjectURL(file));
      // console.log(res);
      setIsLoading(false);
      if (validateImgage(res) == undefined) return;
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
    const user = JSON.parse(window.localStorage.getItem("user-info"));
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${server}?device_them_su_kien=1.1.1.1&ip_them_su_kien=1.1.1.1&id_user=${user.id_user}&ten_nam=NguyenVanA&ten_nu=TranThiB`,
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

  const funcModelAlert = () => {
    if (modelAlert.status) {
      return (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-96 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 slab text-3xl leading-relaxed">
                    {modelAlert.message}
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-[#FF2C61] slab hover:bg-[#ED709D] hover:text-white font-bold uppercase px-6 py-3 rounded-xl text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setModelAlert({ status: false, message: "" });
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
      );
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${imgBg})` }}
      className="bg-no-repeat bg-cover"
    >
      <Header />
      <div className="flex justify-center max-lg:mt-11 mb-24">
        <Clock check={randomImages} />
      </div>
      {randomImages !== null && (
        <RenderRandomWaitImage images1={randomImages} />
      )}
      {isLoading ? renderLoading() : ""}
      {modelAlert.status ? funcModelAlert() : ""}
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
      {/* MOBILE */}

      <div className="flex justify-between mx-9 pb-32 lg:hidden">
        <div>
          <div
            style={{
              backgroundImage: `url(${nam2})`,
              height: `120px`,
              width: `116px`,
            }}
            alt=""
            className="relative"
          >
            <div
              className="absolute top-[5%] right-[12.5%]  cursor-pointer w-[95px] h-[95.5px]  rounded-[50%] mt-4 bg-center bg-no-repeat bg-cover"
              style={
                showImg.img1
                  ? { backgroundImage: `url(${showImg.img1})` }
                  : null
              }
            ></div>
            <input
              onChange={(e) => handleChangeImage(e, setImage1, "img1")}
              id="img1"
              style={
                image1
                  ? { backgroundImage: `url(${image1})` }
                  : { backgroundImage: `url(${uil})` }
              }
              type="file"
              accept="image/*"
              className={
                image1
                  ? " opacity-0 cursor-pointer w-[95px] h-[95.5px] rounded-[50%] absolute bg-center bg-no-repeat bg-cover"
                  : "opacity-0 cursor-pointer w-[95px] h-[95.5px] rounded-[50%] absolute bg-center bg-no-repeat"
              }
            />
          </div>

          <div className="text-center lg:mt-16 text-3xl slab text-[#7A1E3E] font-semibold">
            Your Name Here!
          </div>
        </div>

        {/*  */}
        <div
          onClick={() => fetchData()}
          className="flex justify-center items-center transition-transform duration-300 hover:scale-125 mx-auto"
        >
          <img
            src={bsHeart}
            alt=""
            className="cursor-pointer lg:w-32 lg:h-28 W-[70px] h-[90px] bg-center bg-no-repeat"
          />
        </div>
        {/*  */}

        <div>
          <div
            style={{
              backgroundImage: `url(${nu2})`,
              height: `120px`,
              width: `116px`,
            }}
            alt=""
            className="relative"
          >
            <div
              className="absolute top-[-9.5%] right-[2%]  cursor-pointer w-[95px] h-[95.5px]  rounded-[50%] mt-4 bg-center bg-no-repeat bg-cover"
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
                  ? " opacity-0 cursor-pointer w-[95px] h-[95.5px] rounded-[50%] absolute bg-center bg-no-repeat bg-cover"
                  : "opacity-0 cursor-pointer w-[95px] h-[95.5px] rounded-[50%] absolute bg-center bg-no-repeat"
              }
            />
          </div>
          <div className="text-center lg:mt-16 text-3xl slab text-[#7A1E3E] font-semibold">
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
