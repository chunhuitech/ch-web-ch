import fetch from '@/utils/fetch'
export function fetchList(params) {
  return fetch({
    url: '/page/search',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}
