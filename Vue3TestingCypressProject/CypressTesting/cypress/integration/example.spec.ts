// https://docs.cypress.io/api/introduction/api.html

// describe('My First Test', () => {
//   it('visits the app root url', () => {
//     cy.visit('/')
//     cy.contains('h1', 'You did it!')
//   })
// })

import apiConfig from './api/apiConfig.json'

describe('Application interface test', () => {
  it('短信接口测试', () => {
    const mobile = '18017686876'

    cy.request({
      url: apiConfig.baseURL + apiConfig.smsCodeUrl + '?mobile=' + mobile,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .its('body')
      .should('contain', { errcode: 0, errmsg: 'SUCCESS' })
      .then(res => {
        console.log('res', res)
        cy.wrap(mobile).as(mobile)
      })
  })
})
