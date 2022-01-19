const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const fileUpload = require('express-fileupload')
require('dotenv').config()

const radiusRouter = require('./src/routes/radiusRouter')
const incidentRouter = require('./src/routes/incidentRouter')
const commentRouter = require('./src/routes/commentRouter')
const authRouter = require('./src/routes/authRouter')

const PORT = process.env.PORT ?? 3000

app.use(
	cors({
		origin: true,
		credentials: true,
	})
)
app.use(fileUpload())
app.use(express.static(path.join(process.env.PWD, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/incident', incidentRouter)
app.use('/comment', commentRouter)
app.use('/radius', radiusRouter)
app.use('/auth', authRouter)

app.listen(PORT, () => {
	console.log(`Server has been started on PORT: ${PORT}`)
})
