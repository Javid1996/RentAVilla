// const jwt = require('jsonwebtoken');



//   function authenticateJWT(req, res, next) {
//     const accessToken = req.cookies.token;
//     // const refreshToken = req.cookies.refreshToken;
  
//     if (!accessToken) {
//       return res.status(401).json({ message: 'Access token not found' });
//     }
  
//     jwt.verify(accessToken, secretKey, (err, users) => {
//       if (err) {
    
//         if (!refreshToken) {
//           return res.status(403).json({ message: 'Token verification failed' });
//         }
  
//         jwt.verify(refreshToken, secretKey, (err, users) => {
//           if (err) {
//             return res.status(403).json({ message: 'Refresh token verification failed' });
//           }
  
        
//           const newAccessToken = jwt.sign({ id: users.user_id, username: users.username }, secretKey, {
//             expiresIn: '10h', 
//           });
  
         
//           res.cookie('token', newAccessToken, { httpOnly: true });
  
//           req.users = users;
//           next();
//         });
//       } else {
       
//         req.users = users;
//         next();
//       }
//     });
//   }
//   module.exports = {
//   authenticateJWT
// }


const jwt = require('jsonwebtoken');
const secretKey = 'secretkey';


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; 

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); 
      }

      req.user = user; 
      
      next(); 
    });
  } else {
    res.sendStatus(401); 
  }
};

module.exports = {verifyToken};