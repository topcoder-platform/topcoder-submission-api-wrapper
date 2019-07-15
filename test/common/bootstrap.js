/**
 * Initialize test env
 */
const joi = require('@hapi/joi')
const config = require('../testConfig')

joi.id = () => joi.number().integer().min(1)
joi.score = () => joi.number()
joi.pageSize = () => joi.number().integer().min(1).max(config.MAX_PAGE_SIZE)
