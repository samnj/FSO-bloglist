import React, { useState } from 'react'

const Blogs = ({ blogs, addLike }) => {

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  console.log(blogs)
  console.log(sortedBlogs)
  
  return (
  <div>
    {sortedBlogs.map(blog =>
      <Blog key={blog.id} blog={blog} addLike={addLike} />
    )}
  </div>
  )
}

const Blog = ({ blog, addLike }) => {
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

  const likeHandler = () => {
    const blogObject = { ...blog }
    blogObject.likes += 1
    addLike(blog.id, blogObject)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showDetails}>
        <div>URL: {blog.url}</div>
        <div>likes: {blog.likes} <button onClick={likeHandler}>likes</button></div>
        <div>user: {blog.user[0].username}</div>
      </div>
    </div>
)}

export default Blogs