import React from 'react'

 const Blogs = ({ blogs, username }) => {
   return (
    <div>
     <h2>blogs</h2>
     {username} logged in
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

export default Blogs