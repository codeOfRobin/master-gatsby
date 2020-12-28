const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your recent order for ${total}</h2>
    <p>Please start walking over, we will have your order ready in teh next 20 minutes</p>
    <ul>
      ${order.map(
        (item) => `<li>
          <img src="${item.thumbnail}" alt="${item.name}" />
          ${item.size} ${item.name} - ${item.price}
        </li>`
      )}
    </ul>
    <p> Your total is ${total} due at pickup</p>
  </div>`;
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  const requiredFields = ['email', 'name', 'order'];

  const body = JSON.parse(event.body);

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `oops, you are missing the ${field}` }),
      };
    }
  }

  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `Why would you order nothing?` }),
    };
  }

  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
