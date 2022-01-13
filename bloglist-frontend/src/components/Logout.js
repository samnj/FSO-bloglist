import React from 'react'

const Logout = ({ logoutHandler, username }) => {
  return (
    <div>
      {username} logged in
      <button name="logoutBtn" onClick={logoutHandler} type="button">
        logout
      </button>
    </div>
)
}

export default Logout