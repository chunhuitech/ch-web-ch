import fetch from '@/utils/fetch'
// import qs from 'qs'
export function fetchList(params) {
  return fetch({
    url: '/role/search',
    method: 'post',
    data: JSON.stringify(params), // qs.stringify(params) , // JSON.stringify(params), //
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

export function add(params) {
  return fetch({
    url: '/role/add',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

export function del(params) {
  return fetch({
    url: '/role/del',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

export function mod(params) {
  return fetch({
    url: '/role/mod',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}
