const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  blog
    ? response.json(blog.toJSON())
    : response.status(404).end()
})

blogsRouter.post('/', async (request, response) => {
  const newBlog = new Blog(request.body)

  if (newBlog.title && newBlog.url) {
    const savedBlog = await newBlog.save()
    response.status(201).json(savedBlog.toJSON())
  } else {
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    likes: request.body.likes
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
  updatedBlog
    ? response.status(200).json(updatedBlog.toJSON())
    : response.status(404).end()

})

module.exports = blogsRouter