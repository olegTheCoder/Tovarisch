const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../db/models')

router.post('/signup', async (req, res) => {
	const { nickname, name, email, password } = req.body

	if (nickname && name && email && password) {
		try {
			const hashedPass = await bcrypt.hash(password, 10)
			const newUser = await User.create({ nickname, name, email, password: hashedPass })
			req.session.user = {
				id: newUser.id,
				nickname: newUser.nickname,
				name: newUser.name,
			}

			return res.json({ id: newUser.id, nickname: newUser.nickname, name: newUser.name })
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
			const currentUser = await User.findOne({ where: { email } })
			if (currentUser && (await bcrypt.compare(password, currentUser.password))) {
				req.session.user = {
					id: currentUser.id,
					nickname: currentUser.nickname,
					name: currentUser.name,
				}
				return res.json({
					id: currentUser.id,
					nickname: currentUser.nickname,
					name: currentUser.name,
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

router.get('/signout', (req, res) => {
	req.session.destroy()
	res.clearCookie('sid')
	return res.sendStatus(200)
})

module.exports = router
