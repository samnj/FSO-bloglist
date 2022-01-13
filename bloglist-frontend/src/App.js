import React, { useState, useEffect } from 'react'
import Logout from './components/Logout'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const loginHandler = async (e) => {
    e.preventDefault() 
    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
    }
  }

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async (e) => {
    e.preventDefault()
    const newBlog = {
      title: title,
      author: author || '',
      url: url
    }

    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')       
      setAuthor('')
      setUrl('')
    } catch (error) {
      if (error.response.data.error === 'token expired') {
        logoutHandler()
      }
      console.log(error.response.data.error)
    }
  }

  if (user === null) {
    return (
      <LoginForm {...{ loginHandler, username, setUsername, password, setPassword }} />
    )
  }
  
  return (
    <div>
      <h2>blogs</h2>
      <Logout logoutHandler={logoutHandler} username={user.username} />

      <h2>create new blog</h2>
      <CreateBlog {...{ addBlog, title, author, url, setTitle, setAuthor, setUrl }} />

      <Blogs blogs={blogs} username={user.username} logoutHandler={logoutHandler} />
    </div>
  )
}

export default App