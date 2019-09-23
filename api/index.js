const router = require('express').Router()
const get = require('./get')

router.get('/', (req, res) => res.status(200).send('IP Rate Limiter'))
router.use('/get', get)

module.exports = router