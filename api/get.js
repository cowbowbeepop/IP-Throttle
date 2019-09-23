const router = require('express').Router()
const limiter = require('../middleware/rate_limiter')

router.get('/:data', limiter, (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Success'
  })
})

module.exports = router