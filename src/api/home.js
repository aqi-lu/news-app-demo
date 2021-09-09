import request from '@/utils/request'

export const findCategories = () => {
  return request({
    method: 'get',
    url: '/category'
  })
}