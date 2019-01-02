import fetch from '@/utils/fetch'
export function fetchList(params) {
  return fetch({
    url: '/class/children',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

export function fetchAll(params) {
  return fetch({
    url: '/class/all',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}
