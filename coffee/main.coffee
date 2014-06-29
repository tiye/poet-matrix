
model = require './model'
poet = require './poet'
require './render'

poet.on 'load', ->
  model.reset()
  model.start()

window.onresize = ->
  model.reset()