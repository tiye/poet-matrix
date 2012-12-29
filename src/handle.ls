
log = -> console?.log?.apply? console, arguments
log = ->
delay = (f, t) -> setTimeout t, f
repeat = (f, t) -> setInterval t, f
q = -> document.query-selector it
random = ->
  ret = Math.floor (Math.random! * it)
  ret

not-punction = (char) ->
  if (char in "。\）\（，、：“”>|".split("")) then " "
  else char

Array::remove = (elem) ->
  ret = []
  @for-each (item) ->
    if item isnt elem then ret.push item
  ret

duration = 60

fade-color = "hsl(20,70%,50%)"

animate = (list, row, column) ->

  spit = ->
    out = list[0 to row]
    list := list[row to] +++ out.concat!
    out

  childs = (q "body").child-nodes
  for line in childs
    run = (line) ->
      first = -> line.first-element-child
      dark = no
      do start = ->
        if dark
          chars = spit!
          show = (elem, chars) ->
            log "show", elem, chars
            elem.style.opacity = 1
            elem.inner-text = chars.shift!
            elem.style.color = "hsl(0,0%,100%)"
            last = elem.previous-element-sibling
            next = elem.next-element-sibling
            log "hide", next
            if last? then last.style.color = fade-color
            delay duration, ->
              if next? then show next, chars
              else elem.style.color = fade-color
          show first!, chars
          time = (duration * (random 60)) 
          delay time, start
        else
          hide = (elem) ->
            elem.style.opacity = 0
            next = elem.next-element-sibling
            log "hide", next
            if next? then delay duration, -> hide next
          hide first!
          time = (duration * (random 100)) 
          delay time, start
        dark := not dark
    run line

window.onload = ->
  all-width = window.inner-width
  all-height = window.inner-height
  column = Math.floor (all-width / 20)
  row = Math.floor (all-height / 20)

  make-line = ->
    inner = [0 to row].map (-> tmpl ".cell": "") .join ""
    tmpl ".line": inner
  html = [0 to column].map make-line .join ""

  (q "body").innerHTML = html

  req = new XMLHttpRequest
  req
    ..open "get", "../data/piece.txt"
    # ..open "get", "../data/全宋词.txt"
    ..send()
    ..onload = (res) ->
      text = res.target.response
      list = text.split "" .map not-punction
      log "got list:", list
      animate list, row, column