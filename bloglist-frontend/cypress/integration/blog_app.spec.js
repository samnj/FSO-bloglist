describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'sam',
      name: 'samir',
      password: '12345678'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
  })

  describe('Login', function() {
    it('suceeds with correct credentials', function() {
      cy.get('#username').type('sam')
      cy.get('#password').type('12345678')
      cy.get('#login-button').click()

      cy.contains('sam logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('sam')
      cy.get('#password').type('11111111')
      cy.get('#login-button').click()

      cy.get('html').should('not.contain', 'sam logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('sam')
      cy.get('#password').type('12345678')
      cy.get('#login-button').click()
    })

    it.only('A blog can be created', function() {
      cy.get('#new-blog-button').click()
      cy.get('#title').type('blog title')
      cy.get('#author').type('blog author')
      cy.get('#url').type('blog url')
      cy.get('#create-button').click()

      cy.contains('blog title - blog author')
    })
  })
})