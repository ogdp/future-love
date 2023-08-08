import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NewHistory.scss";
import axios from "axios";
import FirstMeet from './../page/app/FirstMeet'
import FirstDate from "../page/app/FirstDate";
import BeingInLove from "../page/app/BeingInLove";
import BreakingUp from "../page/app/BreakingUp";
import Marry from "../page/app/Marry";
import Divorce from "../page/app/Divorce";
import Remarry from "../page/app/Remarry";
import nam1 from "./image/nam1.png"
import nu1 from "./image/nu1.png"


function NewHistory() {
     const [isActive, setIsActive] = useState(1);
     const [isScroll, setIsScroll] = useState(true)
     const [dataUser, setDataUser] = useState([])
     const redirect = (e) => {
          setIsActive(e)
          scrollToTop()
     }
     const user = JSON.parse(localStorage.getItem('user-info'))
     console.log(user)
     const idUser = user.id_user

     const handleScroll = () => {
          const scrollY = window.scrollY;
          const scrollThreshold = 0.8 * (document.documentElement.scrollHeight - window.innerHeight);
          if (scrollY > scrollThreshold) {
               setIsActive((prevActive) => (prevActive + 1))
               setIsScroll(false)
               scrollToTop()
          }
     }
     const scrollToTop = () => {
          window.scrollTo({
               top: 0,
               behavior: "smooth",
          });
     };

     // useEffect(() => {
     //      window.addEventListener("scroll", handleScroll)
     //      return () => {
     //           window.removeEventListener("scroll", handleScroll);
     //      };
     // })

     // useEffect(() => {
     //      const enableScroll = () => {
     //           setIsScroll(true);
     //      };

     //      window.addEventListener("wheel", enableScroll);

     //      return () => {
     //           window.removeEventListener("wheel", enableScroll);
     //      };
     // }, []);

     const fetchDataUser = async () => {
          try {
               const response = await axios.get(
                    `http://14.225.7.221:8989/profile/${idUser}`
               )
               setDataUser(response.data)
               console.log(response.data)
               // console.log(data)
          } catch (err) {
               console.log(err)
          }
     }
     useEffect(() => {
          fetchDataUser();
     }, []);

     return (
          <div className=" min-h-screen" style={{ background: 'linear-gradient(to right, pink, violet)' }}>
               <Header />

               <div className="flex">
                    <div className="lg:w-[30%] bg-menu min-h-screen">
                         <div className=" lg:h-[30%] lg:w-[100%] flex items-center justify-center">
                              <div style={{
                                   backgroundImage: `url(${nam1})`,
                                   backgroundSize: "cover",
                                   width: '150px',
                                   height: "150px",
                                   overflow: "hidden",
                              }}
                              >
                                   <img src={dataUser.link_avatar} alt="" className="lg:w-[80%] lg:h-[80%] object-cover rounded-[50%] lg:mt-[25px] lg:ml-[6px]" />
                              </div>
                              <div style={{
                                   backgroundImage: `url(${nu1})`, backgroundSize: "cover",
                                   width: '150px',
                                   height: "150px",
                              }}
                              >
                                   <img src={dataUser.link_avatar} alt="" className="lg:w-[80%] lg:h-[80%] object-cover rounded-[50%] lg:ml-[25px] lg:mt-[6px]" />
                              </div>
                         </div>
                         <div className="slab text-[30px] font-bold text-[#FFFFFF]">
                              <div className=" flex justify-center">
                                   <ul className="py-10">
                                        <li className="cursor-pointer flex justify-center items-center h-32" onClick={() => redirect(1)}>
                                             <div className="hover:bg-[#782353] rounded-3xl py-2 px-36">First Meet</div>
                                        </li>
                                        <li className="cursor-pointer flex justify-center items-center h-32" onClick={() => redirect(2)}>
                                             <div className="hover:bg-[#782353] rounded-3xl py-2 px-36">First date</div>
                                        </li>
                                        <li className="cursor-pointer flex justify-center items-center h-32" onClick={() => redirect(3)}>
                                             <div className="hover:bg-[#782353] rounded-3xl py-2 px-36">Being in love</div>
                                        </li>
                                        <li className="cursor-pointer flex justify-center items-center h-32" onClick={() => redirect(4)}>
                                             <div className="hover:bg-[#782353] rounded-3xl py-2 px-36">Breking up</div>
                                        </li>
                                        <li className="cursor-pointer flex justify-center items-center h-32" onClick={() => redirect(5)}>
                                             <div className="hover:bg-[#782353] rounded-3xl py-2 px-36">Marry</div>
                                        </li>
                                        <li className="cursor-pointer flex justify-center items-center h-32" onClick={() => redirect(6)}>
                                             <div className="hover:bg-[#782353] rounded-3xl py-2 px-36">Divorce</div>
                                        </li>
                                        <li className="cursor-pointer flex justify-center items-center h-32" onClick={() => redirect(7)}>
                                             <div className="hover:bg-[#782353] rounded-3xl py-2 px-36">Remarry</div>
                                        </li>
                                   </ul>
                              </div>
                         </div>
                    </div>
                    <div className="lg:w-[70%] bg-D9D9D9 min-h-screen">
                         {isActive === 1 ? <FirstMeet /> : ''}
                         {isActive === 2 ? <FirstDate /> : ''}
                         {isActive === 3 ? <BeingInLove /> : ''}
                         {isActive === 4 ? <BreakingUp /> : ''}
                         {isActive === 5 ? <Marry /> : ''}
                         {isActive === 6 ? <Divorce /> : ''}
                         {isActive === 7 ? <Remarry /> : ''}
                    </div>
               </div>

          </div>
     );
}



export default NewHistory;
