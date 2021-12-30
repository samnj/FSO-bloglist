const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
// const helper = require('./test_helper')

const initialBlogs = [
  {
    title: 'first blog post',
    author: 'Samir Najul',
    url: 'lol.com',
    likes: 2
  },
  {
    title: 'scond blog post',
    author: 'Rimas LUjan',
    url: 'lmao.com',
    likes: 3
  },
  {
    title: 'second spelled right blog post',
    author: 'Rimas Lujan',
    url: 'lmao.com',
    likes: 420
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
}, 20000)

// describe('total likes', () => {

//   test('of all blogs', () => {
//     const result = helper.totalLikes(blogs)
//     expect(result).toBe(0)
//   })
// })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all posts are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('the unique identifier of blogs is called id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => expect(blog.id).toBeDefined())
})

test('a new post can be created', async () => {
  const newBlog = {
    title: 'new test blog',
    author: 'the tester',
    url: 'test.com',
    likes: 7
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)
})

test('blog likes defaults to 0', async () => {
  const newBlog = {
    title: 'second test blog',
    author: 'mom',
    url: 'mom.com.ar'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)
  const lastBlog = response.body[initialBlogs.length]
  expect(lastBlog.likes).toBe(0)
})

describe('new blog rejected', () => {
  test('if title is missing', async () => {
    const newBlog = {
      author: 'asd',
      url: 'missingtitle.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('if url is missing', async () => {
    const newBlog = {
      title: 'missingurl',
      author: 'asd'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})