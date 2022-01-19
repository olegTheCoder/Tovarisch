require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(
	{
		host: process.env.SMTP_HOST,
		port: 465,
		secure: true,
		auth: {
			user: process.env.SMTP_USER_EMAIL,
			pass: process.env.SMTP_USER_PASSWORD,
		},
	},
	{
		from: `<${process.env.SMTP_USER_EMAIL}>`,
	}
)

const mailer = (message) => {
	transporter.sendMail(message, (err, info) => {
		if (err) {
			return console.log(err)
		}
		console.log('Email sent', info)
	})
}

module.exports = mailer
