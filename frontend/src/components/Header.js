import React from 'react'
import '../Styles/Header.css'
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar } from '@mui/material';
import src1 from '../img/logo/logo2.jpeg'
import { Routes,Route, Link } from "react-router-dom"
import  {  useState, useRef } from "react";
import {connect,useSelector} from 'react-redux';
import {useDispatch} from "react-redux"
import { deleteJwtToken , clearUser } from '../actions';
// import { mapStateToProps } from 'react-redux';



function Header(props){
   let reducer = useSelector(state=> state);
   let user = useSelector(state=> state._todoProduct.user);
   let dispatch = useDispatch();

   console.log('reducer>>>>>>>',reducer);
   const [currentResult, setResult] = useState([]);
   
   console.log('current value====',currentResult);
   console.log('reducer----->',reducer);

    return(

       <div className='header'>
        <Link to={`/`}>
        <img
             className="logo"
             src={src1}
             alt=""
                />
         </Link>

         <div className='header_center'>
            <form>
               <input className='main_search' value={currentResult} onChange={(e)=> {
                  props.onChange(e.target.value)
                  setResult(e.target.value)
               }} type='text'/>
               <SearchIcon/> 
            </form>
            
         </div>

         <div className='header_right'>
            
         {reducer._todoProduct.jwtToken === undefined ? <Link to='/signin'><p>Login</p></Link> : <Link to='/' onClick={()=>{dispatch(deleteJwtToken()) ;dispatch(clearUser())}}> Sign Out </Link>}
            
            {/* <LanguageIcon/> */}
            <ExpandMoreIcon/>
            {reducer._todoProduct.user !== undefined ? <Link  className='username' to={`/profile`}><p className='username'>{user.username}</p></Link> :<p></p>}
          
            {reducer._todoProduct.user !== undefined && <Link to={`/profile`}><img style={{width: 50, height: 50}} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${user.username}`}/></Link>}
         </div>
       </div>
        
    )
}



export default Header