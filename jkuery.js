/**
 * jKuery sounds like jQuery
 *
 * @copyright Yusuke Kawasaki
 * @license MIT
 * @see https://github.com/kawanet/jkuery
 */

var $;

function jKuery(selector) {
  if (this instanceof jKuery) {
    if (selector) [].push.call(this, selector);
  } else if ("string" === typeof selector) {
    return new jKuery(document).find(selector);
  } else {
    return new jKuery(selector);
  }
}

!function(jKuery) {
  if (!$) $ = jKuery;

  if ("undefined" !== typeof module) module.exports = jKuery;

  init(jKuery.prototype);

  function init(target) {
    var proto = {
      length: 0,
      attr: attr,
      css: css,
      each: each,
      find: find,
      on: on,
      prop: prop,
      text: text,
      trigger: trigger
    };

    for (var key in proto) {
      target[key] = proto[key];
    }
  }

  function attr(name, value) {
    if (arguments.length < 2) {
      var first = this[0];
      return first && first.getAttribute(name);
    }

    return each.call(this, function(idx, elem) {
      elem.setAttribute(name, value);
    });
  }

  function css(name, val) {
    if (arguments.length < 2) {
      var first = this[0];
      return first && first.style && first.style[name];
    }

    return each.call(this, function(idx, elem) {
      elem.style[name] = val;
    });
  }

  function each(cb) {
    [].forEach.call(this, function(elem, idx) {
      cb(idx, elem);
    });
    return this;
  }

  function find(selector) {
    var out = jKuery();
    each.call(this, function(idx, elem) {
      var nodes = elem.querySelectorAll(selector);
      [].push.apply(out, nodes);
    });
    return out;
  }

  function on(type, func) {
    return each.call(this, function(idx, elem) {
      elem.addEventListener(type, func);
    });
  }

  function prop(name, value) {
    if (arguments.length < 2) {
      var first = this[0];
      return first && first[name];
    }

    return each.call(this, function(idx, elem) {
      elem[name] = !!value;
    });
  }

  function text(str) {
    return each.call(this, function(idx, elem) {
      elem.innerText = str;
    });
  }

  function trigger(event) {
    return each.call(this, function(idx, elem) {
      var ev = ("string" === typeof event) ? new Event(event) : event;
      elem.dispatchEvent(ev);
    });
  }
}(jKuery);
