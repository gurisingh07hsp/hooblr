const {generateToken} = require('../middleware/auth')
const sendToken = (user, statusCode, res) => {
  const token = generateToken(user._id);

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true on Vercel
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  };
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user: user.getPublicProfile()
  });
};

module.exports = sendToken; 