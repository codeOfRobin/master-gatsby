const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'faustino.brakus69@ethereal.email',
    pass: 'GxPfMYHuuA6GYDqUTU',
  },
});
