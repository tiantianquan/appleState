var request = require('request-promise')

/**
R637:天津大悦城
R579:天津恒隆广场
R638:银河国际购物中心
MNFU2CH/A:plus 128 亮黑
 */

const reqUrl = 'https://reserve.cdn-apple.com/CN/zh_CN/reserve/iPhone/availability.json'




module.exports = {
  get: function(cb) {
    return request.get(reqUrl, function(error, response, body) {
      
    })
  },
  format: function(str) {
    if(str === 'NONE') {
      return false
    } else {
      return true
    }
  }
}
