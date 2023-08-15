import React from "react";
import { Link } from "react-router-dom";

const EventListProfile = (props) => {
  // console.log(props);
  // console.log(closeTab);
  if (props.data.length === 0)
    return <div className="text-xl text-center py-3">Loadding ...</div>;
  return (
    <>
      <section className="fixed top-0 left-0 min-w-full h-screen">
        <div
          className="absolute top-0 left-0 bg-black opacity-25 min-w-full h-screen z-10"
          onClick={() => props.closeTab()}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-full lg:w-3/4 h-screen z-20 flex justify-center items-center"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="lg:w-full max-lg:h-screen max-lg:overflow-y-auto lg:h-screen m-auto bg-white rounded-xl"
            style={{
              background:
                "linear-gradient(to right, rgb(240, 163, 191), rgb(168, 110, 212))",
            }}
          >
            <h1 className="uppercase text-white text-3xl lg:text-6xl font-semibold text-center py-5">
              List Event
            </h1>
            <button
              className="absolute top-0 right-0 px-4 py-3 "
              onClick={() => props.closeTab()}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 3C9.75 3 3 9.75 3 18C3 26.25 9.75 33 18 33C26.25 33 33 26.25 33 18C33 9.75 26.25 3 18 3ZM18 30C11.4 30 6 24.6 6 18C6 11.4 11.4 6 18 6C24.6 6 30 11.4 30 18C30 24.6 24.6 30 18 30Z"
                  fill="#edb4b4"
                />
                <path
                  d="M24.0008 11.9998C23.4008 11.3998 22.5008 11.3998 21.9008 11.9998L18.0008 15.8998L14.1008 11.9998C13.5008 11.3998 12.6008 11.3998 12.0008 11.9998C11.4008 12.5998 11.4008 13.4998 12.0008 14.0998L15.9008 17.9998L12.0008 21.8998C11.4008 22.4998 11.4008 23.3998 12.0008 23.9998C12.3008 24.2998 12.7508 24.4498 13.0508 24.4498C13.3508 24.4498 13.8008 24.2998 14.1008 23.9998L18.0008 20.0998L21.9008 23.9998C22.2008 24.2998 22.6508 24.4498 22.9508 24.4498C23.2508 24.4498 23.7008 24.2998 24.0008 23.9998C24.6008 23.3998 24.6008 22.4998 24.0008 21.8998L20.1008 17.9998L24.0008 14.0998C24.6008 13.4998 24.6008 12.5998 24.0008 11.9998Z"
                  fill="#edb4b4"
                />
              </svg>
            </button>
            <div className="w-full h-[80%] overflow-x-hidden text-xl px-3">
              {props.data.map((item, index) => (
                <Link
                  key={index}
                  to={`http://localhost:3000/detail/${item.sukien[0].id_toan_bo_su_kien}/1`}
                >
                  <div
                    className="h-[150px] flex items-center justify-center bg-cover bg-center bg-no-repeat rounded-lg overflow-x-hidden my-2"
                    style={{
                      backgroundImage: 'url("https://i.ibb.co/2t4J5dK/1.png")',
                    }}
                  >
                    <div className="w-full flex justify-around items-center py-6">
                      <div className="w-[100px] h-[100px] overflow-hidden rounded-full max-lg:hidden">
                        <img
                          src={item.sukien[0].link_nam_goc}
                          alt=""
                          className="w-full  object-cover"
                        />
                      </div>
                      <div className="max-w-[50%]">
                        <h1 className="text-4xl text-center my-3">
                          {item.sukien[0].ten_su_kien}
                        </h1>
                        <p className="line-clamp-3 text-2xl">
                          {item.sukien[0].noi_dung_su_kien}
                        </p>
                        <h5 className="text-right py-1 text-2xl">
                          {item.sukien[0].real_time}
                        </h5>
                      </div>
                      <div className="w-[100px] h-[100px] overflow-hidden rounded-full max-lg:hidden">
                        <img
                          src={item.sukien[0].link_nu_goc}
                          alt=""
                          className="w-full  object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventListProfile;