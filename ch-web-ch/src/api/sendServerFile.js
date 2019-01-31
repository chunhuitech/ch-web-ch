import {sendServerFileFuc} from '@/utils/sendServerFile'

export function upImage(obj) {
  console.log(obj)
  return sendServerFileFuc({
    url: '/page/upImage',
    method: 'post',
    data: obj.data,
    suc:obj.suc
  })
}
