import React from 'react'
import Blog from './Blog'

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

export default Blogs