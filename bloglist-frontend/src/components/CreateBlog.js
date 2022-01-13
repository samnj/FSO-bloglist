import React from 'react'

const CreateBlog = ({ addBlog, title, author, url, setTitle, setAuthor, setUrl }) => {
  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        title
          <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
          <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
         <input
         type="text"
         value={url}
         name="URL"
         onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default CreateBlog