import React, { useState, useEffect } from 'react'
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

  const addBlog = (e) => {
    e.preventDefault()
    const newBlog = {
      title: title,
      author: author || '',
      url: url
    }

    console.log('title', title)
    console.log('author', author)
    console.log('url', url)

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')       
        setAuthor('')
        setUrl('')
      })
  }

  const LoginFormProps = {
    loginHandler,
    username,
    setUsername,
    password,
    setPassword
  }

  if (user === null) {
    return (
      <LoginForm {...LoginFormProps} />
    )
  }
  
  return (
    <div>
      <Blogs blogs={blogs} username={user.username} logoutHandler={logoutHandler} />
      <CreateBlog {...{ addBlog, title, author, url, setTitle, setAuthor, setUrl }} />
    </div>
  )
}

export default App