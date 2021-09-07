import request from '@/utils/request'

export async function topData() {
  return request({
    url: '/main/queryTopData',
    method: 'get',
  })
}