import React from 'react'

const LoginForm = ({ loginHandler, username, setUsername, password, setPassword }) => {
  return (
    <div>
      <h2>log in</h2>
      <form onSubmit={loginHandler}>
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