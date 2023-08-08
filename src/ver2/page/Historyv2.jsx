
// import Header from "../components/Header";
import EventHistory from "../components/eventHistory";
import Comments from "../components/comments";
import axios from "axios";
import React, { useEffect, useState } from "react";
import img from "../components/image/Screenshot_1.png";
import { BsFillHeartFill } from "react-icons/bs";
import { SlMenu } from "react-icons/sl";
import useEvenStore from "../../utils/store";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function Historyv2() {
  const [search_w, keyWord] = useState('');
  const [dataSearch, setDataSearch] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const version = useEvenStore((state) => state.version);
  const setVersion = useEvenStore((state) => state.setVersion);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear()
  }
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const toggleVersion = () => {
    // setVersion(version == 2 ? 1 : 2);
    navigate('/love')
    // window.location.href = '/home'
    // console.log('navigate', version)
  };

  const onSearch = async () => {
    const params = {
      word: search_w
    }
    await axios.get('http://14.225.7.221:8989/search', { params: params })
      .then(response => {
        setDataSearch(response.data?.list_sukien[0]?.sukien)

      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  useEffect(() => {
    onSearch()
  }, []);
  return (
    <div className="Historyv2 flex flex-col min-h-screen" style={{
      background: 'linear-gradient(to right, #F0A3BF, #A86ED4 )'
    }}>

      <div className="h-40 w-full mx-4 lg:py-7 py-3">
        <div className="flex items-center justify-between lg">
          {/* <Clock className="" /> */}

          {/* logo */}
          <div className="flex">
            <img src={img} alt="" className="lg:w-28 w-24 lg:h-24 h-20 lg:mt-0" />
            <p className="lg:text-6xl text-3xl text-white flex items-center starborn">FUTURE LOVE</p>
            <img src={img} alt="" className="lg:w-28 w-24 lg:h-24 h-20" />
          </div>

          {/* search */}
          <div className="lg:block hidden">
            <div className="i-search flex items-center">
              <i className="fa fa-search text-gray-500 text-3xl absolute ml-8" /><input type="search" onChange={(e) => onSearch(keyWord(e.target.value))} placeholder="Search" className="searchTerm rounded-full w-search h-20" />
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
              onClick={toggleMenu}
            />
          </div>
        </div>
        {/* mobile search */}
        <div className="flex justify-center mr-10 mt-3">
          <div className="lg:i-search im-search flex items-center lg:hidden">
            <i className="fa fa-search lg:text-4xl text-2xl absolute ml-8" /><input type="search" placeholder="Search" className="searchTerm rounded-full w-search lg:h-20" />
          </div>
        </div>

        {/* navLink */}
        {
          showMenu && (
            <div className="absolute top-36 right-10 w-96 z-50">
              <ul>
                <li
                  className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center rounded-t-[16px]"
                >
                  <NavLink className="slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             " to="/">HOME</NavLink>
                </li>
                <li
                  className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center"
                >
                  <NavLink className="pt-16 slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             " to="/NewHistory">EVENTS</NavLink>
                </li>
                <li
                  className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center"
                >
                  <NavLink className="pt-16 slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             " to="/Profile">PROFILE</NavLink>
                </li>
                <li
                  className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center rounded-b-[16px]"
                >
                  <NavLink onClick={handleLogout} className="pt-16 slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-gray-300 hover:text-gray-500
             " to="/">LOGOUT</NavLink>
                </li>
                {/* <li
              className="w-full h-24 bg-[#FFF2EB] flex justify-center items-center rounded-b-[16px] font[Starborn] font-semibold text-[28px] text-[#FF2C61] hover:bg-[#FFCFC5]
             "
            >
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                History
              </NavLink>
            </li> */}
                {/* <li
              className="w-full h-24 bg-[#FFF2EB] flex justify-center items-center rounded-b-[16px] font[Starborn] font-semibold text-[28px] text-[#FF2C61] hover:bg-[#FFCFC5]
             "
            >
              <NavLink
                to="/:id"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                View
              </NavLink>
            </li> */}
              </ul>
            </div>
          )
        }
      </div >
      <b className="starborn text-white lg:text-5xl text-3xl ml-12 mb-3 mt-5">Events</b>
      <div className="lg:flex lg:mt-0">
        <div className="flex justify-center lg:w-[50%]">
          <EventHistory search={search_w} data={dataSearch} />
        </div>
        <div>
        </div>
        <div className="flex justify-center lg:w-[50%]">
          <Comments />
        </div>
      </div>
    </div >

  );
}

export default Historyv2;
