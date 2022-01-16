import React, { useState } from 'react'

const Blogs = ({ blogs }) => {
  return (
  <div>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
  )
}

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showDetails = { display: visible ? '' : 'none' }
  const buttonLabel = visible ? 'hide' : 'show'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showDetails}>
        <div>URL: {blog.url}</div>
        <div>likes: {blog.likes} <button>likes</button></div>
        <div>user: {blog.user[0].username}</div>
      </div>
    </div>
)}

export default Blogs