import request from '@/utils/request'

export const findCategories = () => {
  return request({
    method: 'get',
    url: '/self/category'
  })
}

export const findArticlesByCategoryId = ({ cid, page }) => {
  return request({
    method: 'get',
    url: '/self/articles',
    params: {
      cid,
      page
    }
  })
}