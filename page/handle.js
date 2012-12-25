var log, delay, q;
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
window.onload = function(){
  var allWidth, allHeight, column, row, body, list, aColumn, req, x$;
  allWidth = window.innerWidth;
  allHeight = window.innerHeight;
  column = Math.floor(allWidth / 20 + 1);
  row = Math.floor(allHeight / 20 + 1);
  body = q("body");
  log(allWidth, allHeight, row, column);
  (function(){
    var i$, to$, results$ = [];
    for (i$ = 1, to$ = row; i$ <= to$; ++i$) {
      results$.push(i$);
    }
    return results$;
  }()).forEach(function(y){
    var line;
    line = "";
    (function(){
      var i$, to$, results$ = [];
      for (i$ = 1, to$ = column; i$ <= to$; ++i$) {
        results$.push(i$);
      }
      return results$;
    }()).forEach(function(x){
      var point, ref$;
      point = "p" + y + "-" + x;
      return line = line + tmpl((ref$ = {}, ref$[".cell/" + point] = "", ref$));
    });
    return body.innerHTML += tmpl({
      ".line": line
    });
  });
  list = [];
  aColumn = {
    content: repeatArray$([""], row),
    column: 0,
    render: function(){
      var self;
      if (this.content.length < row) {
        this.more();
      }
      self = this;
      (function(){
        var i$, to$, results$ = [];
        for (i$ = 1, to$ = row; i$ <= to$; ++i$) {
          results$.push(i$);
        }
        return results$;
      }()).forEach(function(y){
        var point;
        point = "#p" + y + "-" + self.column;
        return q(point).innerText = self.content[row + 1 - y] || "";
      });
      this.content.shift();
      return delay(300, function(){
        return self.render();
      });
    },
    more: function(){
      var self, num;
      self = this;
      list.shift().split("").forEach(function(char){
        return self.content.push(char);
      });
      num = Math.floor(Math.random() * 40);
      return (function(){
        var i$, to$, results$ = [];
        for (i$ = 1, to$ = num; i$ <= to$; ++i$) {
          results$.push(i$);
        }
        return results$;
      }()).forEach(function(){
        return self.content.push("");
      });
    }
  };
  req = new XMLHttpRequest;
  x$ = req;
  x$.open("get", "../data/全宋词.txt");
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
      for (i$ = 1, to$ = column; i$ <= to$; ++i$) {
        results$.push(i$);
      }
      return results$;
    }()).forEach(function(x){
      var light;
      light = {
        __proto__: aColumn,
        column: x,
        content: repeatArray$([""], row)
      };
      return light.render();
    });
  };
  return x$;
};
function repeatArray$(arr, n){
  for (var r = []; n > 0; (n >>= 1) && (arr = arr.concat(arr)))
    if (n & 1) r.push.apply(r, arr);
  return r;
}