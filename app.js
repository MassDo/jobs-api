require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
// import extra serity packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// import authorization
const authMiddleware = require('./middleware/authentication')
// import error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
// import router
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
// import database
const connectDB = require('./db/connect')
// middleware
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(rateLimiter({windowMs:60 * 1000, max:60}))


// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authMiddleware, jobsRouter)
// errors
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
// start server
const port = process.env.PORT || 3000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}
start()
