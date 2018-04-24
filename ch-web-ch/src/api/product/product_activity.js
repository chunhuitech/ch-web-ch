import fetch from '@/utils/fetch'
export function fetchList(params) {
  return fetch({
    url: '/activity/search',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

export function del(params) {
  return fetch({
    url: '/activity/del',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

export function get(params) {
  return fetch({
    url: '/activity/get',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}
