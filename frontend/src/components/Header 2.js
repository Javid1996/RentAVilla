import React, { useEffect } from 'react'
import '../Styles/Header.css'
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar } from '@mui/material';
import src1 from '../img/logo/logo2.jpeg'
import { Routes,Route, Link } from "react-router-dom"
import  {  useState, useRef } from "react";
import {useDispatch} from "react-redux"
// import { mapStateToProps } from 'react-redux';
import {connect,useSelector} from 'react-redux';
import { deleteJwtToken, clearUser } from '../actions';
// import { useHistory } from "react-router-dom"


function Header2(props){
   let reducer = useSelector(state=> state);
   let dispatch = useDispatch();
   console.log('reducer2>>>>>>>',reducer);
   const [currentResult, setResult] = useState([]);
   let user = useSelector(state=> state._todoProduct.user);
   // const history = useHistory();
   
   console.log('current value====',currentResult);

   useEffect(()=>{
      console.log(user)
   }, [user])

   console.log('reducer----->',reducer);

    return(

       <div className='header'>
        <Link to={`/`}>
        <img
             className="logo"
            //  src="https://i.pinimg.com/originals/3c/bf/be/3cbfbe148597341fa56f2f87ade90956.png"
             src={src1}
            //  src='Users/Javid/Desktop/Final_Project_Airbnb/frontend/public/img'
             alt=""
                />
         </Link>

      

         <div className='header_right'>
            
         {reducer._todoProduct.jwtToken === undefined ? <Link to='/signin'><p>Login</p></Link> : <Link to='/' onClick={()=>{dispatch(deleteJwtToken()) ;dispatch(clearUser());}}><p>Sign Out</p></Link>}
            
            {/* <LanguageIcon/>
            <ExpandMoreIcon/> */}
            {reducer._todoProduct.user !== undefined ? <Link  className='username' to={`/profile`}><p className='username'>{user.username}</p></Link> :<p></p>}
            {reducer._todoProduct.user !== undefined && <Link to={`/profile`}><img style={{width: 50, height: 50}} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${user.username}`}/></Link>}
         </div>
       </div>
        
    )
}



export default Header2