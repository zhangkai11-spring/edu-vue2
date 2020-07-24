import request from '@/utils/request'

export function save(data,courseid) {
  return request({
    url: `/eduservice/educhapter/add/${courseid}`,
    method: 'post',
    data:data
  })
}

export function select(id) {
  return request({
    url: `/eduservice/educhapter/${id}`,
    method: 'get',
  })
}

export function Delete(id) {
  return request({
    url: `/eduservice/educhapter/${id}`,
    method: 'delete',

  })
}

