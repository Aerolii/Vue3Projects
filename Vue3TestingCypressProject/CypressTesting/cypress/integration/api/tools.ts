import apiConfig from './apiConfig.json'

export default class Tools {
  mobile: string
  constructor(mobile: string) {
    this.mobile = mobile
  }
  getSMSCode() {
    // const mobile = ''

    cy.request({
      url: apiConfig.baseURL + apiConfig.smsCodeUrl + '?mobile=' + this.mobile,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .its('body')
      .should('contain', { errcode: 0, errmsg: 'SUCCESS' })
      .then(res => {
        console.log('res', res)
        cy.wrap(this.mobile).as('mobile')
      })
  }

  login(smsCode: string) {
    cy.request({
      url: apiConfig.baseURL + apiConfig.loginPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        mobile: this.mobile,
        smsCode: smsCode
      }
    }).then(res => {
      console.log(res)
    })
    // .its('body')
    // .should('contain', { errcode: 0, errmsg: 'SUCCESS' })
  }
}
