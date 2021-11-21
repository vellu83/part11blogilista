const config = require('./server/utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./server/controllers/blogs')
const usersRouter = require('./server/controllers/users')
const loginRouter = require('./server/controllers/login')
const middleware = require('./server/utils/middleware')
const logger = require('./server/utils/logger')
const mongoose = require('mongoose')


logger.info('connecting to', config.MONGODB_URI)

app.get('/health', (req, res) => {
    res.send('ok')
})

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDb')
    })
    .catch((error) => {
        logger.error('error connecting:', error.message)
    })

app.use(cors())
app.use(express.static('build'))

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./server/controllers/tests')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app