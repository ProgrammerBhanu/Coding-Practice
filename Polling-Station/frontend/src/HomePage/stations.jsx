import React, { useEffect, useState } from "react";
import axios from "axios";
export default function PollingStations(props) {
  const city = props.match.params.city;
  //   console.log(city);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/data?city=${city}`)
      .then((res) => {
        // console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [city]);
  return (
    <>
      <div style={{ marginTop: "5%" }}>
        <h1 style={{color:"Purple"}}>PollingStations in {city}</h1>
        {data &&
          data.map((item, index) => (
            <div key={index}>
              {item.pollingStationNames.map((item, index) => (
                <h4 style={{color:"darkturquoise"}}
                key={index}>{item}</h4>
              ))}
              <br />
            </div>
          ))}
      </div>
    </>
  );
}
