import Taro from '@tarojs/taro'
import config from '../config.json'


/**
 * 用户登录
 * @param user 用户的信息
 * @param success {Function} 成功的回调函数
 * @param fail {Function}    失败的回调函数
 * @param complete {Function} 一切结束之后的回调函数
 */
export function userLogin(user, success, fail, complete) {
  Taro.request({
    url: `${config['http']['apiBase']}/common/auth/login`,
    method: 'POST',
    data: {
      username: user.username,
      password: user.password
    },
    success: resp => {
    //   const data: CommonResponse = resp.data
      if (data.status.success) {
        success(data.data)
      } else {
        fail(data.status.msg)
      }
    },
    fail: err => {
      console.error('userLogin', err)
      fail('服务器错误')
    },
    complete: () => {
      complete()
    }
  })
}
