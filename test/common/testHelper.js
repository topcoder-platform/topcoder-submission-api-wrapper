/**
 * Test common function.
 */
const _ = require('lodash')
const joi = require('@hapi/joi')
const q = require('querystring')
const config = require('../testConfig')
const td = require('./testData')
const routes = require('./routes')

/**
 * Set HTTP response headers from result.
 * @param {Object} result the operation result
 */
const resHeaders = (result) => {
  const totalPages = Math.ceil(result.total / result.perPage)
  const header = {}
  if (result.page < totalPages) {
    header['x-next-page'] = String(result.page + 1)
  }
  header['x-page'] = String(result.page)
  header['x-per-page'] = String(result.perPage)
  header['x-total'] = String(result.total)
  header['x-total-pages'] = String(totalPages)

  return header
}

/**
 * Find route for request
 * @param {Object} param the request params
 * @return {Object} the found route
 */
const findRoute = (param) => {
  const routeParam = param.isHead ? _.assign({}, param, { method: 'get' }) : param
  let route
  _.each(routes, (verbs, url) => {
    _.each(verbs, (def, verb) => {
      if (routeParam.path === url && verb === routeParam.method) {
        route = def
      }
    })
  })
  return route
}

/**
 * Set path of param
 * @param {Object} param the request params
 */
const setPath = (param) => {
  let path = String(param.uri)
  if (param.uri.startsWith(td.API_VERSION)) {
    path = param.uri.substring(td.API_VERSION.length)
  }
  if (path.includes('?')) {
    path = path.split('?')[0]
  }
  param.path = path
}

/**
 * Validate route of param
 * @param {Object} param the request params
 */
const checkRoute = (param) => {
  const route = findRoute(param)
  if (!route) {
    throw new Error(`Route '${param.method} ${param.path}' not defined.`)
  }
}

/**
 * Parse param which path like resource/:id
 * @param {Object} param the request param
 * @return {Object} parsed param
 */
const parsePathParam = (param) => {
  const parts = param.path.split('/')
  const id = parts.pop()
  const resource = parts.pop()
  const routeParam = _.assign({}, param, { id, path: `/${resource}/:id` })
  return routeParam
}

/**
 * Mock create for api
 * @param {Object} param the create params
 * @return {Array} the create result for nock
 */
const create = (param) => {
  setPath(param)
  checkRoute(param)
  if (param.isMultiPart) {
    if (!(!!param.body.files ^ !!param.body.url)) {
      return [td.JOI_FAIL_STATUS, { message: 'Either file to be uploaded or URL should be present' }]
    }
  }
  const route = findRoute(param)
  const joiParam = {}
  if (param.isMultiPart && param.body.files) {
    joiParam['files'] = _.pick(param.body, 'files')
    joiParam['entity'] = _.omit(param.body, 'files')
  } else {
    joiParam['entity'] = param.body
  }
  if (param.needUser) {
    joiParam['authUser'] = td.M2M_USER
  }
  const result = joi.validate(joiParam, route.schema)
  if (result.error) {
    return [td.JOI_FAIL_STATUS, { message: result.error.details[0].message }]
  }
  let id = route.id
  if (_.isArray(route.id)) {
    id = route.id.pop()
  }
  let init = {}
  if (param.isSubmission) {
    init = { url: 'http://test' }
  }
  return [td.CREATE_SUCCESS_STATUS, _.assign(init, param.body, { id })]
}

/**
 * Mock search for api
 * @param {Object} param the search params
 * @return {Array} the search result for nock
 */
const search = (param) => {
  setPath(param)
  checkRoute(param)
  const route = findRoute(param)
  const qs = param.uri.substring(`${td.API_VERSION}${param.path}?`.length)
  const query = q.parse(qs)
  const result = joi.validate({ query }, route.schema)
  if (result.error) {
    return [td.JOI_FAIL_STATUS, { message: result.error.details[0].message }]
  }
  const queryFilter = _.omit(query, 'page', 'perPage')
  const filters = _.filter(route.records, item => {
    let ok = true
    _.each(queryFilter, (value, key) => {
      if (String(value) !== String(item[key])) {
        ok = false
      }
    })
    return ok
  })
  const pagination = {}
  pagination.page = _.get(query, 'page') || config.PAGE
  pagination.perPage = _.get(query, 'perPage') || config.PER_PAGE
  pagination.total = filters.length
  const header = resHeaders(pagination)
  const results = filters.slice((pagination.page - 1) * pagination.perPage, pagination.page * pagination.perPage)
  return param.isHead ? [td.SUCCESS_STATUS, null, header] : [td.SUCCESS_STATUS, results, header]
}

/**
 * Mock get for api
 * @param {Object} param the get params
 * @return {Array} the get result for nock
 */
const get = (param) => {
  setPath(param)
  const routeParam = parsePathParam(param)
  checkRoute(routeParam)
  const route = findRoute(routeParam)
  const joiParam = { [route.idProp]: routeParam.id }
  if (routeParam.needUser) {
    joiParam['authUser'] = td.M2M_USER
  }
  const result = joi.validate(joiParam, route.schema)
  const notFoundId = routeParam.notFoundId || td.NOT_FOUND_ID
  if (routeParam.id === notFoundId) {
    return [td.NOT_FOUND_STATUS, { message: routeParam.notFound }]
  }
  if (result.error) {
    return [td.JOI_FAIL_STATUS, { message: result.error.details[0].message }]
  }
  let obj = routeParam.obj
  if (routeParam.isSubmission) {
    obj = routeParam.obj[routeParam.id]
  }
  return [td.SUCCESS_STATUS, obj]
}

/**
 * Mock put for api
 * @param {Object} param the put param
 * @return {Array} the put result for nock
 */
const put = (param) => {
  setPath(param)
  const routeParam = parsePathParam(param)
  checkRoute(routeParam)
  const route = findRoute(routeParam)
  const joiParam = { [route.idProp]: routeParam.id, entity: routeParam.body }
  if (routeParam.needUser) {
    joiParam['authUser'] = td.M2M_USER
  }
  const result = joi.validate(joiParam, route.schema)
  if (result.error) {
    return [td.JOI_FAIL_STATUS, { message: result.error.details[0].message }]
  }
  const notFoundId = routeParam.notFoundId || td.NOT_FOUND_ID
  if (routeParam.id === notFoundId) {
    return [td.NOT_FOUND_STATUS, { message: routeParam.notFound }]
  }
  let obj = routeParam.obj
  if (param.isSubmission) {
    obj = routeParam.obj[routeParam.id]
  }
  return [td.SUCCESS_STATUS, _.assign({}, obj, routeParam.body)]
}

/**
 * Mock patch for api
 * @param {Object} param the patch param
 * @return {Array} the patch result for nock
 */
const patch = (param) => {
  return put(param)
}

/**
 * Mock remove for api
 * @param {Object} param the delete param
 * @return {Array} the delete result for nock
 */
const remove = (param) => {
  setPath(param)
  const routeParam = parsePathParam(param)
  checkRoute(routeParam)
  const route = findRoute(routeParam)
  const result = joi.validate({ [route.idProp]: routeParam.id }, route.schema)
  if (result.error) {
    return [td.JOI_FAIL_STATUS, { message: result.error.details[0].message }]
  }
  const notFoundId = routeParam.notFoundId || td.NOT_FOUND_ID
  if (routeParam.id === notFoundId) {
    return [td.NOT_FOUND_STATUS, { message: routeParam.notFound }]
  }
  if (!routeParam.obj) {
    return [td.NOT_FOUND_STATUS, { message: td.NotFoundError.ReviewType }]
  }
  let id = null
  if (routeParam.isSubmission) {
    id = routeParam.id
  }
  return [td.DELETE_SUCCESS_STATUS, id]
}

/**
 * Parse buffer to string
 * @param {String} hex a buffer string
 * @return {String} a parsed result
 */
const hexToString = hex => {
  let str = ''
  for (let i = 0; i < hex.length; i += 2) { str += String.fromCharCode(parseInt(hex.substr(i, 2), 16)) }
  return str
}

/**
 * Parse multi part form data
 * @param {Object} body the multi part content
 * @param {String} contentType the content type
 * @return {Object} the parsed result
 */
const multiPartParse = (body, contentType) => {
  const m = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i)
  if (!m) {
    throw new Error('Bad content-type header, no multipart boundary')
  }
  let boundary = m[1] || m[2]

  // Ex.
  // Content-Disposition: form-data; name="url"
  //
  // https://tc-test-submission-scan.s3.amazonaws.com/good.zip
  // Content-Disposition: form-data; name="submission"; filename="fileToUpload.zip"
  const headerParse = (header) => {
    const headerFields = {}
    const matchResult = header.match(/^.*name="([^"]*)"$/)
    if (matchResult) {
      headerFields.name = matchResult[1]
    }
    return headerFields
  }

  const fileParse = (header) => {
    const headerFields = {}
    const matchResult = header.match(/^.*filename="([^"]*)"$/)
    if (matchResult) {
      headerFields.name = matchResult[1]
    }
    return headerFields
  }

  // \r\n is part of the boundary.
  boundary = '\r\n--' + boundary

  // Prepend what has been stripped by the body parsing mechanism.
  const sBody = '\r\n' + body
  const parts = sBody.split(new RegExp(boundary))
  const partsByName = {}
  let fieldName
  // First part is a preamble, last part is closing '--'
  for (let i = 1; i < parts.length - 1; i++) {
    const subparts = parts[i].split('\r\n\r\n')
    const headers = subparts[0].split('\r\n')
    for (let j = 1; j < headers.length; j++) {
      const fileFields = fileParse(headers[j])
      if (fileFields.name) {
        fieldName = 'files'
        partsByName['fileType'] = fileFields.name.split('.').pop()
      } else {
        const headerFields = headerParse(headers[j])
        if (headerFields.name) {
          fieldName = headerFields.name
        }
      }
    }
    partsByName[fieldName] = subparts[1]
    if (/^[0-9]+.?[0-9]*$/.test(subparts[1])) {
      partsByName[fieldName] = _.toNumber(subparts[1])
    }
  }
  if (partsByName.url) {
    partsByName['fileType'] = partsByName.url.split('.').pop()
  }
  return partsByName
}

/**
 * Make client that invokes the Wrapper methods with JWT argument
 */
function makeJwtClient (api, jwt) {
  return Object.entries(api).reduce((acc, [key, fn]) => {
    acc[key] = (...args) => fn(...args, jwt)
    return acc
  }, {})
}

module.exports = {
  resHeaders,
  hexToString,
  multiPartParse,
  findRoute,
  create,
  search,
  get,
  put,
  patch,
  remove,
  makeJwtClient
}
