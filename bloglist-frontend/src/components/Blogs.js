import React from 'react'

 const Blogs = ({ blogs, username, logoutHandler }) => {
   return (
    <div>
     <h2>blogs</h2>
     {username} logged in
     <LogoutBtn logoutHandler={logoutHandler} />
     <br /><br />
     {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
   </div>
   )
 }

const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

const LogoutBtn = ({logoutHandler}) => {
  return (
    <button name="logoutBtn" onClick={logoutHandler} type="button">
    logout
  </button>
  )
}

export default Blogs