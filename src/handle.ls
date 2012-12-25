
log = -> console?.log?.apply? console, arguments
delay = (f, t) -> setTimeout t, f
q = -> document.query-selector it

window.onload = ->
  all-width = window.inner-width
  all-height = window.inner-height
  column = Math.floor (all-width / 20) + 1
  row = Math.floor (all-height / 20) + 1
  body = q "body"
  log all-width, all-height, row, column

  [1 to row].for-each (y) ->
    line = ""
    [1 to column].for-each (x) ->
      point = "p#y-#x"
      line := line + (tmpl ".cell/#point": "")
    body.innerHTML += (tmpl ".line": line)

  list = []

  a-column =
    content: [""] * row
    column: 0
    render: ->
      if @content.length < row then @more!
      self = @
      [1 to row].for-each (y) ->
        point = "\#p#y-#{self.column}"
        (q point).inner-text = self.content[row + 1 - y] or ""
      @content.shift!
      # log "render", @content.join("")
      delay 300, -> self.render!
    more: ->
      self = @
      list.shift!.split "" .for-each (char) ->
        self.content.push char
      num = Math.floor (Math.random! * 40)
      [1 to num].for-each -> self.content.push ""

  req = new XMLHttpRequest
  req
    ..open "get", "../data/全宋词.txt"
    ..send()
    ..onload = (res) ->
      text = res.target.response
      trim = -> it.trim()
      not-empty = -> it.length > 0
      list := text.split "\n" .map trim .filter not-empty

      [1 to column].for-each (x) ->
        light =
          __proto__: a-column
          column: x
          content: [""] * row

        light.render!