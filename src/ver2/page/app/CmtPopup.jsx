import React, { useState, useEffect } from "react";
import axios from "axios";
import send from "./img/send.png"
import TemplateCmt1 from "./template/TemplateCmt1";
import TemplateCmt2 from "./template/TemplateCmt2";
import TemplateCmt3 from "./template/TemplateCmt3";
import TemplateCmt4 from "./template/TemplateCmt4";
import { useParams } from 'react-router-dom';

const templateComponents = {
    TemplateCmt1: TemplateCmt1,
    TemplateCmt2: TemplateCmt2,
    TemplateCmt3: TemplateCmt3,
    TemplateCmt4: TemplateCmt4,
};

function CmtPopup(props) {
    const { idsk } = useParams()
    const [dataCmt, setDataCmt] = useState([])
    const [dataUser, setDataUser] = useState([])
    const [dataSend, setDataSend] = useState([])
    const user = JSON.parse(localStorage.getItem('user-info'))
    console.log(user)
    const idUser = user.id_user
    console.log(user.id_user)

    const templateCmt = props.TemplateCmt

    const closePopup = () => {
        props.setIsOpenPopup(false);
    };

    const data = props.data

    const fetchDataCmt = async () => {
        try {
            const response = await axios.get(
                `http://14.225.7.221:8989/lovehistory/comment/${idUser}?id_toan_bo_su_kien=${idsk}`
            )
            setDataCmt(response.data.comment)
            console.log(response.data.comment)
            // console.log(data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchDataCmt();
    }, []);

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

    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setInputValue(event.target.value);
        setDataSend(prevData => ({ ...prevData, key1: newValue }));
    }


    const HandleSendCmt = () => {
        const url = "http://14.225.7.221:8989/lovehistory/comment";
        axios.post(url, dataSend)
            .then(response => {
                console.log("Dữ liệu đã được gửi thành công:", response.data);
            })
            .catch(error => {
                console.error("Lỗi khi gửi dữ liệu:", error);
            });
    }

    const TemplateComponent = templateComponents[templateCmt];

    return (
        <div style={{
            position: 'fixed',
            background: 'rgba(0,0,0,0.6)',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            overflow: 'auto',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}
        >
            <div className="w-[15%] h-[100%]" onClick={closePopup}></div>
            <div style={{
                marginTop: '100px',
                background: 'white',
                borderRadius: '36px',
                width: '1019px',
                height: 'auto',
                overflow: 'auto',
                // display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }} className="mt-[50px]"
            >
                <div>
                    <div className=""><TemplateComponent data={data} /></div>
                </div>

                {/* {comment} */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <div style={{
                        marginTop: '5px',
                        background: 'red',
                        borderRadius: '30px',
                        width: '90%',
                        height: 'auto',
                        overflow: 'auto'
                    }}
                    >
                        {dataCmt.map((cmt, index) => ( (cmt.so_thu_tu_su_kien == props.stt ) &&
                            <div className="flex mt-[10px]">
                                {/* {other-avt} */}
                                <div className="overflow-hidden rounded-[50%] w-[40px] h-[40px] ml-[20px]">
                                    <img src={cmt.imageattach} alt="" className="w-[100%] h-[100%] object-cover rounded-[50%]" />
                                </div>

                                {/* { Name + Content } */}
                                <div className="ml-[10px]">
                                    <h1 className="text-2xl">{cmt.user_name}</h1>
                                    <p className="text-xl"> {cmt.noi_dung_cmt}</p>
                                    <p>{cmt.thoi_gian_release}</p>
                                </div>
                            </div>

                        ))
                        }
                        <div className="flex align-center justify-center">
                            <div className="flex bg-[blue] rounded-[30px] w-[100%] mt-[10px] mb-[7px]">
                                {/* {other-avt} */}
                                <div className="overflow-hidden rounded-[50%] w-[40px] h-[40px] ml-[20px] mt-[5px]">
                                    <img src={dataUser.link_avata} alt="" className="w-[100%] h-[100%] object-cover rounded-[50%]" />
                                </div>

                                {/* { Content } */}
                                <div className="ml-[20px] mt-[10px] w-[85%] h-[auto] flex mb-[10px] ">
                                    <input type='text' value={inputValue} onChange={handleInputChange} className="w-[100%] h-[auto] rounded-[36px]">
                                    </input>

                                </div>
                                {/* { Push } */}
                                <div className="mt-[10px] ml-[10px]" onClick={() => HandleSendCmt()}>
                                    <img src={send} alt="" className="w-[80%] h-[80%] " />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[15%] h-[100%]" onClick={closePopup}></div>
        </div>
    );
}

export default CmtPopup;
