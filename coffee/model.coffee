
{EventEmitter} = require 'events'
tool = require './tool'
poet = require './poet'
config = require './config'

module.exports = model = new EventEmitter

local =
  slots: []

model.reset = ->
  w = window.innerWidth
  h = window.innerHeight
  sizeX = Math.floor (w / config.width)
  sizeY = Math.floor (h / config.width)

  local.slots = []
  for index in [1..sizeX]
    local.slots.push
      wait: tool.random sizeY
      size: sizeY
      drops: []

model.start = ->
  setTimeout (-> model.start()), config.interval
  for slot in local.slots
    slot.wait -= 1
    for drop in slot.drops
      drop.head += 1

    slot.drops = slot.drops.filter (drop) ->
      (drop.head - drop.length) <= slot.size

    if slot.wait is 0
      drop =
        text: poet.read slot.size
        length: tool.random slot.size
        head: 0
      slot.drops.push drop
      slot.wait = drop.length + (tool.random slot.size)

  @emit 'change'

model.getSlots = ->
  local.slots