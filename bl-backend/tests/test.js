const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const blogs = []

  test('of all blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })
})
