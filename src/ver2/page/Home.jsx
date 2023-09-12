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
import { async } from "q";

function Home() {
  const Api_key = "ba35005b6d728bd9197bfd95d64e4e39";
  const server = "https://sakaivn.online";
  const serverGenarateSK = "https://petizen.click";
  // const server = "http://103.141.140.150:8000/getdata";
  const [showModal, setShowModal] = React.useState(false);
  const [nam1, setBoy] = useState(boy);
  const [nu1, setNu] = useState(girl);
  const [nam2, setBoy2] = useState(boyM);
  const [nu2, setNu2] = useState(girlM);
  const [uil, setUil] = useState(uilPlus);
  const [bsHeart, setHeart] = useState(heart);
  const [nameMale, setNameMale] = useState("");
  const [nameFemale, setNameFemale] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showImg, setShowImg] = useState({ img1: null, img2: null });
  const [randomImages, setRandomImages] = useState(null);
  const [isModelWarning, setIsModelWarning] = useState(false);
  const [modelAlert, setModelAlert] = useState({ status: false, message: "" });
  const [sameFace, setSameFace] = useState({
    img1: null,
    img2: null,
  });

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
      faceapi.nets.ssdMobilenetv1.loadFromUri("./models"),
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
      let detections = await faceapi
        .detectAllFaces(netInput, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      const detections2 = await faceapi
        .detectAllFaces(netInput, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceExpressions();
      if (detections2.length == 0) return detections2;
      return detections;
    } catch (error) {
      console.log(error);
    }
  };

  const validateImgage = (res) => {
    if (!res || res == null || res.length > 1 || res.length == 0)
      return setModelAlert({
        status: true,
        message: "Photos can only contain 1 face",
      });
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
      atImg === "img1"
        ? setSameFace({
            img1: res[0]?.detection?._score,
            img2: sameFace.img2,
          })
        : setSameFace({
            img1: sameFace.img1,
            img2: res[0]?.detection?._score,
          });
      if (
        sameFace.img1 === res[0]?.detection?._score ||
        sameFace.img2 === res[0]?.detection?._score
      ) {
        setIsLoading(false);
        closeUploadImg();
        return setModelAlert({
          status: true,
          message: "Photos cannot be the same",
        });
      }
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

  const getMyDetailUser = async () => {
    try {
      const { data } = await axios.get("https://api.ipify.org/?format=json");
      // console.log(data);
      if (data.ip) {
        // const res = await axios.get(
        //   `http://ip-api.com/json/${data.ip}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query`
        // );
        const browser = window.navigator.userAgent;
        return {
          browser: browser,
          ip: data.ip,
        };
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const fetchData = async () => {
    if (image1 == null || image2 == null) return setIsModelWarning(true);
    if (nameFemale == "" || nameMale == "")
      return setModelAlert({
        status: true,
        message: "Name male or female is required",
      });
    setIsLoading(true);
    try {
      // Get device
      const res1 = await uploadImage(image1, setImage1);
      if (!res1) return alert("Fail API upload image");
      const res2 = await uploadImage(image2, setImage2);
      if (!res2) return alert("Fail API upload image");
      const device = await getMyDetailUser();
      console.log("hihi",device)
      setRandomImages([res1.success, res2.success]);
      const res3 = await createEvent(
        {
          img1: res1.success,
          img2: res2.success,
        },
        device.browser,
        device.ip,
        nameMale,
        nameFemale
      );
      if (res3 == false) {
        setModelAlert({
          status: true,
          message: `Login to add events`,
        });
        return navigate("/login");
      }
      if (!res3.success || res3.success == undefined) {
        // setShowModal(true);
        await alert(res3.message);
        return window.location.reload();
      }
      setIsLoading(false);
      if (!res3.success.data.sukien || res3.success.data.sukien.length === 0) {
        await alert("Didn't get event id");
        return window.location.reload();
      }
      toast.success("Upload and save data completed successfully");
      navigate(
        "/detail/" + res3.success.data.sukien[0].id_toan_bo_su_kien + "/1"
      );
    } catch (error) {
      setRandomImages(null);
      setIsLoading(false);
      console.log(error);
    }
  };
  const createEvent = async (linkImg, browser, ip, male, female) => {
    const user = JSON.parse(window.localStorage.getItem("user-info"));
    if (!user) return false;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${serverGenarateSK}/getdata?device_them_su_kien=${browser}&ip_them_su_kien=${ip}&id_user=${user.id_user}&ten_nam=${male}&ten_nu=${female}`,
      headers: {
        Link1: String(linkImg.img1),
        Link2: String(linkImg.img2),
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
                    Close
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
              {/* MALE */}
              <div className="my-2 border mx-auto w-10/12 justify-center flex items-center rounded-md shadow-md">
                <div>
                  <button
                    type=" submit"
                    className="flex items-center bg-gray-100 rounded-l-md border border-white justify-center w-[36px] h-[36px] text-white "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={26}
                      height={26}
                      viewBox="0 0 24 24"
                      style={{
                        fill: "rgba(0, 0, 0, 1)",
                        transform: "",
                        msfilter: "",
                      }}
                    >
                      <circle cx={12} cy={4} r={2} />
                      <path d="M15 7H9a1 1 0 0 0-1 1v7h2v7h4v-7h2V8a1 1 0 0 0-1-1z" />
                    </svg>
                  </button>
                </div>
                <div className="w-full">
                  <input
                    type="search"
                    x-model="input1"
                    className="w-full h-[36px] px-4 py-4 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                    placeholder="Name Male"
                    onChange={(e) => setNameMale(e.target.value)}
                  />
                </div>
              </div>
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
              {/* FEMALE */}
              <div className="my-2 border mx-auto w-10/12 justify-center flex items-center rounded-md shadow-md">
                <div>
                  <button
                    type=" submit"
                    className="flex items-center bg-gray-100 rounded-l-md border border-white justify-center w-[36px] h-[36px] text-white "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={26}
                      height={26}
                      viewBox="0 0 24 24"
                      style={{
                        fill: "rgba(0, 0, 0, 1)",
                        transform: "",
                        msfilter: "",
                      }}
                    >
                      <circle cx={12} cy={4} r={2} />
                      <path d="M14.948 7.684A.997.997 0 0 0 14 7h-4a.998.998 0 0 0-.948.684l-2 6 1.775.593L8 18h2v4h4v-4h2l-.827-3.724 1.775-.593-2-5.999z" />
                    </svg>
                  </button>
                </div>
                <div className="  w-full">
                  <input
                    type="search"
                    x-model="input1"
                    className="w-full h-[36px] px-4 py-4 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                    placeholder="Name Female"
                    onChange={(e) => setNameFemale(e.target.value)}
                  />
                </div>
              </div>
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

          <div className="text-center lg:mt-16 my-3 text-2xl slab text-[#7A1E3E] font-semibold">
            {/* MALE */}
            <div className="my-2 border mx-auto w-10/12 justify-center flex items-center rounded-md shadow-md">
              <div className="w-full max-w-[120px]">
                <input
                  type="search"
                  x-model="input1"
                  className="w-full h-[28px] px-4 py-4 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                  placeholder="Male"
                  onChange={(e) => setNameMale(e.target.value)}
                />
              </div>
            </div>
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
          <div className="text-center lg:mt-16 my-3  text-2xl slab text-[#7A1E3E] font-semibold">
            {/* FEMALE */}
            <div className="my-2 border mx-auto w-10/12 justify-center flex items-center rounded-md shadow-md">
              <div className="w-full max-w-[120px]">
                <input
                  type="search"
                  x-model="input1"
                  className="w-full h-[28px] px-4 py-4 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                  placeholder="Female"
                  onChange={(e) => setNameFemale(e.target.value)}
                />
              </div>
            </div>
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
                    Please select a photo to continue
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
                    Continue
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
                    Can't recognize faces
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
                    Close
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
