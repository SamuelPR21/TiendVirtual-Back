import jwt from 'jsonwebtoken';

export function authenticaToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1] || req.cookies?.auth_token;

  if (!token) {
    return res.status(401).json({ message: 'No token, autorización denegada' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido o expirado' });
    }
    req.user = user; 
    next();          
  });
}
