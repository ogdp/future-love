import React, { useState } from "react";
import tron1 from "../img/tron2.png";

function EmptyTemplate() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleImageChange = (event) => {
    // Lấy thông tin về tệp ảnh đã chọn
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      // Tạo URL cho ảnh đã chọn
      const imageUrl = URL.createObjectURL(selectedImage);
      setImageSrc(imageUrl);
    }
  };

  return (
    <div
      className={` lg:w-[1019px] w-[380px] mt-36 border-8 border-pink-300  h-[573px] bg-white rounded-[36px] flex flex-col items-center justify-center`}
    >
      <div className=" flex mb-5">
        <h1 className="text-5xl">
          You don't have any events yet. Let's add a notable event!
        </h1>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center"
        onClick={openModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 9a1 1 0 011-1h4V4a1 1 0 112 0v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Add Event
      </button>

      {/* Modal */}
      {isModalOpen && (
        // Trong tệp JSX của bạn
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-20 ">
          <div className=" p-8 rounded-lg shadow-lg w-[80%] max-w-[90%] h-[90%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-300">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-700 text-2xl"
              onClick={closeModal}
            >
              Close
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Add Event</h2>
            <div className="text-center">
              <label className="block mb-2 text-2xl text-left ml-[10%]">Name Event:</label>
              <input type="text" className="border rounded p-3 w-[80%] justify-center" />
              <label className="block mb-2 text-2xl text-left ml-[10%]">Noi dung event</label>
              <textarea type="text" className="border rounded p-3 w-[80%] h-[150px]" />
            </div>
            <div className="flex flex-row mt-10 w-full h-[30%]">

              <div className="col-4 text-center justify-center items-center mt-20 ">

                <input type="text" placeholder="Name Male" className="border rounded p-3 w-[60%] justify-center" />
              </div>
              <div className="col-4 text-center mt-10">
                <div className="flex justify-center">
                  <div className="relative w-72 h-72">
                    <label htmlFor="imageInput" className="block w-full h-full cursor-pointer">
                      <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      {/* Hiển thị khung tròn bọc ngoài */}
                      <div className="absolute inset-0 bg-cover bg-center rounded-full hover:bg-opacity-20 transition-all duration-300">
                        <div className="w-full h-full bg-cover bg-center rounded-full" style={{ backgroundImage: `url(${tron1})` }}></div>
                      </div>
                      {/* Hiển thị ảnh chọn hoặc mặc định */}
                      <div className="absolute inset-0 bg-cover bg-center rounded-full" style={{ backgroundImage: `url(${imageSrc || "about:blank"})` }}></div>
                    </label>
                  </div>
                </div>
              </div>





              <div className="col-4 text-center justify-center items-center mt-20 ">

                <input type="text" placeholder="Name Female" className="border rounded p-3 w-[60%] justify-center" />
              </div>
            </div>

          </div>

        </div>

      )}
    </div>
  );
}

export default EmptyTemplate;
