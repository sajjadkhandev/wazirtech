import jwt from 'jsonwebtoken';

const generateToken = (id, role = 'user') => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'wazirtech_fallback_jwt_secret_key_2026',
    {
      expiresIn: process.env.JWT_EXPIRE || '30d'
    }
  );
};

export default generateToken;
