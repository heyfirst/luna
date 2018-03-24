import axios from 'axios'

function createApiInstance () {
  return axios.create({
    baseURL: process.env.SERVICE_SANDY_PATH,
    headers: {}
  })
}

function handleResponse (response) {
  if (response.data) {
    return response
  }
  return Promise.reject(response.error)
}

function catchError (e) {
  return Promise.reject(e.response.data)
}

export default {
  get: path => (
    createApiInstance()
      .get(path)
      .then(handleResponse)
      .catch(catchError)
  ),
  post: (path, body = {}, headers = {}) => (
    createApiInstance()
      .request({
        url: path,
        method: 'POST',
        headers,
        data: body
      })
      .then(handleResponse)
      .catch(catchError)
  ),
  put: (path, body = {}) => (
    createApiInstance()
      .request({
        url: path,
        method: 'PUT',
        data: body
      })
      .then(handleResponse)
      .catch(catchError)
  ),
  delete: (path, body = {}) => (
    createApiInstance()
      .request({
        url: path,
        method: 'DELETE',
        data: body
      })
      .then(handleResponse)
      .catch(catchError)
  )
}

// import axios from 'axios'
// import tracer from '../utils/jeager'
// import { Tags, FORMAT_HTTP_HEADERS } from 'opentracing'

// export default {
//   // axios.request('GET', 'http://example.com', body, headers, span).then(data => data)
//   request: (method, url, body = {}, headers = {}, span) => {
//     span.setTag(Tags.HTTP_URL, url)
//     span.setTag(Tags.HTTP_METHOD, method)
//     span.setTag(Tags.SPAN_KIND, Tags.SPAN_KIND_RPC_CLIENT)
//     // Send span context via request headers (parent id etc.)
//     tracer.inject(span, FORMAT_HTTP_HEADERS, headers)
//     return axios
//       .request({
//         url,
//         method,
//         headers,
//         data: body
//       })
//       .then((response) => {
//         span.finish()
//         if (response.data) {
//           return Promise.resolve(response)
//         }
//         return Promise.reject(response)
//       })
//       .catch(e => {
//         span.finish()
//         Promise.reject(e.response.data)
//       })
//   }
// }