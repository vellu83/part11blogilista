const bcrypt = require('bcrypt')
require('express-async-errors')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async(request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, id: 1 })
    response.json(users.map(u => u.toJSON()))
})


usersRouter.post('/', async(request, response) => {
    const body = request.body

    if (!body.password || body.password.length < 3) {
        response.status(400).json({ 'error': 'password missing or less than 3 characters long' }).end()
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter