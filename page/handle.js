var log, delay, repeat, q, random, notPunction, duration, animate, slice$ = [].slice;
log = function(){
  var ref$;
  return typeof console != 'undefined' && console !== null ? (ref$ = console.log) != null ? typeof ref$.apply === 'function' ? ref$.apply(console, arguments) : void 8 : void 8 : void 8;
};
log = function(){};
delay = function(f, t){
  return setTimeout(t, f);
};
repeat = function(f, t){
  return setInterval(t, f);
};
q = function(it){
  return document.querySelector(it);
};
random = function(it){
  var ret;
  ret = Math.floor(Math.random() * it);
  return ret;
};
notPunction = function(char){
  if (in$(char, "。）（，、：“”>|".split(""))) {
    return " ";
  } else {
    return char;
  }
};
Array.prototype.remove = function(elem){
  var ret;
  ret = [];
  this.forEach(function(item){
    if (item !== elem) {
      return ret.push(item);
    }
  });
  return ret;
};
duration = 60;
animate = function(list, row, column){
  var spit, childs, i$, len$, line, run, results$ = [];
  spit = function(){
    var out;
    out = slice$.call(list, 0, row + 1 || 9e9);
    list = slice$.call(list, row).concat(out.concat());
    return out;
  };
  childs = q("body").childNodes;
  for (i$ = 0, len$ = childs.length; i$ < len$; ++i$) {
    line = childs[i$];
    run = fn$;
    results$.push(run(line));
  }
  return results$;
  function fn$(line){
    var first, dark, start;
    first = function(){
      return line.firstElementChild;
    };
    dark = false;
    return (start = function(){
      var chars, show, time, hide;
      if (dark) {
        chars = spit();
        show = function(elem, chars){
          var last, next;
          log("show", elem, chars);
          elem.style.opacity = 1;
          elem.innerText = chars.shift();
          elem.style.color = "hsl(0,0%,100%)";
          last = elem.previousElementSibling;
          next = elem.nextElementSibling;
          log("hide", next);
          if (last != null) {
            last.style.color = "hsl(20,70%,40%)";
          }
          if (next != null) {
            return delay(duration, function(){
              return show(next, chars);
            });
          }
        };
        show(first(), chars);
        time = duration * random(60);
        delay(time, start);
      } else {
        hide = function(elem){
          var next;
          elem.style.opacity = 0;
          next = elem.nextElementSibling;
          log("hide", next);
          if (next != null) {
            return delay(duration, function(){
              return hide(next);
            });
          }
        };
        hide(first());
        time = duration * random(100);
        delay(time, start);
      }
      return dark = !dark;
    })();
  }
};
window.onload = function(){
  var allWidth, allHeight, column, row, makeLine, html, req, x$;
  allWidth = window.innerWidth;
  allHeight = window.innerHeight;
  column = Math.floor(allWidth / 20);
  row = Math.floor(allHeight / 20);
  makeLine = function(){
    var inner;
    inner = (function(){
      var i$, to$, results$ = [];
      for (i$ = 0, to$ = row; i$ <= to$; ++i$) {
        results$.push(i$);
      }
      return results$;
    }()).map(function(){
      return tmpl({
        ".cell": ""
      });
    }).join("");
    return tmpl({
      ".line": inner
    });
  };
  html = (function(){
    var i$, to$, results$ = [];
    for (i$ = 0, to$ = column; i$ <= to$; ++i$) {
      results$.push(i$);
    }
    return results$;
  }()).map(makeLine).join("");
  q("body").innerHTML = html;
  req = new XMLHttpRequest;
  x$ = req;
  x$.open("get", "../data/piece.txt");
  x$.send();
  x$.onload = function(res){
    var text, list;
    text = res.target.response;
    list = text.split("").map(notPunction);
    log("got list:", list);
    return animate(list, row, column);
  };
  return x$;
};
function in$(x, arr){
  var i = -1, l = arr.length >>> 0;
  while (++i < l) if (x === arr[i] && i in arr) return true;
  return false;
}