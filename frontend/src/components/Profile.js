import React ,{useState,useEffect} from "react";
import {connect} from 'react-redux';
import Header2 from "./Header 2";
import '../Styles/Profile.css'
import {star} from '../img/star.png'
import {Button} from "@mui/material";
import { DeleteCart } from "../actions";
import  axios  from "axios"; 
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { FaPhoneSquareAlt } from "react-icons/fa";
import Footer from "./Footer";

function Profile(props) {

    console.log('props in Profile',props);
    // let {diffInDays,startDate,endDate,peopleNumber} = props.card?._todoProduct.Carts[0]
    // const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    // const formattedStartDate = startDate.toLocaleDateString('en-US', options);
    // const formattedEndDate = endDate.toLocaleDateString('en-US', options);

    // const MDYoptions = { month: 'short', day: 'numeric', year: 'numeric' };
    // const MDYStartDate = startDate.toLocaleDateString('en-US', MDYoptions);
    // const MDYEndDate = endDate.toLocaleDateString('en-US', MDYoptions);


    // console.log('props in Profile diffInDays',diffInDays);
    // console.log('props in Profile startDate',formattedStartDate);
    // console.log('props in Profile endDate',endDate);
    // console.log('props in Profile peopleNumber',peopleNumber);
    let token = useSelector(state=>state._todoProduct.jwtToken)
    // console.log('token',token);
    let [savedReservations, setSavedReservations] = useState([]);

     function deleteReservedCard(uuid){
        console.log('uuid>>>>',uuid);
        props.Delete(uuid)
     }


    useEffect(()=>{
        axios.get("http://localhost:4005/reservation", 
        {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
        }
        )
        .then(resp=>{
        setSavedReservations(resp.data)});
        }, [])
     

     const sendReservationRequest=(item,MDYStartDate,MDYEndDate)=>{
        
        const day = Number(item?.days);
        let price = Number(item?.price);
        item.days=day;
        item.price=price;
        axios.post('http://localhost:4005/reservation',{item,MDYStartDate,MDYEndDate} , {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
                .then(function (response) {
                  console.log('response',response);
                  let newState = [...savedReservations, response.data[0]]
                  setSavedReservations(newState)
                  console.log('savedReservations',savedReservations);
                })
                .catch(function (error) {
                  console.log(error);
                })
                .finally(()=>{
                  deleteReservedCard(item.order_id)
                });
         
        }
        


console.log('SavedReservation.......',savedReservations);
    return(
        <>  
        <div className="profile">
            {/* <div className="upper_section"> */}
        <Header2/>
       { props.card?
       
        props.card?._todoProduct.Carts.map((item)=>{
           
            const MDYoptions = { month: 'short', day: 'numeric', year: 'numeric' };
            const MDYStartDate = item.startDate.toLocaleDateString('en-US', MDYoptions);
            const MDYEndDate = item.endDate.toLocaleDateString('en-US', MDYoptions);

            console.log('item',item);
            let price = typeof item.price !== "string"? item.price : Number(item?.price?.substring(1));
                return(
                    
                        <div key={item?.id} className="reserve__section">
                            <div className="reserve_section_header">
                                <img src={item?.image}/>
                                <div className="reserve_section_header_center">
                                    <div>
                                        <h3 className="red-text">{MDYStartDate}-{MDYEndDate}</h3>
                                        <p>{item?.name}</p>
                                        <p>address:{item?.address}</p>
                                    </div>
                                        <p>rate:{item?.rating}</p>
                                </div>
                            </div>
                            <div className="div_h2"><h2 className="h2_price_details">Price details</h2></div>
                            <div className="price_details">
                                <div className="price_details_left">
                                    <p>{item?.price} x {item.diffInDays} night(s) x {item.peopleNumber} person(s)</p>
                                    <p className="underscore">Cleaning fee</p>
                                    <p className="underscore">Click&Go service fee</p>
                                </div>
                                <div className="price_details_right">
                                    <p className="bolder-text">${item.diffInDays * price * item.peopleNumber}</p>
                                    <p className="bolder-text">$20</p>
                                    <p className="bolder-text">${item.diffInDays * price * 0.1 * item.peopleNumber}</p>
                                </div>
                            </div>
                                <div className="price_details_total">

                                    <div className="price_details_total-left">
                                            <p className="red-text bolder-text">Total (USD)</p>
                                    </div>
                                    <div className="price_details_total-right">
                                            <p className="red-text bolder-text">${(item.diffInDays * price * item.peopleNumber) + 20 + (item.diffInDays * price * 0.1 * item.peopleNumber)}</p>
                                    </div>

                                </div>
                                <div className="reserve__section_buttons">
                                    <Button onClick={()=>deleteReservedCard(item?.order_id)} className="dlt_button red_btn">Delete</Button>
                                    <Button onClick={()=>sendReservationRequest(item,MDYStartDate,MDYEndDate)}  className="sbt_button red_btn">Submit</Button>
                                </div>
                                
                            
                        </div>
                    // </div>

)
})
     
    :'' }
           <div className="reserved_section">

                {savedReservations.map((resservationItem)=>{
                    console.log('resservationItem',resservationItem);
                    const {address,city_name,country_name,event_img,name,phone_number,price,rating,total_price,reservation_uid,username,first_name,last_name,days,people_number,end_date,start_date} = resservationItem;
                   
                    const deleteReservation = (reservationId) => {
                        axios.delete(`http://localhost:4005/reservation/${reservationId}`)
                        .then(() => {
                            const updatedReservations = savedReservations.filter(item => item.reservation_uid !== reservationId);
                            
                            setSavedReservations(updatedReservations);
                            console.log(`Deleted reservation with UID: ${reservationId}`);
                        })
                        .catch(error => {
                            console.error('Error deleting reservation:', error);
                        });
                    };

                    return(
                        <div key={reservation_uid} className="reserved_item">
                            <div>
                            <div className="reserve_section_header">
                                <img src={event_img}/>
                                <div className="reserve_section_header_center">
                                    <div>
                                        <h2 className="red-text">Rezerved({start_date}-{end_date})</h2>
                                        <p>{name}</p>
                                        <p>address:{address}</p>
                                    </div>
                                        <p>rate:{rating}<FaStar/></p>
                                        <p><FaPhoneSquareAlt/>{phone_number}</p>
                                </div>
                            </div>
                            <div className="div_h2"><h2 className="h2_price_details">Price details</h2></div>
                            <div className="price_details">
                                <div className="price_details_left">
                                    <p>${price} x {days} night(s) x {people_number} person(s)</p>
                                    <p className="underscore">Cleaning fee</p>
                                    <p className="underscore">Click&Go service fee</p>
                                </div>
                                <div className="price_details_right">
                                    <p className="bolder-text">${days * price * people_number}</p>
                                    <p className="bolder-text">$20</p>
                                    <p className="bolder-text">${days * price * 0.1 * people_number}</p>
                                </div>
                            </div>
                                <div className="price_details_total">

                                    <div className="price_details_total-left">
                                            <p className="red-text bolder-text">Total (USD)</p>
                                    </div>
                                    <div className="price_details_total-right">
                                            <p className="red-text bolder-text">{total_price}</p>
                                    </div>

                                </div>
                            </div>
                            <div className="delete_btn_div">
                            <Button onClick={() => deleteReservation(reservation_uid)} className="reserved_btn dlt_button red_btn">Delete</Button>
                            </div>
                        </div>
                    )
                })}
           </div>
        </div>
           {/* <Footer className='profile_footer'/> */}
        </>
           
        
           ) 

       
}

function mapStateToProps(state){
   return  {card : state};
}

function mapDispatchToProps(dispatch){
    return{
       
        Delete:uuid => dispatch(DeleteCart(uuid))
     
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Profile);