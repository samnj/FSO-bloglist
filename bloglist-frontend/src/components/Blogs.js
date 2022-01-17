import React, { useState } from 'react'

const Blogs = ({ blogs, addLike, user, deleteHandler }) => {

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  
  return (
  <div>
    {sortedBlogs.map(blog =>
      <Blog key={blog.id} blog={blog} addLike={addLike} user={user} deleteHandler={deleteHandler} />
    )}
  </div>
  )
}

const Blog = ({ blog, addLike, user, deleteHandler }) => {
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
    const blogObject = { ...blog, likes: blog.likes + 1 }
    addLike(blog.id, blogObject)
  }

  const removeBlog = () => {
    if (window.confirm('Are you sure you want to remove this blog?')) {
      deleteHandler(blog.id)
    }
  }

  const blogUser = blog.user[0].username

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showDetails}>
        <div>URL: {blog.url}</div>
        <div>likes: {blog.likes} <button onClick={likeHandler}>like</button></div>
        <div>user: {blogUser}</div>
        {user.username === blogUser &&
          <button onClick={removeBlog}>remove</button>  
        }
      </div>
    </div>
)}

export default Blogs