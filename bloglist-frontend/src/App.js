import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
    }
  }

  const LoginFormProps = {
    loginHandler,
    username,
    setUsername,
    password,
    setPassword
  }

  return (
    <div>
      {user === null
        ? <LoginForm {...LoginFormProps} />
        : <Blogs blogs={blogs} username={user.username} />
      }
    </div>
  )
}

export default App