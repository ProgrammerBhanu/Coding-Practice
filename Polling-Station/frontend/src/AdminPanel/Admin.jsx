
import axios from "axios";
import { useState } from "react";
import AdminNav from "../components/adminNav";
import "./admin.css"
// import { Route, Routes } from "react-router-dom";
export const Admin = ()=>{
    const [st,setSt] = useState([]);
    const data = () => {
        axios
          .get(
            `http://localhost:3001/station`
          )
          .then((res) => {
            // console.log(res.data.station);
            setSt(res.data.station);
            
          })
      };
      data();

    return (
        <div>
            <AdminNav/>
            <div className="station">
            {st.map((item, index) => (
                <div className="stcard">
                    <h2>City :- {item.city}</h2>
                    <h3>Polling Station :- {item.polling}</h3>
                    <p> Address :- {item.address}</p>
                    <p>Pincode :- {item.pincode}</p>
                </div>
            ))}
            </div>
            
        </div>
    )
}