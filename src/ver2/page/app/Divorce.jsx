import React, { useState, useEffect } from "react";
import axios from "axios"
import Empty from "./template/EmptyTemplate";
import Template1 from "./template/Template1"
import Template2 from "./template/Template2"
import Template3 from "./template/Template3"
import Template4 from "./template/Template4"
import { useParams } from 'react-router-dom';

const templateComponents = {
    Template1: Template1, 
    Template2: Template2,
    Template3: Template3,
    Template4: Template4,
  };

function Divorce() {

    const [data, setData] = useState([])
    const { id } = useParams();
    const [template, setTemplate] = useState("Template1")

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://61.28.226.120:8989/lovehistory/${id}`
            )
            setData(response.data.sukien[5])
            console.log(response.data.sukien[5])
            setTemplate("Template"+response.data.sukien[5].id_template)
            console.log("Template"+response.data.sukien[5].id_template)
            // console.log(data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const TemplateComponent = templateComponents[template];

    return (
        
        <div className="flex items-center justify-center h-full">
            { data ?  < TemplateComponent data={data} stt={6}/> : <Empty/> }
        </div>
    );
}

export default Divorce;