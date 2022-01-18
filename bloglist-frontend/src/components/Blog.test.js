import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('blog only renders title and author by default', () => {
  const blog = {
    'title': 'blog title',
    'author': 'blog author',
    'url': 'blog url',
    'likes': 420,
    'user': [{ 'username': 'testUser' }]
  }

  const user = {
    'username': 'testUser'
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const defaultView = component.container.querySelector('.defaultView')
  const expandedView = component.container.querySelector('.expandedView')

  expect(defaultView).toBeVisible()
  expect(defaultView).toHaveTextContent('title')
  expect(defaultView).toHaveTextContent('author')
  expect(defaultView).not.toHaveTextContent('url')
  expect(defaultView).not.toHaveTextContent('420')

  expect(expandedView).not.toBeVisible()
})