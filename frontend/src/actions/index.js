export const ADD_CART = 'ADD_CART' ;
export const DELETE_CART = 'DELETE_CART';

export const SET_JWT_TOKEN ='SET_JWT_TOKEN'
export const DELETE_JWT_TOKEN ='DELETE_JWT_TOKEN'

export const SEND_START_DATE = 'SEND_START_DATE';
export const SEND_END_DATE = 'SEND_END_DATE';
export const SEND_DIFF_IN_DAYS = 'SEND_DIFF_IN_DAYS';
export const SEND_PEOPLE_NUMBER = 'SEND_PEOPLE_NUMBER';
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

export function AddCart(payload){
    return {
        type:'ADD_CART',
        payload
    }
}


export function DeleteCart(payload){
    return{
        type:'DELETE_CART',
        payload
    }
}

// export function inputDate(payload){
//     return{
//         type: INPUT_DATE,
//         payload
//     }
// }

export function setJwtToken(payload){
   
    return{
        type: SET_JWT_TOKEN,
        payload
    }
}

export function deleteJwtToken(payload){
    return{
        type: DELETE_JWT_TOKEN,
        payload
    }
}

export function setUser(payload){
    return{
        type: SET_USER,
        payload
    }
}



 export const sendStartDate = (date) => ({
    type: SEND_START_DATE,
    payload: date
  });
  
  export const sendEndDate = (date) => ({
    type: SEND_END_DATE,
    payload: date
  });
  
  export const sendDiffInDays = (days) => ({
    type: SEND_DIFF_IN_DAYS,
    payload: days
  });
  
  export const sendPeopleNumber = (number) => ({
    type: SEND_PEOPLE_NUMBER,
    payload: number
  });
  
  export const clearUser = () => {
    return {
        type: CLEAR_USER,
    };
};