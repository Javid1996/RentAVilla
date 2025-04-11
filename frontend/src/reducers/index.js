import { combineReducers } from 'redux';
import {ADD_CART, DELETE_CART,SET_JWT_TOKEN,DELETE_JWT_TOKEN,SEND_START_DATE,SEND_END_DATE,SEND_PEOPLE_NUMBER,SEND_DIFF_IN_DAYS, SET_USER,CLEAR_USER} from  '../actions/index';


const initState= {
    
    Carts:[],
    jwtToken:undefined,
    dateInfo: {
        startDate: new Date(),
        endDate: new Date(),
        diffInDays: 0,
        peopleNumber: 1
      },
    user: undefined
    };
    




function todoProduct(state = initState,action){
    switch(action.type){
        
        case ADD_CART:
           
                let cart = {
                    id:action.payload.event_id,
                    name:action.payload.name,
                    image:action.payload.event_img,
                    price:action.payload.price,
                    days:action.payload.inputValue,
                    rating:action.payload.rating,
                    address:action.payload.address,
                    order_id:crypto.randomUUID(),
                    startDate: state.dateInfo.startDate, 
                    endDate: state.dateInfo.endDate, 
                    diffInDays: state.dateInfo.diffInDays, 
                    peopleNumber: state.dateInfo.peopleNumber
                    
                } 
                return {...state,Carts:[...state.Carts,cart]}
                
            
            
            
           
            case DELETE_CART:
                console.log(action.payload);
                return{
                    ...state,
                   
                    Carts:state.Carts.filter(item=>{
                        return item.order_id!=action.payload
                    })
                   
                }

                case SEND_START_DATE:
                    console.log('send start date',action.payload);
                    return { ...state, dateInfo: {...state.dateInfo, startDate: action.payload }};
              
                case SEND_END_DATE:
                    return { ...state, dateInfo: {...state.dateInfo, endDate: action.payload}};
              
                case SEND_DIFF_IN_DAYS:
                    return { ...state, dateInfo: {...state.dateInfo, diffInDays: action.payload }};
              
                case SEND_PEOPLE_NUMBER:
                    return { ...state, dateInfo: {...state.dateInfo, peopleNumber: action.payload }};


                case SET_JWT_TOKEN:
                    
                    return{...state,jwtToken:action.payload.token}

                    
                    case DELETE_JWT_TOKEN:
                        return{...state,jwtToken:undefined}

                    
                    case SET_USER:
                        return{...state,user:action.payload.user}
                    
                    case CLEAR_USER:
                        return{...state,user:undefined}
                        
                        
        default:
            return state;
    }
}

// function dateInput(state = initState,action){
//     switch(action.type){
        
//         case INPUT_DATE:
           
//                 let date = {
//                     // id:action.payload.event_id,
//                     // name:action.payload.name,
//                     // image:action.payload.event_img,
//                     // price:action.payload.price,
//                     // days:action.payload.inputValue,
//                     // rating:action.payload.rating,
//                     // address:action.payload.address,
//                     // order_id:crypto.randomUUID()
//                     date:'DaTeDaTeDaTe'
//                 } 
//                 return {...state,date}
           
//     }
// }


const CardApp = combineReducers({
    _todoProduct:todoProduct
});
export default CardApp;