import React, { useState, useEffect, useRef } from 'react'
import Logout from './components/Logout'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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

  const loginHandler = async (userData) => {
    try {
      const user = await loginService.login(userData)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      
      setUser(user)
    } catch (exception) {
      console.log('wrong credentials')
    }
  }

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlogRef = useRef()

  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      addBlogRef.current.toggleVisibility()
      setBlogs(blogs.concat(returnedBlog))
      
    } catch (error) {
      if (error.response.data.error === 'token expired') {
        logoutHandler()
      }
      console.log(error.response.data.error)
    }
  }

  if (user === null) {
    return (
      <LoginForm loginHandler={loginHandler} />
    )
  }
  
  return (
    <div>
      <h2>blogs</h2>
      <Logout logoutHandler={logoutHandler} username={user.username} />

      <h2>create new blog</h2>
      <Togglable buttonLabel="create new blog" ref={addBlogRef}>
        <CreateBlog createBlog={addBlog} />
      </Togglable>

      <Blogs blogs={blogs} username={user.username} logoutHandler={logoutHandler} />
    </div>
  )
}

export default App