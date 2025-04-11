import React,{useEffect,useState} from "react";
import '../Styles/Search.css'
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import {DateRangePicker} from 'react-date-range';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import { Button } from "@mui/material";
import { differenceInDays } from 'date-fns';
import {useDispatch} from "react-redux";
import {connect,useSelector} from 'react-redux';
import { sendStartDate, sendEndDate, sendDiffInDays, sendPeopleNumber } from "../actions";


function Search(){
    let reducer = useSelector(state=> state);
    let dispatch = useDispatch();
    console.log('reducer>>>>>>>',reducer);

    const [startDate,setStartDate] = useState(new Date());
    const [endDate,setEndDate] = useState(new Date());
    const [diffInDays, setDiffInDays] = useState(0);
    const [peopleNumber,setPeopleNumber] = useState(1);

    // const {startDate,endDate,diffInDays,peopleNumber} = data

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key:'selection'
    }
    
    function handleSelect(ranges){
        // let fullStartDate = ranges.selection.startDate
        // const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        // const formattedStartDate = fullStartDate.toLocaleDateString('en-US', options);
        setStartDate(ranges.selection.startDate);

        // let fullEndDate = ranges.selection.endDate
        // const formattedEndDate = fullEndDate.toLocaleDateString('en-US', options);
        setEndDate(ranges.selection.endDate);

        const diff = differenceInDays(ranges.selection.endDate, ranges.selection.startDate);
        setDiffInDays(diff);
    }
    
    const handleClick=()=>{
        
        dispatch(sendStartDate(startDate));
        
        dispatch(sendEndDate(endDate)); 
        
        dispatch(sendDiffInDays(diffInDays));
        
        dispatch(sendPeopleNumber(peopleNumber));
    }

    return(
        <div className="search">
            <DateRangePicker  minDate={new Date()} timePicker={false} ranges={[selectionRange]} onChange={handleSelect}/>
            <h2>Number of guests <PersonAddDisabledIcon/> </h2>
            <input onChange={(e)=>{setPeopleNumber(e.target.value)}} value={peopleNumber} min={0} defaultValue={1} type="number" />
            <Button onClick={handleClick} className="search_btn" variant="outlined">Search</Button>
            
           
        </div>
    )
}





export default Search