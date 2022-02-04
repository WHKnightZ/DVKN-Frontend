import axios, { Method, AxiosRequestConfig } from 'axios'
import { apiUrls, API_URL } from '../configs/apis'
import { configureStore } from 'store'
import { CLEAR_AUTH, CREATE_TOAST, UPDATE_AUTH } from 'store/actionTypes'
import { ObjectType } from 'types'
import { removeUserLS, updateUserLS } from 'utils'
import { SUCCESS } from 'configs/constants'

axios.defaults.baseURL = API_URL

type CallbackType = (data: {
  code: number
  id: string
  status: boolean
  text: string
  data: any
  error?: any
}) => void

const refresh = async () => {
  const refreshToken = configureStore.getState().auth.refresh_token
  if (!refreshToken) return false

  const headers = { Authorization: `Bearer ${refreshToken}` }

  try {
    const response = await axios.post(apiUrls.refresh(), {}, { headers })
    const { data: responseData }: any = response
    const { status, data } = responseData
    if (status === SUCCESS) {
      updateUserLS(data)
      configureStore.dispatch({
        type: UPDATE_AUTH,
        payload: data,
      })
      return true
    }
  } catch (e) {}
  // If cannot refresh => sign out
  removeUserLS()
  configureStore.dispatch({ type: CLEAR_AUTH })
}

/**
 * Config request common
 *
 * @param {String} method Request method
 * @param {String} url Request URL
 * @param {Object} data Request params
 * @param {Object} options Config options
 */
const request = async (
  method: Method,
  url: string,
  data: any = {},
  callback: CallbackType = () => {},
  options: ObjectType = {},
  isRefresh?: boolean
) => {
  // config params
  const accessToken = configureStore.getState().auth.access_token
  const headers = { Authorization: `Bearer ${accessToken}` }

  const defaultParams = { headers, method, url, ...options }
  const paramConfigs: AxiosRequestConfig =
    method === 'get' ? { ...defaultParams, params: data } : { ...defaultParams, data: data }

  return new Promise<any>((resolve, reject) => {
    axios(paramConfigs)
      .then((res) => {
        let { data = {} as any } = res
        const { code = 500, message = '', id = '', status = false } = data
        data = {
          code,
          id,
          status: status === SUCCESS,
          text: message,
          data: data.data,
        }
        false &&
          configureStore.dispatch({
            type: CREATE_TOAST,
            payload: { duration: 3000, type: status, message: { content: message } },
          })

        resolve(data)
        callback(data)
      })
      .catch(async (error) => {
        reject(error)

        const { response = {} } = error || {}
        const { status } = response

        if (status === 403) {
          if (!isRefresh) {
            const res = await refresh()
            if (res) {
              request(method, url, data, callback, options, true)
            }
          }
        } else {
          callback({
            code: 500,
            id: '500',
            status: false,
            text: 'Sorry, something went wrong. Please try again.',
            data: null,
            error,
          })
        }
      })
  })
}

/**
 * Request process callback with method GET
 *
 * @param {String} url Request URL
 * @param {Object} params Request params
 * @param {Function} callback callback
 */
const apiGet = (url = '', params = {}, callback?: CallbackType) => {
  return request('get', url, params, callback)
}

/**
 * Request process callback with method POST
 *
 * @param {String} url Request URL
 * @param {Object} params Request params
 * @param {Function} callback callback
 */
const apiPost = (url = '', params = {}, callback?: CallbackType) => {
  return request('post', url, params, callback)
}

/**
 * Request process callback with method PUT
 *
 * @param {String} url Request URL
 * @param {Object} params Request params
 * @param {Function} callback callback
 */
const apiPut = (url = '', params = {}, callback?: CallbackType) => {
  return request('put', url, params, callback)
}

/**
 * Request process callback with method DELETE
 *
 * @param {String} url Request URL
 * @param {Object} params Request params
 * @param {Function} callback callback
 */
const apiDelete = (url = '', params = {}, callback?: CallbackType) => {
  return request('delete', url, params, callback)
}

export const useApis = () => ({
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  request,
})

export default { get: apiGet, post: apiPost, put: apiPut, delete: apiDelete, request }
