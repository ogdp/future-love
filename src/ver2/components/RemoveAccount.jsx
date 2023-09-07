import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RemoveAccount = (props) => {
  const [timeDelete, setTimeDelete] = useState(10);
  const server = "https://sakaivn.online";
  const user = JSON.parse(window.localStorage.getItem("user-info"));
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timeDelete > 0) {
        setTimeDelete(timeDelete - 1);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeDelete]);

  const onHandleRemove = async () => {
    try {
      const res = await axios.get(`${server}/deleteuser/${user.id_user}`);
      if (res.data.message) {
        toast.success("Successful account deleted !");
        window.localStorage.clear();
        setTimeout(() => {
          return (window.location.href = "/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-lg:mb-10">
      <div role="alert" className="text-3xl lg:w-[80%] m-auto">
        <div className="bg-red-500 text-white text-4xl rounded-t px-4 py-3">
          Delete Account
        </div>
        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-5 py-3 pb-5 text-red-700">
          <h1 className="text-4xl py-5">
            Are you sure you want to delete your account?
          </h1>
          <button
            onClick={() => props.close()}
            className="my-3 py-2 px-5 bg-blue-600 hover:bg-blue-700 text-white text-3xl mx-3 rounded-lg transition-all"
          >
            Cancel
          </button>
          {timeDelete == 0 && (
            <button
              onClick={() => onHandleRemove()}
              className="my-3 py-2 px-5 bg-red-600 hover:bg-red-500 text-white text-3xl mx-3 rounded-lg transition-all"
            >
              Delete
            </button>
          )}
          {timeDelete > 0 && (
            <button className="my-3 py-2 px-5 bg-red-400 hover:cursor-no-drop text-white text-3xl mx-3 rounded-lg transition-all">
              Delete {timeDelete}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveAccount;
