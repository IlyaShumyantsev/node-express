module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  SESSION_SECRET: process.env.SESSION_SECRET,
  TRANSPORTER_DATA: {
    service: process.env.service,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  },
  EMAIL_FROM: process.env.EMAIL_FROM,
  BASE_URL: process.env.BASE_URL,
};
