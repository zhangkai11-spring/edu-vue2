import request from '@/utils/request'

export function tree(page,size) {
  return request({
    url: `/eduservice/subject/all`,
    method: 'get',
  })
}
