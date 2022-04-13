import apiConfig from './apiConfig.json'

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
