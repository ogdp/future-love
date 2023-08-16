import React, { useEffect, useState } from "react";
import img from "../components/image/Screenshot_1.png";
import { BsFillHeartFill } from "react-icons/bs";
import { SlMenu } from "react-icons/sl";
import useEvenStore from "../../utils/store";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

function Header({ onSearchChange, onClick }) {
  const [showMenu, setShowMenu] = useState(false);
  const version = useEvenStore((state) => state.version);
  const setVersion = useEvenStore((state) => state.setVersion);
  const navigate = useNavigate();

  const user = window.localStorage.getItem("user-info");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const toggleVersion = () => {
    navigate("/love");
  };
  return (
    <div className="h-40 w-full mx-4 lg:py-7 py-3">
      <div className="flex items-center justify-between">
        {/* logo */}
        <div className="flex items-center">
          <SlMenu
            className="text-[38px] text-white mt-1 font-black mr-20 cursor-pointer transition-transform duration-300 hover:scale-125 lg:hidden block"
            onClick={onClick}
          />
          <img src={img} alt="" className="lg:w-28 w-24 lg:h-24 h-20 lg:mt-0" />
          <Link
            to="/"
            className="lg:text-6xl text-3xl text-white flex items-center starborn"
          >
            FUTURE LOVE
          </Link>
          <img src={img} alt="" className="lg:w-28 w-24 lg:h-24 h-20" />
        </div>

        {/* search */}
        <div className="lg:block hidden">
          <div className="i-search flex items-center">
            <i className="fa fa-search text-gray-500 text-3xl absolute ml-8" />
            <input
              type="search"
              placeholder="Search"
              className="searchTerm rounded-full w-search h-20"
              onChange={onSearchChange}
            />
          </div>
        </div>

        {/* menu */}
        <div className="flex">
          <BsFillHeartFill
            onClick={toggleVersion}
            className="lg:text-[54px] text-[38px] text-white mt-2 lg:mr-10 mr-5 transition-transform duration-300 hover:scale-125 cursor-pointer"
          />

          <SlMenu
            className="lg:text-[56px] text-[38px] text-white mt-1 font-black mr-20 cursor-pointer transition-transform duration-300 hover:scale-125"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          />
        </div>
      </div>

      {/* navLink */}
      {showMenu && (
        <div className="absolute top-36 right-10 w-96 z-50">
          <ul>
            {user && (
              <>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center rounded-t-[16px]">
                  <NavLink
                    className="slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             "
                    to="/"
                  >
                    HOME
                  </NavLink>
                </li>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center">
                  <NavLink
                    className="pt-16 slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             "
                    to="/viewEvent"
                  >
                    EVENTS
                  </NavLink>
                </li>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center">
                  <NavLink
                    className="pt-16 slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             "
                    to="/Profile"
                  >
                    PROFILE
                  </NavLink>
                </li>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center rounded-b-[16px]">
                  <NavLink
                    onClick={handleLogout}
                    className="pt-16 slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-gray-300 hover:text-gray-500
             "
                    to="/"
                  >
                    LOGOUT
                  </NavLink>
                </li>
              </>
            )}
            {!user && (
              <>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center rounded-t-[16px]">
                  <NavLink
                    className="slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             "
                    to="/"
                  >
                    HOME
                  </NavLink>
                </li>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center">
                  <NavLink
                    className="pt-16 slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             "
                    to="/NewHistory"
                  >
                    EVENTS
                  </NavLink>
                </li>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center">
                  <NavLink
                    className="pt-16 slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             "
                    to="/login"
                  >
                    LOGIN
                  </NavLink>
                </li>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center rounded-b-[16px]">
                  <NavLink
                    className="slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             "
                    to="/register"
                  >
                    REGISTER
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;
