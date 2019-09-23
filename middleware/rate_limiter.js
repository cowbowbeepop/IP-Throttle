const store = require('../store/index');
const cache = new store();

function checkIP(req, res, next) {
  const data = req.params.data
  const IP = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  const logIp = cache.set(IP, data)

  console.log(`Data param: ${data}`);
  console.log(`IP Address: ${IP}`);

  cache.log(IP)

  if (!logIp) {
    return res.status(400).json({
      status: 404,
      message: 'Too many requests. Try again later...'
    })
  }

  return next()
}

function resetCache() {
  try {
    console.log(`cache reset timers`)
    cache.clearStaleIpInCache()

    console.log(`cleared cache: ${cache.log() || 'N/A'}`)
  } catch (e) {
    console.log(e)
  }
}

setInterval(resetCache, 1000 * 30)

module.exports = checkIP