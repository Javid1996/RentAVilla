const express = require('express');
const app = express();
const knex = require('knex');
const crypto = require('crypto');
const { log } = require('console');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = express.Router();

const secretKey = 'secretkey'
app.use(express.json());


const db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'neapolneapol1',
        database: 'airbnb',
        port: 5432  
    }
});

app.set("db", db);


const getAllAd = (req, res) => {
    db
    .select('event_id','name','address','city.city_name as cityName','country.country_name as countryName','rating','phone_number','price','event_img','event_types as type')
    .from('events')
    .join('country','events.fk_country_id','=' ,'country.country_id')
    .join('city','events.fk_city_id','=' , 'city.city_id')
    .join('event_types','events.fk_type_id','=' ,'event_types.type_id')
    .then(item =>{
        // console.log('item',item)
        res.json(item) 
    }
    )
};

const getPlaces = (req, res) => {
    const name =req.params.name+ "%";
    console.log(name)
    db
    .select('event_id','name','address','city.city_name as cityName','country.country_name as countryName','rating','phone_number','price','event_img','event_types as type')
    .from('events')
    .join('country','events.fk_country_id','=' ,'country.country_id')
    .join('city','events.fk_city_id','=' , 'city.city_id')
    .join('event_types','events.fk_type_id','=' ,'event_types.type_id')
    .whereILike('city.city_name',name)
    .orWhereILike('country.country_name', name)
    .orWhereILike('name', name)
    .orWhereILike('event_types', name)
    .then(item =>{
        // console.log('item',item)
        res.json(item) 
    }
    )
}

const signUp = (req, res) => {
    const {
        firstName,
        lastName,
        username,
        email,
        password
    } =req.body;


    db
    .select('*')
    .from('users')
    .where('username', username)
    .orWhere('email', email)
    .then(items => {
        let hashPass =  bcrypt.hashSync(password, 1)
        console.log(hashPass);
        if(items.length != 0){
            res.status(409).json("User with the given username/email exists")
        }else{
            db('users')
                .insert({
                first_name: firstName,
                last_name: lastName,
                username,
                email,
                password: hashPass
                })
            .then(response => {
                signIn({body:{username,password}},res)
                
            })
        }
    })
}

const signIn= (req, res) => {
    const {
        username,
        password
    } =req.body;


    
    let pass = bcrypt.hashSync(password, 1) 
    console.log(pass);
    db.select('username', 'password').from('users')
    .where('username', '=', username)
    .then(data => {
      if (data.length) {
        bcrypt.compare(password, data[0].password, (err, result) => {
          if (err) {
            res.status(500).json('Error during password comparison');
          } else if (result) {
            const token = jwt.sign({ username: username }, secretKey, { expiresIn: '10h' });
            res.json({ token });
          } else {
            res.status(400).json('Invalid credentials');
          }
        });
      } else {
        res.status(400).json('Invalid credentials');
      }
    })
    .catch(err => res.status(500).json('Error logging in'));

}




const getOneAd = (req, res) => {
    
    const id =Number(req.params.card_id);
    console.log('getOneParams',req.params); 

    db
    .select('*') 
    .from('events') 
    .join('country','events.fk_country_id','=' ,'country.country_id')
    .join('city','events.fk_city_id','=' , 'city.city_id')
    // .join('event_types','events.fk_type_id','=' ,'event_types.type_id')
    .where('event_id',id)
    .then(item =>{
        console.log('getOne',item)
        res.json(item[0]) 
    } 
    );

};



const getUsernameFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);

    const username = decoded.username; 

    return username;
  } catch (error) {
    console.error('Error in token decoding:', error);
  }
};

module.exports = getUsernameFromToken; 


const getReservation =(req,res) =>{
    console.log('req',req.headers.authorization);
    const authHeader = req.headers.authorization;


    const token = authHeader.split(' ')[1];
    const username = getUsernameFromToken(token);

    db
    .select('*')
    .from('users')
    .where(`username`, username)
    .then(user => {
        db
        .select('*') 
        .from('reservation') 
        .join('events','fk_event_id','=' ,'event_id')
        .join('country','events.fk_country_id','=' ,'country.country_id')
        .join('city','events.fk_city_id','=' , 'city.city_id')
        .join('users','reservation.fk_user_id','=','users.user_id')
        .where('fk_user_id',user[0].user_id)
        .then(item =>{
            console.log('reserved',item)
            res.json(item) 
        })
    });
}



const getUser =(req,res) =>{
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const username = getUsernameFromToken(token);

    db
    .select('*')
    .from('users')
    .where(`username`, username)
    .then(user => {
        res.json(user[0]) 
   
    });
}
const postReservation = (req,res) =>{
    console.log('backend req',req);
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const username = getUsernameFromToken(token);

    console.log(username)
    const reservation_uid=crypto.randomUUID();

    db
    .select('*')
    .from('users')
    .where(`username`, username)
    .then(user => {
        console.log("------>",user)
        db('reservation')
        .insert({
            fk_event_id: req.body.item.id,
            total_price: (req.body.item.price*req.body.item.diffInDays*req.body.item.peopleNumber)+(req.body.item.price*req.body.item.diffInDays*0.1*req.body.item.peopleNumber)+20,
            order_id:req.body.item.order_id,
            reservation_uid:reservation_uid,
            fk_user_id: user[0].user_id,  
            days: req.body.item.diffInDays,
            people_number:req.body.item.peopleNumber,
            start_date:req.body.MDYStartDate,
            end_date:req.body.MDYEndDate
        })
        .then(item=>{ 
            db
            .select('*') 
            .from('reservation') 
            .join('events','fk_event_id','=' ,'event_id')
            .join('country','events.fk_country_id','=' ,'country.country_id')
            .join('city','events.fk_city_id','=' , 'city.city_id')
            .join('users','reservation.fk_user_id','=','users.user_id')
            .where('reservation_uid',reservation_uid)
            // .where('username',username)
            .then(item =>{
                console.log('reserved',item)
                res.send(item) 
            })}
            
            )
    })
    
}


const deleteReservation = (req, res) => {
    const { reservationId } = req.params;
console.log('uid  to cto tebe nujno ------>' ,req.params.reservationId);
    db('reservation')
    .where('reservation_uid', '=', req.params.reservationId)
    .del()
        .then(deletedRows => {
            if (deletedRows > 0) {
                
                res.status(200).json({ message: 'Reservation deleted successfully' });
            } else {
                
                res.status(404).json({ error: 'Reservation not found' });
            }
        })
        .catch(err => {
            
            console.error('Error deleting reservation:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
};





module.exports = {
    getAllAd,
    getOneAd,
    postReservation,
    getReservation,
    getPlaces,
    signUp,
    signIn,
    getUser,
    deleteReservation
}