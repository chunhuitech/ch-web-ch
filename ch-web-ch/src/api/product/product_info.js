import fetch from '@/utils/fetch'
export function fetchList(params) {
  return fetch({
    url: '/productinfo/search',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

export function del(params) {
  return fetch({
    url: '/productinfo/del',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

export function get(params) {
  return fetch({
    url: '/productinfo/get',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

export function mod(params) {
  return fetch({
    url: '/productinfo/mod',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

export function add(params) {
  return fetch({
    url: '/productinfo/add',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

