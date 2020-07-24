import request from '@/utils/request'

export function coursebase(data) {
  return request({
    url: `/eduservice/educourse/step1`,
    method: 'post',
    data:data
  })
}

export function Delete(id) {
  return request({
    url: `/eduservice/educourse/${id}`,
    method: 'delete',

  })
}

export function page(page,size) {
  return request({
    url: `/eduservice/educourse/${page}/${size}`,
    method: 'get',
  })
}

export function select(id) {
  return request({
    url: `/eduservice/educourse/${id}`,
    method: 'get',
  })
}
