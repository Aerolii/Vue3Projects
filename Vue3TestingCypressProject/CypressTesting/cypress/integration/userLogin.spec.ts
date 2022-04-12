import UserLoginTest from './userLogin_test'

describe('first component test', () => {
  it('user login', () => {
    const login = new UserLoginTest()
    login.visit()
    login.login('123', '123')
    login.check('登录成功')
  })
})
