import React, { useEffect, useState } from "react";
import img2 from "../components/image/Rectangle4958.png";
import Header from "../components/Header";
import axios from "axios";
import Comments from "../components/comments";
import useEventStore from "../../utils/store";

import ReactLoading from "react-loading";
import {
  getFullFaceDescription,
  createMatcher,
  loadModels,
} from "../../api/face";
import { toast } from "react-toastify";

export default function () {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [showModals, setShowModals] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("user-info"));
  const [imgdata, setImgData] = useState([]);

  const api_key = "892b947dfa3a2a18ccb9574d2c1fe14e";
  const server = "http://14.225.7.221:8989";
  const [notiImage, setNotiImage] = React.useState({
    status: false,
    value: null,
  });
  const [imageVerify, setImageVerify] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [imgSucess, setImgSucces] = React.useState([
    "https://i.ibb.co/qmpDk2W/Man-Big-Shoes-Avatar.png",
  ]);
  const [imgError, setImgError] = React.useState([
    "https://i.ibb.co/vBNPH32/Not-Face-Girl-Big-Shoes-Avatar.png",
  ]);

  const [selectedImage, setSelectedImage] = useState(null);

  //UploadedAvatar
  const UploadedAvatar = async () => {
    const list_img = {};
    try {
      if (selectedImage) {
        const res = await uploadImage(selectedImage);
        if (res.success) {
          console.log("Image uploaded:", res.success);
          const user = JSON.parse(window.localStorage.getItem("user-info"));
          if (!user) return window.location.href("/");

          // Post the image URL to your server (you need to adjust the server URL and endpoint)
          await axios.post(`${server}/saveimage/${user.user_name}`, {
            image: res.success,
          });

          // Clear the selected image after successful upload
          setSelectedImage(null);

          // Other actions after successful upload
          setIsLoading(false);
          resetImgShow();
          toast.success("Upload and save data completed successfully");
          setShowModals(false);
        } else {
          console.log("Image upload failed.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  //hiện thị ảnh
  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://14.225.7.221:8989/saveimage/1`
        );
        const jsonData = response.data.list_img; // Adjust this based on the API response structure
        setImgData(jsonData);
        console.log("jsonData", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    console.log("user", user.id_user);
    fetchData();
  }, []);

  //hiện thị avatar
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://14.225.7.221:8989/profile/${user.id_user}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData);
      console.log("hehee", jsonData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModals = () => {
    setShowModals(true);
  };

  const closeModals = () => {
    setShowModals(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  //comments
  const [datas, setDatas] = useState([]);
  const setEvent = useEventStore((state) => state.setEvent);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  const fetchDatas = async () => {
    try {
      const res = await axios.get(
        `http://14.225.7.221:8989/lovehistory/pageComment/1`
      );
      setDatas(res.data.comment);
      setEvent(res.data);
      console.log(res);
      const ipAddress = data.dia_chi_ip; // Lấy địa chỉ IP từ dữ liệu response
      console.log(`Địa chỉ IP của bạn là: ${ipAddress}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const dataSort = datas.sort((a, b) => {
    const dateA = new Date(a.thoi_gian_release);
    const dateB = new Date(b.thoi_gian_release);

    return dateB - dateA;
  });

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = dataSort.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(dataSort.length / resultsPerPage);
  // ---end commnets

  //   Upload from 8-> 12 images
  //

  const onHandleUploadImage = async () => {
    const list_img = {};
    try {
      setIsLoading(true);
      for (const [i, file] of imageVerify.entries()) {
        const res = await uploadImage(file);
        list_img[`'${i + 1}'`] = res.success;
      }
      const user = JSON.parse(window.localStorage.getItem("user-info"));
      if (!user) return window.location.href("/");
      const res = await axios.post(
        `${server}/saveimage/${user.user_name}`,
        list_img
      );
      setIsLoading(false);
      resetImgShow();
      toast.success("Upload and save data completed successfully");
      setShowModals(false);
      setImgSucces(["https://i.ibb.co/qmpDk2W/Man-Big-Shoes-Avatar.png"]);
      setImgError([
        "https://i.ibb.co/vBNPH32/Not-Face-Girl-Big-Shoes-Avatar.png",
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        await loadModels();
      } catch (error) {
        console.log(error);
      }
    };

    initialize();
  }, []);
  const resetImgShow = () => {
    setImgSucces([]);
    setImgError([]);
    setImageVerify([]);
  };

  const onChangeImage = async (event) => {
    const files = event.target.files;
    if (files.length < 8) {
      return setNotiImage({ status: true, value: "Minimum 8 images" });
    }
    if (files.length > 12) {
      return setNotiImage({ status: true, value: "Up to 12 images" });
    }
    resetImgShow();
    setIsLoading(true);
    const imgSuccess = [];
    const imgError = [];
    const imgVerify = [];
    for (const file of files) {
      try {
        const res = await validImage(URL.createObjectURL(file));
        if (!res || res == null || res.length == 0) {
          imgError.push(URL.createObjectURL(file));
        } else {
          imgSuccess.push(URL.createObjectURL(file));
          imgVerify.push(file);
        }
      } catch (error) {
        console.log(error);
        alert("Lỗi xử lý hình ảnh");
      }
    }
    setImgError(imgError);
    setImgSucces(imgSuccess);
    setImageVerify(imgVerify);
    setIsLoading(false);
    return;
  };

  const validImage = async (image) => {
    const send = {
      fullDesc: null,
      detections: null,
      descriptors: null,
      faceMatcher: null,
      match: null,
    };
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

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    try {
      if (image) {
        const apiResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${api_key}`,
          formData
        );
        return { success: apiResponse.data.data.url };
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const renderLoading = () => {
    if (isLoading) {
      return (
        <div className="fixed top-0 min-w-[100%] h-[100vh] z-30">
          <div className="absolute top-0 min-w-[100%] h-[100vh] bg-black opacity-70 z-10"></div>
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

  // --- End

  return (
    <div className="bg-slate-300 w-[100%] h-full">
      {notiImage.status ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-96 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 slab text-3xl leading-relaxed">
                    {notiImage.value}
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-[#FF2C61] slab hover:bg-[#ED709D] hover:text-white font-bold uppercase px-6 py-3 rounded-xl text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setNotiImage({ status: false, value: null });
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
      <div className="h-full">
        <div
          style={{ backgroundImage: `url(${img2})` }}
          className="lg:w-[100%] h-[250px] rounded-b-3xl bg-no-repeat bg-cover "
        >
          <Header />
        </div>
        {setIsLoading ? renderLoading() : null}
        <div className="lg:flex lg:justify-around ">
          <div className="relative -top-28 left-16 rounded-3xl lg:w-[450px] lg:h-[200px] w-[330px] h-[250px] bg-gradient-to-r from-violet-500 to-fuchsia-400">
            <div className="mt-4 ml-8 ">
              <img
                src={data.link_avatar}
                className="lg:ml-1 ml-40 lg:w-[130px] lg:h-[130px] w-[100px] h-[100px] border border-white rounded-full "
              ></img>
              <h1 className="lg:ml-1 ml-36 text-5xl text-white">Username</h1>
              <div className="lg:relative -top-52 left-56 mt-2">
                <div className="flex justify-around lg:w-[300px]">
                  <div className="text-3xl text-white">
                    <h1 className="ml-8">{data.count_sukien}</h1>
                    <p>Events</p>
                  </div>
                  <div className="text-3xl text-white">
                    <h1>{data.count_view}</h1>
                    <p>View</p>
                  </div>
                  <div className="text-3xl text-white">
                    <h1 className="ml-10">{data.count_comment}</h1>
                    <p>Comments</p>
                  </div>
                </div>
                <button className=" lg:ml-36 ml-40 mt-10 bg-white shadow-gray-500 rounded-full w-[100px] h-[30px]">
                  View Events
                </button>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={() => openModal()}
              className="lg:mt-20 ml-48 -mt-60 my-2 bg-white shadow-gray-500 rounded-full w-[150px] h-[25px]"
            >
              Edit your profile
            </button>
            {showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative lg:w-[1000px] h-[600px] mt-60 max-w-3xl">
                    <div className="border-0 lg:w-[500px] w-[300px] rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                      <div className="relative p-6 flex-auto h-[400px]">
                        <p className="my-4 text-center text-black-500 slab text-3xl leading-relaxed">
                          Edit Profile
                        </p>
                        <div className="flex lg:justify-around justify-evenly mt-10 text-3xl text-black">
                          <div className="-ml-14">
                            <h1>Avatar</h1>
                          </div>
                          <div className="mt-10 ">
                            <img
                              src={data.link_avatar}
                              className="lg:w-[130px] lg:h-[130px] w-[100px] h-[100px] border border-white rounded-full"
                            ></img>
                          </div>
                          <div>
                            <button
                              onClick={() => openModals()}
                              className=" bg-white shadow-gray-500 rounded-full w-[50px] h-[30px] -mr-11"
                            >
                              edit
                            </button>
                            {/* ---- */}
                            {showModals ? (
                              <>
                                <div className="justify-center items-center flex overflow-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                  <div className="relative w-[1000px] h-[600px]  max-w-3xl">
                                    <div className="lg:-ml-16 ml-6 lg:w-[700px] w-[400px] border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                                      <div className="relative p-6 flex-auto  lg:h-[800px] h-[700px]">
                                        <p className=" text-center text-black-500 slab text-3xl leading-relaxed text-black">
                                          Update Avatar
                                        </p>
                                        <div className="mt-10 text-3xl text-black">
                                          <div>
                                            <h1>Suggestion</h1>
                                          </div>
                                          <div className="grid lg:grid-cols-6 gap-x-8 gap-y-4 grid-cols-3 overflow-auto h-[120px]">
                                            {imgdata.map((item, index) => (
                                              <div
                                                key={index}
                                                className="w-[100px] h-[100px] border-2 border-indigo-600"
                                              >
                                                {/* <input type='file' className='w-[100px] h-[100px]'></input> */}
                                                <img
                                                  src={item}
                                                  className="w-[100px] h-[100px]"
                                                  type="file"
                                                ></img>
                                              </div>
                                            ))}
                                          </div>
                                          <h1 className="text-center mt-6">
                                            View More
                                          </h1>
                                        </div>
                                        <div className="mt-10">
                                          <div className="flex justify-between mt-10 text-3xl text-black">
                                            <div>
                                              <h1>Uploaded Avatar</h1>
                                            </div>

                                            <div>
                                              <button
                                                onClick={UploadedAvatar}
                                                className="bg-white shadow-gray-500 rounded-full w-[50px] h-[30px]"
                                              >
                                                ảnh
                                              </button>
                                              <input
                                                type="file"
                                                onChange={handleImageChange}
                                              />
                                            </div>
                                          </div>
                                          <div className="grid lg:grid-cols-6 gap-x-8 gap-y-4 grid-cols-3 overflow-auto h-[120px]">
                                            {/* {
                                              selectedImage.map((item) => ( */}
                                            <div className="w-[100px] h-[100px] border-2 border-indigo-600">
                                              {selectedImage && (
                                                <img
                                                  src={URL.createObjectURL(
                                                    selectedImage
                                                  )}
                                                  className="w-[100px] h-[100px]"
                                                  alt="Selected"
                                                />
                                              )}
                                            </div>
                                            {/* ))
                                            } */}
                                          </div>
                                          <h1 className="text-center mt-6">
                                            View More
                                          </h1>
                                        </div>
                                        <div className="mt-10">
                                          <div className="flex justify-between mt-10 text-3xl text-black">
                                            <div>
                                              <h1>Your Gallery</h1>
                                            </div>
                                          </div>
                                          <div className="grid lg:grid-cols-6 gap-x-8 gap-y-4 grid-cols-3 overflow-auto h-[120px]">
                                            {imgdata.map((item, index) => (
                                              <div
                                                key={index}
                                                className="w-[100px] h-[100px] border-2 border-indigo-600"
                                              >
                                                <img
                                                  src={item}
                                                  className="w-[100px] h-[100px]"
                                                  type="file"
                                                />
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                        <div className="mt-10">
                                          <h1 className="text-center">
                                            Access Your Gallery
                                          </h1>
                                          <div className="flex justify-between mt-10 text-3xl text-black">
                                            <button className="lg:ml-80 ml-20 text-white bg-gray-500 shadow-white rounded-full w-[250px] h-[30px]">
                                              Update Avatar
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="relative lg:left-[640px] lg:-top-[800px] left-[340px] -top-[700px] w-[50px] flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                          className="text-[#FF2C61] slab hover:bg-[#ED709D] hover:text-white font-bold uppercase px-6 py-3 rounded-xl text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                          type="button"
                                          onClick={() => closeModals()}
                                        >
                                          *
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                              </>
                            ) : null}
                            {/* -----end--- */}
                          </div>
                        </div>
                        <div className="flex lg:justify-around justify-evenly mt-10 text-3xl text-black">
                          <div>
                            <h1>Cover Pic</h1>
                          </div>
                          <div className="mt-16">
                            <img
                              src={data.link_avatar}
                              className="lg:w-[280px] lg:h-[130px] w-[200px] h-[100px] border border-white"
                            ></img>
                          </div>
                          <div>
                            <button className=" bg-white shadow-gray-500 rounded-full w-[50px] h-[30px]">
                              edit
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative lg:left-[420px] lg:-top-[400px] left-[250px] -top-[400px] w-[50px] flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-[#FF2C61] slab hover:bg-[#ED709D] hover:text-white font-bold uppercase px-6 py-3 rounded-xl text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => closeModal()}
                        >
                          *
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </div>
        </div>
        <div className="bg-amber-400 w-screen h-[50px] text-1xl sticky top-[400px] mb-8 -mt-20">
          <div className="flex justify-center pt-6">
            <div className="mt-2">You haven't finished the procedure yet</div>
            <div className="mx-8">
              <button
                onClick={() => openModals()}
                className=" bg-white shadow-gray-500 rounded-full w-[150px] h-[25px]"
              >
                Complete your profile
              </button>
              {showModals ? (
                <>
                  <div className="justify-center items-center flex overflow-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-[1000px]  max-w-3xl">
                      <div className="lg:-ml-16 ml-6 lg:w-[680px] lg:py-4 lg:px-8 w-[400px] border-0 rounded-lg shadow-lg relative flex flex-col bg-black outline-none focus:outline-none">
                        <div className="relative px-10 flex-auto  lg:h-[700px] h-[600px] text-white">
                          <h1 className=" text-center text-black-500 slab max-lg:pt-8 text-4xl md:text-[32px] leading-relaxed text-white">
                            Complete profile
                          </h1>
                          <p className=" text-black-500 slab text-4xl leading-relaxed text-white max-lg:text-3xl">
                            Pick 8-12 photos of yourself
                          </p>
                          <div className="md:mt-10 text-3xl text-white">
                            <div className="my-8">
                              <h1 className="text-4xl text-green-600 flex md:py-1">
                                <img
                                  className="h-[30px]"
                                  src="https://png.pngtree.com/png-vector/20221215/ourmid/pngtree-green-check-mark-png-image_6525691.png"
                                  alt=""
                                />{" "}
                                Good photos
                              </h1>
                              <p className="w-[350px] max-lg:text-2xl">
                                close-up selfies, same subject, variety of
                                background, expressions and face angles
                              </p>
                            </div>

                            <div className="flex gap-3 overflow-x-scroll">
                              {imgSucess?.map((item, index) => (
                                <div
                                  key={index}
                                  className="relative lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] rounded-lg overflow-hidden"
                                >
                                  <img
                                    src={item}
                                    alt=""
                                    className="lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] object-cover"
                                  />
                                  <img
                                    src="https://png.pngtree.com/png-vector/20221215/ourmid/pngtree-green-check-mark-png-image_6525691.png"
                                    className="absolute h-[25px] bottom-0 right-3"
                                    alt=""
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="md:mt-10 text-3xl text-white">
                            <div className="my-8">
                              <h1 className="text-4xl text-red-600 flex md:py-1">
                                <img
                                  className="h-[30px]"
                                  src="https://i.ibb.co/bJ517B1/close-removebg-preview.png"
                                  alt=""
                                />{" "}
                                Bad photos
                              </h1>
                              <p className="w-[350px] max-lg:text-2xl">
                                Group pics, face small or not visible, sunglass,
                                animal
                              </p>
                            </div>
                            <div className="flex gap-3 overflow-x-scroll">
                              {imgError?.map((item, index) => (
                                <div
                                  key={index}
                                  className="relative lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] rounded-lg overflow-hidden"
                                >
                                  <img
                                    src={item}
                                    alt=""
                                    className="lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] object-cover"
                                  />
                                  <img
                                    src="https://i.ibb.co/bJ517B1/close-removebg-preview.png"
                                    className="absolute h-[25px] bottom-0 right-3"
                                    alt=""
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-10">
                            <div className="text-3xl text-white">
                              <div>
                                <h1 className="lg:w-[550px] w-[300px] max-lg:text-2xl">
                                  Your photos will be deleted permanetly from
                                  our servers within 24h, and won’t be used for
                                  any other purpose
                                </h1>
                              </div>
                            </div>
                          </div>

                          {imgSucess?.length >= 8 ? (
                            <div className="mt-10 py-3">
                              <div className="flex justify-between mt-10 text-3xl text-black">
                                <div className="flex items-center justify-center w-full max-md:py-4 text-gray-300 hover:text-gray-100">
                                  <button
                                    onClick={() => onHandleUploadImage()}
                                    className="mb-2 text-sm  dark:text-gray-400 bg-slate-200 text-black rounded-full py-3 px-20 hover:scale-110 hover:bg-slate-100"
                                  >
                                    <span className="font-semibold text-4xl">
                                      Upload
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-10">
                              <div className="flex justify-between mt-10 text-3xl text-black">
                                <div className="flex items-center justify-center w-full max-md:py-4 text-gray-300 hover:text-gray-100">
                                  <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col items-center justify-center w-full cursor-pointer"
                                  >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-1">
                                      <svg
                                        className="w-8 h-8  dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                      >
                                        <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                      </svg>
                                      <p className="mb-2 text-sm  dark:text-gray-400">
                                        <span className="font-semibold text-4xl">
                                          Select 8-12 Photos
                                        </span>
                                      </p>
                                      <p className="text-xs  dark:text-gray-400">
                                        PNG, JPG
                                      </p>
                                    </div>
                                    <input
                                      id="dropzone-file"
                                      type="file"
                                      className="hidden"
                                      multiple
                                      accept="image/*"
                                      onChange={(e) => onChangeImage(e)}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="relative lg:left-[540px] lg:-top-[700px] left-[340px] -top-[610px] w-[50px] flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-[#FF2C61] slab hover:bg-[#ED709D] hover:text-white font-bold uppercase px-6 py-3 rounded-xl text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => closeModals()}
                          >
                            *
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex justify-center ">
          <div className="my-16 lg:w-[1000px] w-[350px] mt-8 lg:mt-0 h-fit bg-white rounded-[36px] text-center font-[Montserrat] items-center content-center">
            <ul className="p-8">
              {currentResults.map((data, i) => (
                <li
                  className="flex flex-row w-full h-32 lg:justify-between justify-around"
                  key={i}
                >
                  {data.imageattach === null &&
                    data.imageattach === undefined && (
                      <img
                        src={data.avatar_user}
                        alt=""
                        className="w-20 h-20 rounded-[50%] "
                      />
                    )}

                  <span className="text-[16px]"> {data.device_cmt}</span>
                  <span className="text-[16px] max-w-xl">
                    {data.noi_dung_cmt.length > 10
                      ? data.noi_dung_cmt.slice(0, 50) + "..."
                      : data.noi_dung_cmt}
                  </span>
                  <span className="text-[16px]">
                    {data.dia_chi_ip.length > 15
                      ? data.dia_chi_ip.slice(0, 15) + "..."
                      : data.dia_chi_ip}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
