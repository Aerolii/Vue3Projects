import apiConfig from './apiConfig.json'
import Tools from './tools'

describe('Application interface test', () => {
  const tools = new Tools('18017686876')
  beforeEach(() => {
    tools.getSMSCode()
  })
  it('短信接口测试', function () {
    setTimeout(() => {
      // first
      tools.login('1785')
    }, 10000)
  })
})
