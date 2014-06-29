
{EventEmitter} = require 'events'

module.exports = poet = new EventEmitter

local =
  text: ''
  start: 0

req = new XMLHttpRequest
req.open 'GET', './data/piece.txt'
req.send()
req.onload = ->
  local.text = req.responseText.replace(/\n/g, '')

  poet.emit 'load'

poet.read = (len) ->
  if (len + local.start) > local.text.length
    local.start = 0
  text = local.text[local.start...(local.start + len)]
  local.start += len

  return text