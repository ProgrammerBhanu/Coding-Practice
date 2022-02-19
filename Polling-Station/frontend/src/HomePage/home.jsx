import React, { useEffect, useState } from "react";
  import { makeStyles } from "@material-ui/core/styles";
  import { useSelector, useDispatch } from "react-redux";
  import Navbar from "../components/navbar";
  import {
    getCityRequest,
    getCityFailure,
    getCitySuccess,
  } from "./../Redux/action";
  import {
    Card,
    CardContent,
    Grid,
    Typography,
  } from "@mui/material";
  import FormControl from "@mui/material/FormControl";
  import InputLabel from "@mui/material/InputLabel";
  import Select from "@mui/material/Select";
  import MenuItem from "@mui/material/MenuItem";
  import axios from "axios";
  import { Link } from "react-router-dom";
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      height: 140,
      width: 100,
    },
    margin: {
      margin: "2% 4%",
    },
   
    align: {
      marginLeft: "40%",
    },
    formControl: {
      marginTop: "3%",
      margin: theme.spacing(1),
      minWidth: 200,
    },
  }));
  export default function Home() {
    const classes = useStyles();
    const [page, setPage] = useState(1);
   
    const [data, setData] = useState([]);
    const [city, setCity] = useState("");
    const [sort, setSort] = useState("");
    const [cityType, setCityType] = useState("");
    const [search, setSearch] = useState("");
    const citiesData = useSelector((state) => state.auth.cityData);
    

    var pagination = [];
    var buttons = Math.ceil(data.length / 3);
    for (let i = 1; i <= buttons; i++) {
      pagination.push(i);
    }

    const dispatch = useDispatch();
    
    const handleCityType = (event) => {
      axios
        .get(
          `http://localhost:3001/city/${event.target.value}`
        )
        .then((res) => {
          // console.log(res.data.data);
          dispatch(getCitySuccess(res.data.city));
          
        })
    };
    const handleSort = (event) => {
      axios
        .get(
          `http://localhost:3001/city/sort=${event.target.value}`
        )
        .then((res) => {
          // console.log(res.data.data);
          dispatch(getCitySuccess(res.data.city));
          
        })
    };
    useEffect(() => {
      axios
        .get("http://localhost:3001/city")
        .then((res) => {
          console.log(res.data.city);
          setData(res.data.city);
        })
        .catch((error) => {
          console.log(error);
        });
      dispatch(getCityRequest());
      axios
        .get(
          `http://localhost:3001/city?page=${page}&size=3`
        )
        .then((res) => {
          // console.log(res.data.data);
          dispatch(getCitySuccess(res.data.city));
          
        })
        .catch((error) => {
          dispatch(getCityFailure());
        });
    }, [page, sort, cityType, dispatch, search]);
  
  
   
    return (
      <div>
        <Navbar/>
        <FormControl className={classes.formControl}>
          <InputLabel> Sort by CityType</InputLabel>
          <Select value={cityType} onChange={handleCityType}>
            <MenuItem value="Metro">Metro</MenuItem>
            <MenuItem value="Town">Town</MenuItem>
            <MenuItem value="Village">Village</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Sort by Population</InputLabel>
          <Select value={sort} onChange={handleSort}>
            <MenuItem value="asc">Low to High</MenuItem>
            <MenuItem value="desc">High to Low</MenuItem>
          </Select>
        </FormControl>
        <Grid container>
          {citiesData &&
            citiesData.map((item, index) => (
              <Grid item xs={3} className={classes.margin} key={index}>
                <Card className={classes.control}>
                  <CardContent>
                    <Typography type="text" value={item.district}
                    style={{color:"blue",fontWeight:"bold"}}>
                      District : <i style={{color:"maroon"}}>{item.district}</i>
                    </Typography>
                    <Typography
                      type="text"
                      value={city === item.city}
                      onClick={(e) => setCity(e.target.value)}
                      style={{color:"blue",fontWeight:"bold"}}
                    >
                      <Link to={`/${item.city}`}>
                        City: <em>{item.city}</em>
                      </Link>
                    </Typography>
                    <Typography style={{color:"blue",fontWeight:"bold"}}>
                      City Type : <em style={{color:"mediumvioletred"}}>{item.cityType}</em>
                    </Typography>
                    <Typography style={{color:"blue",fontWeight:"bold"}}>
                      Population : <em>{Number(item.population)}</em>
                    </Typography>
                    <Typography style={{color:"blue",fontWeight:"bold"}}>
                      Number of polling stations : {item.noOfPollingStations}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
        <div>
          {pagination.map((item, index) => (
            <button
              variant="contained"
              
              style={{
                padding: "10px 20px",margin: "10px",
                background: "#7B68EE",color: "black",borderRadius: "5px",
              }}
              key={index}
              value={item}
              onClick={(e) => setPage(e.target.value)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    );
  }