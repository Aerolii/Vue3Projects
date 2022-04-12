import userLoginSelector from './userLoginSelector.json'

export default class UserLoginTest {
  url: string
  constructor() {
    this.url = 'http://localhost:3000/login'
  }
  get username() {
    return cy.get(userLoginSelector.loginPage.loginComp.username)
  }

  get password() {
    return cy.get(userLoginSelector.loginPage.loginComp.password)
  }

  get submit() {
    return cy.get(userLoginSelector.loginPage.loginComp.submit)
  }

  get message() {
    return cy.get(userLoginSelector.loginPage.loginComp.message)
  }

  visit() {
    cy.visit(this.url)
  }

  check(message: string) {
    return this.message.should('contain', message)
  }

  login(name: string, pwd: string) {
    name && this.username.type(name)
    pwd && this.password.type(pwd)

    this.submit.click()
  }
}
