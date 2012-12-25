
log = -> console?.log?.apply? console, arguments
delay = (f, t) -> setTimeout t, f
q = -> document.query-selector it
random = -> Math.floor (Math.random! * it)

window.onload = ->
  all-width = window.inner-width
  all-height = window.inner-height
  column = Math.floor (all-width / 20)
  row = Math.floor (all-height / 20)
  body = q "body"
  log all-width, all-height, row, column

  html = []
  [0 to column].for-each (x) ->
    id = "x" + x
    html.push tmpl "pre.column/#id": ""
  body.innerHTML = html.join ""

  list = {}

  light =
    elem: {}
    string: []
    buffer: []
    load: ->
      # log "list", list
      text = list.shift()?.trim!.split("") or ""
      # log "text:", text.join ""
      text.0 = tmpl "span.head": text.0
      @buffer = text.concat @buffer
      @buffer = @buffer.concat (["-"] * (random 40))
    render: ->
      if @buffer.length <= 0 then @load!
      if @string.length > row then @string.pop!
      log @buffer
      head = @buffer.shift!
      # log "head" head
      @string.unshift head if head?
      @elem.innerHTML = @string.join ""
      # log @string.join ""
      self = @
      delay 1000, -> self.render!

  req = new XMLHttpRequest
  req
    ..open "get", "../data/piece.txt"
    ..send()
    ..onload = (res) ->
      text = res.target.response
      trim = -> it.trim()
      not-empty = -> it.length > 0
      list := text.split "\n" .map trim .filter not-empty
      # log "got list:", list

      [0 to column].for-each (x) ->
        id = '#x' + x
        drop =
          __proto__: light
          buffer: []
          string: []
          elem: q id
        drop.render!
