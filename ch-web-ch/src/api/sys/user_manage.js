import fetch from '@/utils/fetch'
export function fetchList(params) {
  return fetch({
    url: '/user/search',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

export function add(params) {
  return fetch({
    url: '/user/add',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

export function del(params) {
  return fetch({
    url: '/user/del',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

export function mod(params) {
  return fetch({
    url: '/user/mod',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

export function exist(params) {
  return fetch({
    url: '/user/exist',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

export function get(params) {
  return fetch({
    url: '/user/get',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}
