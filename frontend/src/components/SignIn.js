import React,{useState} from "react";
import { Button } from "@mui/base";
import '../Styles/SignIn.css'
import user_icon from '../img/person.png'
import email_icon from '../img/email.png'
import password_icon from '../img/password.png'
import Header2 from "./Header 2";
import Footer from "./Footer";
import axios from "axios";
import { connect } from "react-redux";
import { setJwtToken, setUser } from "../actions";
import {useDispatch} from "react-redux"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

 function SignIn(props) {
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let dispatch = useDispatch();
    const navigate = useNavigate();


    async function onSubmit(){
        if(action==='Login'){
            try {
                const response = await axios.post('http://localhost:4005/sign-in', {
                  username,
                  password
                });
                console.log('Login Success:', response.data);
               
                // props.setJwt(response.data)
                dispatch(setJwtToken(response.data))


                const user = await axios.get('http://localhost:4005/user',{
                    headers: {
                      Authorization: `Bearer ${response.data.token}`
                    }
                })

                dispatch(setUser({user:user.data}))
                navigate("/");
              } catch (error) {
                toast("Wrong username/password!")
                console.error('Login Error:', error);
              } 
        }else{
            try {
                const response = await axios.post('http://localhost:4005/sign-up', {
                  username,
                firstName,
                lastName,
                password,
                email
                });
                console.log('Signup Success:', response.data);
                dispatch(setJwtToken(response.data))


                const user = await axios.get('http://localhost:4005/user',{
                    headers: {
                      Authorization: `Bearer ${response.data.token}`
                    }
                })

                dispatch(setUser({user:user.data}))
                navigate("/");
              } catch (error) {
                toast(error.response.data)
                console.error('Signup Error:', error.response.data);
              } 
            
        }
    }

    const[action,setAction]=useState('Sign Up')
    return(
    <div className="signInPage">
    <Header2/>
     <div className="sign_container">
        <div className="header1">
            <div className="sign_text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            {action==='Login' ? <div></div> : <div className="input">
                <img src={user_icon} alt=""/>
                <input onChange={(e)=>{setFirstName(e.target.value)}} type="text" placeholder="First Name"/>
            </div> }
            {action==='Login' ? <div></div> : <div className="input">
                <img src={user_icon} alt=""/>
                <input onChange={(e)=>{setLastName(e.target.value)}} type="text" placeholder="Last Name"/>
            </div> }
            <div className="input">
                <img src={user_icon} alt=""/>
                <input onChange={(e)=>{setUsername(e.target.value)}} type="text" placeholder="Username"/>
            </div>
            {action==='Login' ? <div></div> : <div className="input">
                <img src={email_icon} alt=""/>
                <input onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Email"/>
            </div> }
            
            <div className="input">
                <img src={password_icon} alt=""/>
                <input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password"/>
            </div>
        </div>
        {action==='Sign Up'?<div></div> : <div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
        
        <div className="submit-container">
            <div className={action==='Login'?'submit gray':"submit"} onClick={()=>{setAction("Sign Up")}} >Sign Up</div>
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}} >Sign In</div>
            <div className='submit' onClick={()=>{onSubmit()}} >Submit</div>
        </div>
     </div>
     <Footer/>
     </div>
    )
}

function mapDispatchToProps(dispatch){
    return{
       
        setJwt:data => dispatch(setJwtToken(data)),
      
     
    }
}

export default connect(mapDispatchToProps)(SignIn);