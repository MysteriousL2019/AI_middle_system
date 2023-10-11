import { find, assign } from 'lodash'

const users = [
  // { username: 'admin', password: 'admin', uuid: 'admin-uuid', name: 'Admin' },
  // { username: 'editor', password: 'editor', uuid: 'editor-uuid', name: 'Editor' },
  // // { username: 'user1', password: 'user1', uuid: 'user1-uuid', name: 'User1' },
  { username: 'lfz', password: '20010509ZSERRt!', uuid: 'admin1-uuid', name: 'lfz' },
  { username: 'wyx', password: '20010509ZSERRt!', uuid: 'admin2-uuid', name: 'wyx' },
  { username: 'yfm', password: '20010509ZSERRt!', uuid: 'admin3-uuid', name: 'yfm' },
  { username: 'xh', password: '20010509ZSERRt!', uuid: 'admin4-uuid', name: 'xh' },
  { username: 'Susan', password: '20010509ZSERRt!', uuid: 'admin5-uuid', name: 'Susan' },
  { username: 'DavidTao', password: '20010509ZSERRt!', uuid: 'admin6-uuid', name: 'DavidTao' },
  { username: 'JayChou', password: '20010509ZSERRt!', uuid: 'admin7-uuid', name: 'JayChou' },


  { username: 'User1', password: '20010509ZSERRt!', uuid: 'user1-uuid', name: 'User1' },
  { username: 'User2', password: '20010509ZSERRt!', uuid: 'user2-uuid', name: 'User2' },
  { username: 'User3', password: '20010509ZSERRt!', uuid: 'user3-uuid', name: 'User3' },
  { username: 'User4', password: '20010509ZSERRt!', uuid: 'user4-uuid', name: 'User4' },
  { username: 'User5', password: '20010509ZSERRt!', uuid: 'user5-uuid', name: 'User5' },

]

export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  SYS_USER_LOGIN (data = {}) {
    // 模拟数据
    mock
      .onAny('/login')
      .reply(config => {
        const user = find(users, tools.parse(config.data))
        return user
          ? tools.responseSuccess(assign({}, user, { token: faker.random.uuid() }))
          : tools.responseError({}, '账号或密码不正确')
      })
    // 接口请求
    return requestForMock({
      url: '/login',
      method: 'post',
      data
    })
  }
})
