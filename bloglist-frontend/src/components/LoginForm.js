import React, { useState } from 'react'

const LoginForm = ({ loginHandler }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (e) => {
    e.preventDefault()
    const userData = {
      username, password
    }
    loginHandler(userData)
  }

  return (
    <div>
      <h2>log in</h2>
      <form onSubmit={login}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm