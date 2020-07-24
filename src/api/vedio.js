import request from '@/utils/request'

export function save(data) {
  return request({
    url: `/eduservice/eduvideo`,
    method: 'post',
    data:data
  })
}