var log, delay, q, random;
log = function(){
  var ref$;
  return typeof console != 'undefined' && console !== null ? (ref$ = console.log) != null ? typeof ref$.apply === 'function' ? ref$.apply(console, arguments) : void 8 : void 8 : void 8;
};
delay = function(f, t){
  return setTimeout(t, f);
};
q = function(it){
  return document.querySelector(it);
};
random = function(it){
  return Math.floor(Math.random() * it);
};
window.onload = function(){
  var allWidth, allHeight, column, row, body, html, list, light, req, x$;
  allWidth = window.innerWidth;
  allHeight = window.innerHeight;
  column = Math.floor(allWidth / 20);
  row = Math.floor(allHeight / 20);
  body = q("body");
  log(allWidth, allHeight, row, column);
  html = [];
  (function(){
    var i$, to$, results$ = [];
    for (i$ = 0, to$ = column; i$ <= to$; ++i$) {
      results$.push(i$);
    }
    return results$;
  }()).forEach(function(x){
    var id, ref$;
    id = "x" + x;
    return html.push(tmpl((ref$ = {}, ref$["pre.column/" + id] = "", ref$)));
  });
  body.innerHTML = html.join("");
  list = {};
  light = {
    elem: {},
    string: [],
    buffer: [],
    load: function(){
      var text, ref$;
      text = ((ref$ = list.shift()) != null ? ref$.trim().split("") : void 8) || "";
      text[0] = tmpl({
        "span.head": text[0]
      });
      this.buffer = text.concat(this.buffer);
      return this.buffer = this.buffer.concat(repeatArray$(["-"], random(40)));
    },
    render: function(){
      var head, self;
      if (this.buffer.length <= 0) {
        this.load();
      }
      if (this.string.length > row) {
        this.string.pop();
      }
      log(this.buffer);
      head = this.buffer.shift();
      if (head != null) {
        this.string.unshift(head);
      }
      this.elem.innerHTML = this.string.join("");
      self = this;
      return delay(1000, function(){
        return self.render();
      });
    }
  };
  req = new XMLHttpRequest;
  x$ = req;
  x$.open("get", "../data/piece.txt");
  x$.send();
  x$.onload = function(res){
    var text, trim, notEmpty;
    text = res.target.response;
    trim = function(it){
      return it.trim();
    };
    notEmpty = function(it){
      return it.length > 0;
    };
    list = text.split("\n").map(trim).filter(notEmpty);
    return (function(){
      var i$, to$, results$ = [];
      for (i$ = 0, to$ = column; i$ <= to$; ++i$) {
        results$.push(i$);
      }
      return results$;
    }()).forEach(function(x){
      var id, drop;
      id = '#x' + x;
      drop = {
        __proto__: light,
        buffer: [],
        string: [],
        elem: q(id)
      };
      return drop.render();
    });
  };
  return x$;
};
function repeatArray$(arr, n){
  for (var r = []; n > 0; (n >>= 1) && (arr = arr.concat(arr)))
    if (n & 1) r.push.apply(r, arr);
  return r;
}