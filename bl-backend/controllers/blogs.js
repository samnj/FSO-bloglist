const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.status(200).json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  blog
    ? response.status(200).json(blog.toJSON())
    : response.status(404).end()
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (!(request.token && user.id)) {
    return response
      .status(401)
      .json({ error: 'token missing or invalid' })
  }

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  const user = request.user

  if (!blogToDelete) {
    return response
      .status(404)
      .json({ error: 'the blog doesn\'t exist' })
  } else if (user.id.toString() !== blogToDelete.user.toString()) {
    return response
      .status(403)
      .json({ error: 'can\'t delete blogs that belong to other users' })
  }

  await blogToDelete.remove()

  user.blogs = user.blogs.filter(blog => blog.toString() !== blogToDelete.id)
  await user.save()

  response.status(204).end()

})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    likes: request.body.likes
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user', { username: 1, name: 1 })

  if (!updatedBlog) {
    response.status(404).end()
  }

  response.status(200).json(updatedBlog.toJSON())
})

module.exports = blogsRouter