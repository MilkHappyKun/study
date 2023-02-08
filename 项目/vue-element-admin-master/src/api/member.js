import request from '@/utils/request'

export function getMemberList(params) {
  return request({
    url: '/admin/user/list',
    method: 'get',
    params
  })
}

export function getAddressList(params) {
  return request({
    url: '/admin/address/list',
    method: 'get',
    params
  })
}

export function getCollectList(params) {
  return request({
    url: '/admin/collect/list',
    method: 'get',
    params
  })
}

export function getFootprintList(params) {
  return request({
    url: '/admin/footprint/list',
    method: 'get',
    params
  })
}

export function getHistoryList(params) {
  return request({
    url: '/admin/history/list',
    method: 'get',
    params
  })
}

export function getFeedbackList(params) {
  return request({
    url: '/admin/feedback/list',
    method: 'get',
    params
  })
}
