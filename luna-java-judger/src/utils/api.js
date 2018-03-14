import axios from 'axios'
import tracer from '../utils/jeager'
import { Tags, FORMAT_HTTP_HEADERS } from 'opentracing'

export default {
  // axios.request('GET', 'http://example.com', body, headers, span).then(data => data)
  request: (method, url, body = {}, headers = {}, span) => {
    span.setTag(Tags.HTTP_URL, url)
    span.setTag(Tags.HTTP_METHOD, method)
    span.setTag(Tags.SPAN_KIND, Tags.SPAN_KIND_RPC_CLIENT)
    // Send span context via request headers (parent id etc.)
    tracer.inject(span, FORMAT_HTTP_HEADERS, headers)
    console.log('hi')
    return axios
      .request({
        url,
        method,
        headers,
        data: body
      })
      .then((response) => {
        span.finish()
        if (response.data) {
          return Promise.resolve(response)
        }
        return Promise.reject(response)
      })
      .catch(e => {
        span.finish()
        Promise.reject(e.response.data)
      })
  }
}
