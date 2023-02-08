import request from '@/utils/request'

export function getGoodList(params) {
  return request({
    url: '/good/list',
    method: 'get',
    params
  })
}

export function getAllCates(params = {}) {
  return request({
    url: '/cate/all',
    method: 'get',
    params
  })
}

export function submitGood(data) {
  return request({
    url: '/good/update',
    method: 'POST',
    data
  })
}

export function getGoodInfo(id) {
  return request({
    url: '/good/info',
    method: 'GET',
    params: {
      id
    }
  })
}

export function getCheckGoodList(params) {
  return request({
    url: '/check/good/list',
    method: 'get',
    params
  })
}

export function checkGood(good_id) {
  return request({
    url: '/check/good',
    method: 'POST',
    data: {
      good_id,
      check: 1
    }
  })
}

export function goodDel(ids) {
  return request({
    url: '/good/del',
    method: 'POST',
    data: {
      ids
    }
  })
}