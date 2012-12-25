(function(){
  var log, isArr, isStr, isObj, slice$ = [].slice;
  log = function(){};
  isArr = Array.isArray;
  isStr = function(it){
    return typeof it === "string";
  };
  isObj = function(it){
    var rule1, rule2;
    rule1 = typeof it === "object";
    rule2 = isArr(it);
    return rule1 && !rule2;
  };
  window.tmpl = function(it){
    var parse, wrap, generate;
    parse = function(it){
      var res, ref$, head, attr, name, id, clas;
      res = [(ref$ = it.match(/(^\S+)(\s.*)?$/))[0], ref$[1], ref$[2]];
      head = res[1];
      attr = res[2] || '';
      name = head.match(/^[\w\d-]+/);
      if (name != null) {
        name = name[0];
      } else {
        name = "div";
      }
      id = head.match(/\/[\w\d-]+/);
      if (id != null) {
        id = slice$.call(id[0], 1).join('');
      } else {
        id = '';
      }
      clas = head.match(/\.[\w\d-]+/g);
      if (clas == null) {
        clas = [];
      }
      clas = clas.map(function(it){
        return slice$.call(it, 1).join('');
      });
      return [name, id, clas.join(' '), attr];
    };
    wrap = function(them, child){
      var name, id, clas, attr, clasAttr, idAttr;
      name = them[0], id = them[1], clas = them[2], attr = them[3];
      if (!isStr(child)) {
        child = generate(child);
      }
      clasAttr = clas.length > 0 ? "class='" + clas + "'" : '';
      idAttr = id.length > 0 ? "id='" + id + "'" : '';
      return "<" + name + " " + clasAttr + " " + idAttr + " " + attr + ">" + child + "</" + name + ">";
    };
    generate = function(it){
      var html, key, value;
      if (isArr(it)) {
        return it.map(generate).join('');
      } else if (isObj(it)) {
        html = '';
        for (key in it) {
          value = it[key];
          html += wrap(parse(key), value);
        }
        return html;
      } else if (isStr(it)) {
        return wrap(parse(it), '');
      }
    };
    return generate(it);
  };
}).call(this);
