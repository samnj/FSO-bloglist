import React from 'react'

const Blogs = ({ blogs }) => {
  return (
  <div>
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

export default Blogs