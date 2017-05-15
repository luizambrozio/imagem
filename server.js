'use strict'

const Hapi = require('hapi')
const Good = require('good')
const Watermark = require('./Watermark')
const Fs = require('./Fs')

const server = new Hapi.Server()
server.connection({ port: 3001 })

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Processando')
  }
})

server.route({
  method: 'POST',
  path: '/',
  handler: function (request, reply) {
    let user = request.payload
    let cabecalho = request.headers
    var watermark = new Watermark()
    watermark.marck(user, cabecalho)
    reply('Processando')
  }
})

server.route({
  method: 'PUT',
  path: '/profile',
  config: {
    handler: function (request, reply) {
      const payload = request.payload
      let pathAtual = payload.path
      let pathImage = pathAtual + '.jpg'
      var fs = new Fs()
      fs.mover(pathAtual, pathImage)
      reply('pasta tmp: ' + payload.path + ' path_atual: ' + pathAtual + ' final: ' + pathImage)
    },
    payload: {
      maxBytes: 209715200,
      output: 'file',
      parse: true
    }
  }
})

server.register({
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*'
        }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  }
}, (err) => {
  if (err) {
    throw err // something bad happened loading the plugin
  }

  server.start((err) => {
    if (err) {
      throw err
    }
    server.log('info', 'Servidor rodando em: ' + server.info.uri)
  })
})
