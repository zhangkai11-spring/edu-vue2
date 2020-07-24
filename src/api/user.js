import request from '@/utils/request'

export function login() {
  return request({
    url: 'eduservice/teacher/tea/login',
    method: 'post',
  })
}

export function getInfo() {
  return request({
    url: 'eduservice/teacher/tea/info',
    method: 'get'   
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
