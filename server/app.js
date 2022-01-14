require('dotenv').config()
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const app = express()
const PORT = process.env.PORT
const indexRouter = require('./routes/index.routes')
const userRouter = require('./routes/user.routes')

const sessionConfig = {
	store: new FileStore(),
	key: 'sid',
	secret: 'secret',
	resave: false,
	saveUninitialized: false,
	httpOnly: false,
	cookie: { expires: 24 * 60 * 60e3 },
}

const sessionParser = session(sessionConfig)

app.use(
	cors({
		origin: true,
		credentials: true,
	})
)

app.use(sessionParser)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
	const user = req.session.user
	res.locals.user = user
	next()
})

app.use('/', indexRouter)
app.use('/user', userRouter)

app.listen(PORT, console.log(`Server started on port: ${PORT}`))
