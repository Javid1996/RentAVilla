const express = require('express')
const router = express.Router()
const {verifyToken} = require('../middleware/authMiddleware')

const {
    getAllAd,
    getOneAd, 
    postReservation,
    getReservation,
    getPlaces,
    signIn,
    signUp,
    getUser,
    deleteReservation
} = require('./controller')



// router.get('/user',getUser)
// router.post('/sign-in',signIn)
// router.post('/sign-up',signUp)

router.get('/cards',getAllAd)
router.get('/cards/:card_id',getOneAd)
router.get('/places/:name',getPlaces)
router.get('/reservation',getReservation)
router.post('/reservation',postReservation);
router.delete('/reservation/:reservationId', deleteReservation);




module.exports = router