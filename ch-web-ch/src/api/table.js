import fetch from '@/utils/fetch'

export function getList(params) {
  return fetch({
    url: '/test/table/list',
    method: 'get',
    params
  })
}
