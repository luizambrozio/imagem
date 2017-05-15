'use strict'

const fs = require('fs')

class Fs {

}

Fs.prototype.mover = function (pathAtual, pathImage) {
  fs.rename(pathAtual, pathImage, function (err) {
    // Exclui a foto da pasta temporária.
    fs.unlink(pathAtual, function (err) {
      //
    })
  })
}

module.exports = Fs
