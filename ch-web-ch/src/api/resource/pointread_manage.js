import fetch from '@/utils/fetch'
export function fetchListDianDu(params) {
  return fetch({
    url: '/readpoint/fetch',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

export function addDianDu(params) {
  return fetch({
    url: '/readpoint/add',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

export function delDianDu(params) {
  return fetch({
    url: '/readpoint/del',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

export function modDianDu(params) {
  return fetch({
    url: '/readpoint/mod',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

export function getDianDu(params) {
  return fetch({
    url: '/readpoint/getModel',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}
