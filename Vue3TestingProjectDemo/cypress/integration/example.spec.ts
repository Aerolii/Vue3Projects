// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('visits the app root url', () => {
    console.log('123', 123)
    cy.visit('/about')
    cy.contains('h1', 'You did it!')
  })
})
