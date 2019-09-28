import { axios } from '@/utils/request'

const api = {
  stopTimeList: '/page/stop/getStopTimeList.htm',
  getStopTime: '/page/stop/getStopTimeByPageType.htm',
  getClickTimeByButtonType: '/button/click/getClickTimeByButtonType.htm',
  getClickTimeByQA: '/button/click/getClickTimeByQA.htm',
  getAppUserList: '/user/getAppUserList.htm',
  getUserResultByUserId: '/userResult/getUserResultByUserId.htm',
  getUserResultDetail: '/userResult/getUserResultDetail.htm',
  getProductOrderList: '/order/getProductOrderList.htm',
  getHelpList: '/help/getHelpList.htm',
  editHelp: 'help/editHelp.htm',
  getProductList: '/insurance/getProductList.htm',
  editIProduct: '/insurance/editIProduct.htm',
  updatePasswd: '/user/updatePasswd.htm'
}

export default api

export function updatePasswd (parameter) {
  return axios({
    url: api.updatePasswd,
    method: 'post',
    data: parameter
  })
}

export function editIProduct (parameter) {
  return axios({
    url: api.editIProduct,
    method: 'post',
    data: parameter
  })
}

export function getProductList (parameter) {
  return axios({
    url: api.getProductList,
    method: 'post',
    params: parameter
  })
}

export function editHelp (parameter) {
  return axios({
    url: api.editHelp,
    method: 'post',
    data: parameter
  })
}

export function getHelpList (parameter) {
  return axios({
    url: api.getHelpList,
    method: 'post',
    params: parameter
  })
}

export function getProductOrderList (parameter) {
  return axios({
    url: api.getProductOrderList,
    method: 'post',
    params: parameter
  })
}

export function getUserResultDetail (parameter) {
  return axios({
    url: api.getUserResultDetail,
    method: 'post',
    params: parameter
  })
}

export function getUserResultByUserId (parameter) {
  return axios({
    url: api.getUserResultByUserId,
    method: 'post',
    params: parameter
  })
}
export function getAppUserList (parameter) {
  return axios({
    url: api.getAppUserList,
    method: 'post',
    params: parameter
  })
} 

export function getClickTimeByQA (parameter) {
  return axios({
    url: api.getClickTimeByQA,
    method: 'post',
    params: parameter
  })
}

export function getStopTimeList (parameter) {
  return axios({
    url: api.stopTimeList,
    method: 'post',
    params: parameter
  })
}

export function getStopTime (parameter) {
  return axios({
    url: api.getStopTime,
    method: 'post',
    params: parameter
  })
}

export function getClickTimeByButtonType (parameter) {
  return axios({
    url: api.getClickTimeByButtonType,
    method: 'post',
    parameter: parameter
  })
}
