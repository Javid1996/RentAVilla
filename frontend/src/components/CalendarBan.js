import React from "react";
import {useState} from "react";
import '../Styles/CalendarBan.css'
import {Button} from "@mui/material" 
import Search from "./Search";




function CalendarBan(){
    const [showSearch, setShowSearch]=useState(false)

    return(
        <div className="calendar">
            <div className="calendar__search">
                {showSearch && <Search/>}
                <Button onClick={()=>{setShowSearch(!showSearch)}} className="calendar__searchButton" variant="outlined">{showSearch ? 'Hide' : 'Select dates'}</Button>
            </div>
            
        </div>
    )
}

export default CalendarBan