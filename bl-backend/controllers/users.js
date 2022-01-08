const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1, title: 1, author: 1
  })

  response.status(200).json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  const password = body.password

  if (!password || password.trim().length === 0) {
    return response.status(400).json({
      error: 'password required'
    })
  }

  if (password[0] === ' ' || password[password.length - 1] === ' '){
    return response.status(400).json({
      error: 'password can\'t start or end with space'
    })
  }

  if (password.length < 3) {
    return response.status(400).json({
      error: 'password should be at least three characters long'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser.toJSON())
})

module.exports = usersRouter