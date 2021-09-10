import request from '@/utils/request'

export const findCategories = () => {
  return request({
    method: 'get',
    url: '/category'
  })
}

export const findArticlesByCategoryId = ({ cid, page }) => {
  return request({
    method: 'get',
    url: '/articles',
    params: {
      cid,
      page
    }
  })
}