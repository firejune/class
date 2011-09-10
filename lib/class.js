/*!
 * Class - Port of Prototype.js inheritance implementation for Node.js.
 *
 * Copyright(c) 2011 Firejune <to@firejune.com>
 * MIT Licensed
 */


/**
 * Export Class as the module.
 */
var Class = module.exports = (function(slice) {

  return {
    varsion: "0.1.1",
    create: create,
    Methods: {
      addMethods: addMethods
    }
  };

  /* Based on Alex Arnell's inheritance implementation. */

  function subclass() {};

  function create() {
    var parent = null, properties = actualArray(arguments);
    if (typeof properties[0] == "function")
      parent = properties.shift();
  
    function klass() {
      this.initialize.apply(this, arguments);
    }
  
    extend(klass, Class.Methods);
    klass.superclass = parent;
    klass.subclasses = [];
  
    if (parent) {
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass;
      parent.subclasses.push(klass);
    }
  
    for (var i = 0, length = properties.length; i < length; i++)
      klass.addMethods(properties[i]);
  
    if (!klass.prototype.initialize)
      klass.prototype.initialize = Prototype.emptyFunction;
  
    klass.prototype.constructor = klass;
    return klass;
  }
  
  function addMethods(source) {
    var ancestor   = this.superclass && this.superclass.prototype
      , properties = keys(source)
      , length = properties.length;
  
    for (var i = 0; i < length; i++) {
      var property = properties[i]
        , value = source[property];

      if ( ancestor && typeof value == "function"
        && argumentNames(value)[0] == "$super") {

        var method = value;
        value = wrap((function(m) {
          return function() {
            return ancestor[m].apply(this, arguments);
          };
        })(property), method);
  
        value.valueOf = method.valueOf.bind(method);
        value.toString = method.toString.bind(method);
      }

      this.prototype[property] = value;
    }
  
    return this;
  }

  
  // Utils.
  function actualArray(iterable) {
    if (!iterable) return [];
    if ('toArray' in Object(iterable)) return iterable.toArray();

    var length = iterable.length || 0
      , results = new Array(length);

    while (length--) results[length] = iterable[length];
    return results;
  }
  
  function extend(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
  }
  
  function keys(object) {
    var keys = [];

    for (var property in object)
      keys.push(property);

    return keys;
  }


  function update(array, args) {
    var arrayLength = array.length
      , length = args.length;

    while (length--)
      array[arrayLength + length] = args[length];

    return array;
  }
  
  function merge(array, args) {
    array = slice.call(array, 0);
    return update(array, args);
  }
  
  function bind(fn, context) {
    var args = arguments;
    if (args.length < 2 && typeof args[0] == undefined) return fn;

    var args = slice.call(args, 1);
    return function() {
      var a = merge(args, arguments);
      return fn.apply(context, a);
    }
  }
  
  function wrap(fn, wrapper) {
    return function() {
      var a = update([fn.bind(this)], arguments);
      return wrapper.apply(this, a);
    }
  }
  
  function argumentNames(fn) {
    var names = fn.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
      .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
      .replace(/\s+/g, '').split(',');
    return names.length == 1 && !names[0] ? [] : names;
  }

}(Array.prototype.slice));