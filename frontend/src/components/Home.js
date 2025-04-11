import React from "react";
import "../Styles/Home.css";
import Banner from "./Banner";
import Card from "./Card";
import { useEffect, useState } from "react";
// import Login from './SignIn'
import axios from "axios";
import CardDetails from "./CardDetails";
import { useNavigate } from "react-router";
import Footer from "./Footer";
import Header from './Header';


function Home() {
  const [data, setData] = useState([]);
  const [placeType, setPlaceType] = useState('');

  console.log('PLACE TYPE ----->',placeType);
  useEffect(() => {
    const url2 = "http://localhost:4005/cards/";

    async function fetchData() {
      try {
        const url = `http://localhost:4005/cards/${placeType ? `?type=${placeType}` : ''}`;
      const response = await fetch(url,{method:'GET'});
      const respjs = await response.json();
      setData(respjs);
      console.log('response',respjs);
      } catch (err) {
      console.log(err);
      }
    
    }
    fetchData();
  }, [placeType]);

  // const filteredData = placeType ? data.filter(item => item.type === placeType) : data;
  // const filteredData = data && placeType ? data.filter(item => item.type === placeType) : data;
  const filteredData = Array.isArray(data) && placeType ? data.filter(item => item.type === placeType) : data;

  // useEffect(() => {
  //   const url = "http://localhost:4005/cards/";
  
  //   async function fetchData(inputValue) {
  //     try {
  //       let response;
  //       if (!inputValue || inputValue === "") {
  //         response = await fetch(url, { method: 'GET' });
  //       } else {
  //         response = await axios.get(`http://localhost:4005/places/${inputValue}`);
  //       }
        
  //       const respjs = await response.json();
  //       setData(respjs);
  //       console.log('response', respjs);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  
  //   fetchData();
  // }, [inputValue]);
 
  const handleInputChange = (inputValue) =>{
    const url = "http://localhost:4005/cards/";
    try{
      if (!inputValue || inputValue === "") {
        axios.get(url)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.log(error);
        });
  
      }else{console.log('INPUTVALUE ------->',inputValue);
      axios.get(`http://localhost:4005/places/${inputValue}`)
      .then(response => {
        console.log(response.data);
        setData(response.data)
      })}
    }catch(err) {
        console.log(err)
    }
  
    setData(inputValue)
 }
 console.log('last data',data);

  return (
    <div className="home">
      
      <Header onChange={handleInputChange}/>
      <Banner setPlaceType={setPlaceType}/>

      <div className="home_section">
      {/* {Array.isArray(data) ? (
    filteredData.map((el) => <Card key={el.event_id} element={el} />)
  ) : (
    <p>No data available</p>
  )} */}
      {Array.isArray(filteredData) ? (
  filteredData.map((el) => (
    <Card key={el.event_id} element={el} />
  ))
) : (
  <p>Loading...</p>)}
        
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
