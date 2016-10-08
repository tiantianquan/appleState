// var socket = io('http://localhost:9999');
// socket.on('news', function(data) {
//     console.log(data);
//     socket.emit('my other event', {my: 'data'});
// });

var store = {
  dyc: false,
  hl: false,
  yh: false,
  time: new Date(1990, 2, 1)
}

function syncStore() {
  if(!!store.time) {
    $('.time').text(store.time.toString('yyyy-MM-dd hh:mm:ss'))
  }
  for(var i in store) {
    if(store.hasOwnProperty(i)) {
      $('.block.' + i + ' .state').text((store[i] ? '有货' : '无货'))
      if(!store[i]) {
        $('.block.' + i + ' .buy-btn').hide()
      } else {
        $('.block.' + i + ' .buy-btn').show()
      }
    }
  }
}

function get(cb) {
  $.get('/state', function(data) {
    data.time = new Date(data.time)
    if(data.time > store.time) {
      store = data
      syncStore()
    }
    if(!!cb)
      cb(store, data)
  })
}


$(document).ready(function() {
  $('.buy-btn').hide()

  get()
  setInterval(function() {
    get()
  }, 5000)
})
