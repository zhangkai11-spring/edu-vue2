import request from '@/utils/request'

export function page(page,size) {
  return request({
    url: `eduservice/teacher/tea/page/${page}/${size}`,
    method: 'get',
  })
}

export function con(page,size,con) {
  return request({
    url: `eduservice/teacher/tea/pagecondition/${page}/${size}`,
    method: 'post' ,
    data:con  
  })
}

export function select(id) {
  return request({
    url: `eduservice/teacher/tea/${id}`,
    method: 'get'
  })
}


export function Delete(id) {
    return request({
      url: `eduservice/teacher/tea/${id}`,
      method: 'delete'
    })
  }

  export function update(teainfo) {
    return request({
      url: 'eduservice/teacher/tea',
      method: 'put',
      data:teainfo
    })
  }

  export function all() {
    return request({
      url: 'eduservice/teacher/tea/all',
      method: 'get',
    })
  }