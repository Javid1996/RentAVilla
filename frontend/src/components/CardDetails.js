import React from "react";
import { useParams } from "react-router";
import { useState,useEffect,useRef } from "react";
import Search from "./Search";
import {Button} from "@mui/material";
import {AddCart,inputDate} from '../actions'
import {connect} from 'react-redux';
import Profile from "./Profile";
import { Avatar } from '@mui/material';
import ReactDOM from 'react-dom';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../Styles/CardDetails.css'
import { Routes,Route, Link } from "react-router-dom"
import Header2 from "./Header 2";
import CalendarBan from './CalendarBan.js'
import { FaStar } from "react-icons/fa";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Footer from "./Footer";


function CardDetails(props){
    console.log('card props------>',props);
    let {diffInDays,startDate,endDate,peopleNumber} = props._products.dateInfo
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    const formattedStartDate = startDate.toLocaleDateString('en-US', options);
    const formattedEndDate = endDate.toLocaleDateString('en-US', options);
    console.log('FORRRRMAAAAAAAT START',formattedStartDate);
    console.log('FORRRRMAAAAAAAT ENDDDD',formattedEndDate);

    const{event_id}=useParams();
    const[card,setCard]=useState();
    const[days,setDays]=useState();
    // const [focusedImg, setFocusedImg] = useState(false);
    // const [defaultImg, setDefaultImg] = useState();
    const dayAmountInput = useRef();

    
    useEffect(()=>{
        fetch(`http://localhost:4005/cards/${event_id}`)
        .then(res=>res.json())
        .then(data=>{
            console.log('27строчка',data);
            setCard(data)})
        
    },[]);

    function getReserve(){
        
        props.Add(card)
        toast("Reservation added to profile!")
    };

    return(
    
    <>
     <Header2/>
    <CalendarBan/>
  
    <div className="card_details">
           
           
         {card ?

                <div>
                    <h1> {card.name}</h1>    
                    <div className="pic-form"> 

                        <Carousel thumbWidth='150px' showArrows='true' axis="horizontal" width={750}>
                            <div >
                                <img src={card.event_img} className="carousel" />
                                <p className="legend">{card.name}</p>
                            </div>
                            <div>
                                <img src={card.img_1} className="carousel"/>
                                <p className="legend">{card.address}</p>
                            </div>
                            <div>
                                <img src={card.img_2} className="carousel"/>
                                <p className="legend">{card.phone_number}</p>
                            </div>
                            <div>
                                <img src={card.img_3} className="carousel"/>
                                <p className="legend">{card.phone_number}</p>
                            </div>
                            <div>
                                <img src={card.img_4} className="carousel"/>
                                <p className="legend">{card.phone_number}</p>
                            </div>
                        </Carousel> 
                        {/* <form onChange={setDayAmountInput}>
                            <label for="quantity">Days amount:</label>
                            <input ref={dayAmountInput} min={1} defaultValue={0}  type="number" id="quantity" name="quantity" />
                        </form> */}
                    </div>    
                    <div className="flex-container">
                        <div className='heading-hold'>
                            <div>
                            <p className='text-xl '> Superhost. </p>
                            <p className="text">highly rated hosts who are committed to providing great stays for their guests.</p>
                            </div>
                            <div>
                            <p className='text-xl '>Great check-in experience.  </p>
                            <p className="text">90% of recent guests gave the check-in process a 10-star rating.</p>

                            </div>
                            <div>
                            <p className='text-xl '>Free cancellation for 48 hours. </p>
                            <p className="text">No questions asked.</p>

                            </div>
                        </div>

                        <div className="card_info">
                       
                            <h3> Address:{card.address},{card.city_name}/{card.country_name}</h3>
                            
                             <p> {<FaPhoneSquareAlt />}{card.phone_number}</p>
                             
                                <p className="text-xl">{card.price}/Night</p>
                                <p><FaStar/> {card.rating}</p>
                            { props._products.dateInfo && <>
                            {/* <p>Date :{props._products.dateInfo.startDate.toString()}</p>
                            <p>Date :{props._products.dateInfo.endDate.toString()}</p> */}
                            <p>Start Date :{formattedStartDate}</p>
                            <p>End Date :{formattedEndDate}</p>
                            <p>Days amount :{diffInDays}</p>
                            <p>Number of Guests :{peopleNumber}</p>
                            </> 
}
                            <div className="reserve_btn_div">
                                <Button onClick={getReserve} className="reserve_btn" variant="outlined">Reserve</Button> 
                            </div>
                        </div>
                    </div>
                </div>
            :''}
        

      
    </div>
        <Footer/>
    
        
   </> 
   
    )
}


const mapStateToProps = state =>{
    // console.log('state',state);
    // console.log('products',state._todoProduct);
    return {
        _products: state._todoProduct
    };
}

function mapDispatchToProps(dispatch){
    return{
       
        Add:card=>dispatch(AddCart(card)),
        // inputDate:days=>dispatch(inputDate(days))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CardDetails);