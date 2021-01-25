const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req,res,next) {
  const token = req.header('x-auth-token');

  //check for token
  if(!token) return (
    res.status(401).json({msg: 'Medges ej!, ingen token för inloggning'})
  );

  try {
      // valitate token 
      const decode =  jwt.verify(token, config.get('jwt_key'));
    
      //add user from payload
      req.user = decode;
      next();
    
  } catch (error) {
    res.status(400).json({msg: 'Inloggning misslyckades'})
  }
};

module.exports = auth;