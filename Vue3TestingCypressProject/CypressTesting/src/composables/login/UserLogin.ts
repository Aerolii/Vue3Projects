export default class UserLogin {
  private hasEmpty(username: string, password: string) {
    return !username || !password
  }

  private validator(reg: RegExp, value: string) {
    return reg.test(value)
  }

  login(name: string, pwd: string, nameReg: RegExp, pwdReg: RegExp) {
    if (this.hasEmpty(name, pwd)) {
      return false
    } else if (!this.validator(nameReg, name) || !this.validator(pwdReg, pwd)) {
      return false
    }

    return true
  }
}
