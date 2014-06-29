
model = require './model'
config = require './config'

canvas = document.querySelector 'canvas'
ctx = canvas.getContext '2d'
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'

model.on 'change', ->
  w = window.innerWidth
  h = window.innerHeight
  canvas.width = w
  canvas.height = h

  ctx.font = "#{config.fontSize}px Optima"
  ctx.clearRect 0, 0, w, h

  slots = model.getSlots()

  for slot, index in slots
    for drop in slot.drops
      x = (index + 0.5) * config.width
      from = Math.max 0, (drop.head - drop.length + 1)
      to = Math.min slot.size, drop.head
      for pos in [from...to]
        y = (pos + 0.5) * config.width
        char = drop.text[pos]
        if (pos + 2) > drop.head
          ctx.fillStyle = config.bright
        else
          ctx.fillStyle = config.color
        ctx.fillText char, x, y