const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mailer = require('../../nodemailer')

const { User } = require('../../db/models')

const generateAccessToken = (id, nickname, name, email) => {
	const payload = {
		id: id,
		nickname: nickname,
		name: name,
		email: email,
	}
	return jwt.sign(payload, process.env.ACCESS_TOKEN)
}

router.post('/signup', async (req, res) => {
	const { nickname, name, email, password } = req.body

	if (nickname && name && email && password) {
		try {
			const emailExists = await User.findOne({ where: { email } })
			if (emailExists) {
				return res.json({ message: 'Пользователь с таким почтовым адрессом уже зарегистрирован' })
			}
			const nicknameExists = await User.findOne({ where: { nickname } })
			if (nicknameExists) {
				return res.json({ message: 'Такой никнейм занят' })
			}
			const hashedPass = await bcrypt.hash(password, 10)
			const newUser = await User.create({ nickname, name, email, password: hashedPass })
			const message = {
				to: email,
				subject: 'Поздравляем! Вы успешно зарегистрировались на нашем сайте.',
				html: `
				<h2>Поздравляем! Вы успешно зарегистрировались на нашем сайте.</h2>
				<i>данные вашей учетной записи</i>:
				<ul>
					<li>login: ${email}</li>
					<li>password: ${password}</li>
				</ul>
				<p>Данное письмо не требует ответа.</p>
				`,
			}
			mailer(message)
			const accessToken = generateAccessToken(newUser.id, newUser.nickname, newUser.name, newUser.email)
			return res.json({ accessToken })
		} catch (error) {
			return res.sendStatus(500)
		}
	} else {
		return res.sendStatus(400)
	}
})

router.post('/signin', async (req, res) => {
	const { email, password } = req.body
	if (email && password) {
		try {
			const currentUser = await User.findOne({ where: { email }, raw: true })
			console.log(currentUser)
			if (currentUser && (await bcrypt.compare(password, currentUser.password))) {
				const accessToken = generateAccessToken(currentUser.id, currentUser.nickname, currentUser.name, currentUser.email)
				return res.json({
					accessToken,
				})
			} else {
				return res.sendStatus(401)
			}
		} catch (error) {
			return res.sendStatus(500)
		}
	} else {
		return res.sendStatus(400)
	}
})

// router.get('/signout', (req, res) => {
// 	req.session.destroy()
// 	res.clearCookie('sid')
// 	return res.sendStatus(200)
// })

module.exports = router
