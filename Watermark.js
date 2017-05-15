'use strict'

const image = require('image-watermark')
const fs = require('fs')

class Watermark {
}

Watermark.prototype.marck = function (user, cabecalho) {
  let qtd = cabecalho.qtd
  console.log(qtd)
  for (var i = 0; i < qtd; i++) {
    let foto = user.foto
    let marck = cabecalho.marca
    let path = cabecalho.path
    var options = {
      'text': marck,
      'dstPath': './images/' + foto + 'marcked.jpg'
    }
    image.embedWatermark(path + '/' + foto, options)
    //fs.unlink(path + '/' + foto, function (err) {
      //
   // })
  }
}

module.exports = Watermark
