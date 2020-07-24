import request from '@/utils/request'



export function Delete(id) {
  return request({
    url: `/eduservice/educoursedescription/${id}`,
     method: 'delete',
  })
}
