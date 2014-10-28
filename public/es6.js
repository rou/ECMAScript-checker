describe('ECMAScript 6', function() {
  var assert = chai.assert;

  it('should be enabled "Map" class', function() {
    var key = {};
    var map = new Map();
    map.set(key, 123);
    assert.isTrue(map.has(key));
    assert.equal(map.get(key), 123);
    assert.equal(map.size, 1);
  });
  it('should be enabled "Set" class', function() {
    var set = new Set();
    set.add(123);
    set.add(123);
    set.add(234);
    assert.isTrue(set.has(123));
    assert.isTrue(set.has(234));
    assert.equal(set.size, 2);
  });
  it('should be enabled "WeakMap" class', function() {
    var key = {};
    var weakMap = new WeakMap();
    weakMap.set(key, 123);
    assert.isTrue(weakMap.has(key));
    assert.equal(weakMap.get(key), 123);
  });
  it('should be enabled "WeakSet" class', function() {
    var obj1 = {}, obj2 = {};
    var weakSet = new WeakSet();
    weakSet.add(obj1);
    weakSet.add(obj1);
    assert.isTrue(weakSet.has(obj1));
  });
  it('should be enabled "Proxy" class', function() {
    var f = function () {
      try {
        return typeof Proxy !== 'undefined' &&
          new Proxy({}, {
            get: function () {
              return 5;
            }
          }).foo === 5;
      }
      catch(err) {}
      return false;
    };
    assert.isTrue(f());
  });
  it('should be enabled "Reflect"', function() {
    var f = function () {
      var i, names =
        ['apply','construct','defineProperty','deleteProperty','getOwnPropertyDescriptor',
          'getPrototypeOf','has','isExtensible','set','setPrototypeOf'];

      if (typeof Reflect !== 'object') {
        return false;
      }
      for (i = 0; i < names.length; i++) {
        if (!(names[i] in Reflect)) {
          return false;
        }
      }
      return true;
    };
    assert.isTrue(f());
  });
  it('should be enabled "Reflect.Loader" method', function() {
    var f = function () {
      var i, names =
        ['define', 'delete', 'entries', 'get', 'global', 'has', 'import',
          'keys', 'load', 'module', 'newModule', 'realm', 'set', 'values',
          'normalize', 'locate', 'fetch', 'translate', 'instantiate'];

      if (typeof Reflect !== 'object' || typeof Reflect.Loader !== 'function'
        || typeof Reflect.Loader.prototype !== 'object') {
        return false;
      }
      for (i = 0; i < names.length; i++) {
        if (!(names[i] in Reflect.Loader.prototype)) {
          return false;
        }
      }
      return true;
    };
    assert.isTrue(f());
  });
  it('should be enabled "const" modifier', function () {
    checkEnabled('(function () {\
      const foo = 12;\
      return typeof foo === "number";\
    }());');
  });
  it('should be enabled "let" modifier', function() {
    checkEnabled('(function() {\
      let bar = 123;\
      return bar == 123;\
    })();');
  });
  it('should be enabled "modules"', function() {
    checkEnabled('(function() {\
      export var foo = 1;\
      return true;\
    })();');
  });
  it('should be enabled "for..of" loops', function() {
    checkEnabled('(function() {\
      var arr = [5];\
      for (var item of arr) {\
        return item === 5;\
      }\
    })();');
  });
  it('should be enabled "Promise"', function() {
    assert.notEqual(typeof Promise, 'undefined');
    assert.typeOf(Promise.all, 'function');
  });

  describe('Object', function() {
    it('should be enabled "computed properties"', function() {
      checkEnabled('(function() {\
        var x = "y";\
        return ({[x]: 1}).y === 1;\
      })()');
    });
    it('should be enabled "shorthand properties"', function() {
      checkEnabled('(function() {\
        var a = 7, b = 8, c = {a,b};\
        return c.a === 7 && c.b === 8;\
      })();')
    });
    it('should be enabled "destructuring"', function() {
      checkEnabled('(function() {\
        var [a, , [b], g] = [5, null, [6]];\
        var {c, x:d, h} = {c:7, x:8};\
        var [e, {x:f, i}] = [9, {x:10}];\
        return a === 5 && b === 6 && c === 7 &&\
          d === 8 && e === 9 && f === 10 &&\
          g === undefined && h === undefined && i === undefined;\
      })();');
    });
    it('should be enabled "destructuring parameters"', function() {
      checkEnabled('(function() {\
        return (function({a, x:b}, [c, d]) {\
          return a === 1 && b === 2 && c === 3 && d === 4;\
        }({a:1, x:2},[3, 4]));\
      })();');
    });
    it('should be enabled "destructuring defaults"', function() {
      checkEnabled('(function() {\
        var {a = 1, b = 1, c = 3} = {b:2, c:undefined};\
        return a === 1 && b === 2 && c === 3;\
      })();');
    });
    it('should be enabled "destructuring rest"', function() {
      checkEnabled('(function() {\
        var [a, ...b] = [3, 4, 5];\
        var [c, ...d] = [6];\
        return a === 3 && b instanceof Array && (b + "") === "4,5" &&\
          c === 6 && d instanceof Array && d.length === 0;\
      })();');
    });
    it('should be enabled "assign" method', function() {
      assert.typeOf(Object.assign, 'function');
    });
    it('should be enabled "is" method', function() {
      assert.typeOf(Object.is, 'function');
    });
    it('should be enabled "getOwnPropertySymbols" method', function() {
      assert.typeOf(Object.getOwnPropertySymbols, 'function');
    });
    it('should be enabled "setPrototypeOf" method', function() {
      assert.typeOf(Object.setPrototypeOf, 'function');
    });
    it('should be enabled "__proto__" in object literals', function() {
      var passed = { __proto__ : [] } instanceof Array
        && !({ __proto__ : null } instanceof Object);
      var a = "__proto__";
      try {
        eval("passed = passed && !({ [a] : [] } instanceof Array)");
      } catch(e) {
      }
      assert.isTrue(passed);
    });
    it('should be enabled "__proto__" property', function() {
      checkEnabled('(function () {\
        var a = {},\
          desc = Object.getOwnPropertyDescriptor\
            && Object.getOwnPropertyDescriptor(Object.prototype,"__proto__");\
        return !!(desc\
          && "get" in desc\
          && "set" in desc\
          && desc.configurable\
          && !desc.enumerable\
          && Object.create(a).__proto__ === a);\
        })();');
    });
  });

  describe('Function', function() {
    it('should be enabled "proper tail calls (tail call optimisation)"', function() {
      'use strict';
      var f = function(n) {
        if (n <= 0) {
          return 'foo';
        }
        return f(n - 1);
      };
      assert.equal(f(1e6), 'foo');
    });
    it('should be enabled "arrow function"', function() {
      checkEnabled('(function() {\
        var a = () => 5;\
        return a() === 5;\
      })();');
    });
    it('should be enabled "default parameter"', function() {
      checkEnabled('(function (a = 1, b = 2) {\
        return a === 3 && b === 2; };\
      )(3)');
      checkEnabled('(function (a = 1, b = 2) {\
        return a === 1 && b === 3;\
      }(undefined, 3));');
      checkEnabled('(function (a, b = a) {\
        return b === 5;\
      }(5));');
    });
    it('should be enabled "rest parameters"', function() {
      checkEnabled('(function(...args){\
        return jQuery.isArray(args)\
      })();');
      checkEnabled('(function(...args){\
        return jQuery.isArray(args)\
      })(1, "a");');
    });
    it('should be enabled "spread call (...) operator"', function() {
      checkEnabled('Math.max(...[1, 2, 3]) === 3;');
    });
    it('should be enabled "shorthand methods"', function() {
      checkEnabled('(function() {\
        return ({\
          y() {\
            return 2;\
          }\
        }).y() === 2;\
      })();');
    });
    it('should be enabled "generators (yield)"', function() {
      checkEnabled('(function() {\
        function* foo() {\
          yield "foo";\
          yield "bar";\
          yield "baz";\
        }\
        var x = foo();\
        var passed = x.next().value === "foo";\
        passed     = passed && x.next().value === "bar";\
        passed     = passed && x.next().value === "baz";\
        return passed;\
      })();');
    });
    it('should be enabled "block-level function declaration"', function() {
      'use strict';
      checkEnabled('(function() {\
        {\
          function f() {};\
        }\
        return typeof f === "undefined";\
      })();');
    });
    it('should be enabled "name" propety', function() {
      assert.equal((function foo() {}).name, 'foo');
    });
    it('should be enabled "toMethod" method', function() {
      assert.typeOf(Function.prototype.toMethod, 'function');
    });
    it('should be enabled "hoisted block-level function declaration"', function() {
      checkEnabled('(function() {\
        var passed = f() === 2 && g() === 4;\
        if (true) { function f(){ return 1; } } else { function f(){ return 2; } }\
        if (false){ function g(){ return 3; } } else { function g(){ return 4; } }\
        return passed;\
      })();');
    });
  });

  describe('Array', function() {
    it('should be enabled "spread array (...) operator"', function() {
      checkEnabled('(function() {\
        return [...[1, 2, 3]][2] === 3;\
      })()');
    });
    it('should be enabled "Typed Array"', function() {
        checkEnabled('(function() {\
        var buffer = new ArrayBuffer(64);\
        var passed = true;\
        var view;\
        view = new Int8Array(buffer);         view[0] = 0x80;\
        passed = passed && view[0] === -0x80;\
        view = new Uint8Array(buffer);        view[0] = 0x100;\
        passed = passed && view[0] === 0;\
        view = new Uint8ClampedArray(buffer); view[0] = 0x100;\
        passed = passed && view[0] === 0xFF;\
        view = new Int16Array(buffer);        view[0] = 0x8000;\
        passed = passed && view[0] === -0x8000;\
        view = new Uint16Array(buffer);       view[0] = 0x10000;\
        passed = passed && view[0] === 0;\
        view = new Int32Array(buffer);        view[0] = 0x80000000;\
        passed = passed && view[0] === -0x80000000;\
        view = new Uint32Array(buffer);       view[0] = 0x100000000;\
        passed = passed && view[0] === 0;\
        view = new Float32Array(buffer);      view[0] = 0.1;\
        passed = passed && view[0] === 0.10000000149011612;\
        view = new Float64Array(buffer);      view[0] = 0.1;\
        passed = passed && view[0] === 0.1;\
        return passed;\
      })();');
    });
    it('should be enabled "Typed Array(DataView)"', function() {
      checkEnabled('(function() {\
        var buffer = new ArrayBuffer(64);\
        var view = new DataView(buffer);\
        var passed = true;\
        view.setInt8 (0, 0x80);        passed = passed && view.getInt8(0)   === -0x80;\
        view.setUint8(0, 0x100);       passed = passed && view.getUint8(0)  === 0;\
        view.setInt16(0, 0x8000);      passed = passed && view.getInt16(0)  === -0x8000;\
        view.setUint16(0,0x10000);     passed = passed && view.getUint16(0) === 0;\
        view.setInt32(0, 0x80000000);  passed = passed && view.getInt32(0)  === -0x80000000;\
        view.setUint32(0,0x100000000); passed = passed && view.getUint32(0) === 0;\
        view.setFloat32(0, 0.1);       passed = passed && view.getFloat32(0)=== 0.10000000149011612;\
        view.setFloat64(0, 0.1);       passed = passed && view.getFloat64(0)=== 0.1;\
        return passed;\
      })();');
    });
    it('should be enabled "from" method', function() {
      assert.typeOf(Array.from, 'function');
    });
    it('should be enabled "of" method', function() {
      assert.typeOf(Array.of, 'function');
    });
    it('should be enabled "copyWithin" method', function() {
      assert.typeOf(Array.prototype.copyWithin, 'function');
    });
    it('should be enabled "find" method', function() {
      assert.typeOf(Array.prototype.find, 'function');
    });
    it('should be enabled "findIndex" method', function() {
      assert.typeOf(Array.prototype.findIndex, 'function');
    });
    it('should be enabled "fill" method', function() {
      assert.typeOf(Array.prototype.fill, 'function');
    });
    it('should be enabled "keys" method', function() {
      assert.typeOf(Array.prototype.keys, 'function');
    });
    it('should be enabled "values" method', function() {
      assert.typeOf(Array.prototype.values, 'function');
    });
    it('should be enabled "entries" method', function() {
      assert.typeOf(Array.prototype.entries, 'function');
    });
    it('should be enabled "[Symbol.unscopables]" method', function() {
      checkEnabled('(function() {\
        var unscopables = Array.prototype[Symbol.unscopables];\
        var ns = "find,findIndex,fill,copyWithin,entries,keys,values".split(",");\
        for (var i = 0; i < ns.length; i++) {\
          if (!unscopables[ns[i]]) return false;\
        }\
        return true;\
      })();');
    });
  });

  describe('String', function() {
    it('should be enabled "string spreading"', function() {
      checkEnabled('(function() {\
        return ["a", ..."bcd", "e"][3] === "d" && Math.max(..."1234") === 4;\
      })();');
    });
    it('should be enabled "template strings"', function() {
      checkEnabled('(function() {\
        var a = "ba", b = "QUX";\
        return `foo ${a + "z"} ${b.toLowerCase()}` === "foo baz qux";\
      })();');
    });
    it('should be enabled "tagged template strings"', function() {
      checkEnabled('(function() {\
        var called = false;\
        function fn(parts, a, b) {\
          called = true;\
          return parts instanceof Array &&\
            parts[0]     === "foo"      &&\
            parts[1]     === "bar\n"    &&\
            parts.raw[0] === "foo"      &&\
            parts.raw[1] === "bar\n"    &&\
            a === 123                   &&\
            b === 456;\
        }\
        return fn `foo${123}bar\n${456}` && called;\
      })();');
    });
    it('should be enabled "raw" method', function() {
      assert.typeOf(String.raw, 'function');
    });
    it('should be enabled "fromCodePoint" method', function() {
      assert.typeOf(String.fromCodePoint, 'function');
    });
    it('should be enabled "codePointAt" method', function() {
      assert.typeOf(String.prototype.codePointAt, 'function');
    });
    it('should be enabled "normalize" method', function() {
      assert.typeOf(String.prototype.normalize, 'function');
      assert.equal('c\u0327\u0301'.normalize('NFC'), '\u1e09');
      assert.equal('\u1e09'.normalize('NFD'), 'c\u0327\u0301');
    });
    it('should be enabled "repeat" method', function() {
      assert.typeOf(String.prototype.repeat, 'function');
    });
    it('should be enabled "startsWith" method', function() {
      assert.typeOf(String.prototype.startsWith, 'function');
    });
    it('should be enabled "endsWith" method', function() {
      assert.typeOf(String.prototype.endsWith, 'function');
    });
    it('should be enabled "contains" method', function() {
      assert.typeOf(String.prototype.contains, 'function');
    });
    it('should be enabled "Unicode code point escapes" method', function() {
      throw new SyntaxError('Some environments stop specs by malformed unicode.');
//      checkEnabled('(function() {\
//        return "\u{1d306}" == "\ud834\udf06";\
//      })();');
    });
    it('should be enabled "HTML" methods', function() {
      var i, names = ["anchor", "big", "bold", "fixed", "fontcolor", "fontsize",
        "italics", "link", "small", "strike", "sub", "sup"];
      for (i = 0; i < names.length; i++) {
        assert.typeOf(String.prototype[names[i]], 'function');
      }
    });
  });

  describe('Class', function() {
    it('should be enabled class', function() {
      checkEnabled('(function() {\
        class C extends Array {\
          constructor() {\
            this.b = true;\
          }\
          a() {\
            return 1;\
          }\
          static d() {\
            return "hoge";\
          }\
        }\
        return C.d() === "hoge" && new C().a() === 1 && new C().b && new C() instanceof Array;\
      })();\n');
    });
    it('should be enabled "super"', function() {
      checkEnabled('(function() {\
        var passed = true;\
        var B = class extends class {\
          constructor(a) {\
            return this.id + a;\
          }\
          foo(a) {\
            return a + this.id;\
          }\
        } {\
          constructor(a) {\
            this.id = "AB";\
            passed = passed && super(a)     === "ABCD";\
            passed = passed && super.foo(a) === "CDAB;\
          }\
          foo(a) {\
            passed = passed && super.foo(a) === "YZEF";\
          }\
        }\
        var b = new B("CD");\
        var obj = {\
          foo: b.foo,\
          id:"EF"\
        };\
        obj.foo("YZ");\
        return passed;\
      })()');
    });
  });

  describe('Number', function() {
    it('should be enabled "octal literals"', function() {
      checkEnabled('(function() {\
        return 0o10 === 8 && 0O10 === 8;\
      })();');
    });
    it('should be enabled "binary literals"', function() {
      checkEnabled('(function() {\
        return 0b10 === 2 && 0B10 === 2;\
      })();');
    });
    it('should be enabled "isFinite" method', function() {
      assert.typeOf(Number.isFinite, 'function');
    });
    it('should be enabled "isInteger" method', function() {
      assert.typeOf(Number.isInteger, 'function');
    });
    it('should be enabled "isSafeInteger" method', function() {
      assert.typeOf(Number.isSafeInteger, 'function');
    });
    it('should be enabled "isNaN" method', function() {
      assert.typeOf(Number.isNaN, 'function');
    });
    it('should be enabled "EPSILON" constant', function() {
      assert.typeOf(Number.EPSILON, 'number');
    });
    it('should be enabled "MIN_SAFE_INTEGER" constant', function() {
      assert.typeOf(Number.MIN_SAFE_INTEGER, 'number');
    });
    it('should be enabled "MAX_SAFE_INTEGER" constant', function() {
      assert.typeOf(Number.MAX_SAFE_INTEGER, 'number');
    });
  });

  describe('RegExp', function() {
    it('should be enabled "y option"', function() {
      var re = new RegExp('\\w');
      var re2 = new RegExp('\\w', 'y');
      re.exec('xy');
      re2.exec('xy');
      assert.equal(re.exec('xy')[0], 'x');
      assert.equal(re2.exec('xy')[0], 'y');
    });
    it('should be enabled "u option"', function() {
      var re = new RegExp('.', 'u');
      assert.equal("吉".match(re)[0].length, 2);
    });
    it('should be enabled "match" method', function() {
      assert.typeOf(RegExp.prototype.match, 'function');
    });
    it('should be enabled "replace" method', function() {
      assert.typeOf(RegExp.prototype.replace, 'function');
    });
    it('should be enabled "search" method', function() {
      assert.typeOf(RegExp.prototype.search, 'function');
    });
    it('should be enabled "split" method', function() {
      assert.typeOf(RegExp.prototype.split, 'function');
    });
    it('should be enabled "compile" method', function() {
      assert.typeOf(RegExp.prototype.compile, 'function');
    });
  });

  describe('Symbol', function() {
    it('should be enabled "Symbol"', function() {
      assert.typeOf(Symbol, 'function');
      var symbol = Symbol();
      var object = {};
      var value = Math.random();
      object[symbol] = value;
      assert.typeOf(symbol, 'symbol');
      assert.equal(object[symbol], value);
      assert.equal(Object.keys(object).length, 0);
      assert.equal(Object.getOwnPropertyNames(object).length, 0);
    });
    it('should be enabled "Global symbol registry"', function() {
      assert.typeOf(Symbol, 'function');
      var symbol = Symbol.for('foo');
      assert.equal(Symbol.for('foo'), symbol);
      assert.equal(Symbol.keyFor(symbol), 'foo');
    });
    it('should be enabled "hasInstance"', function() {
      throw new SyntaxError('Spec has been insufficient yet.');
//      function f() {
//        var passed = false;
//        var obj = { foo: true };
//        var C = function(){};
//        C[Symbol.hasInstance] = function(inst) { passed = inst.foo; return false; };
//        obj instanceof C;
//        return passed;
//      }
//      assert.isTrue(f());
    });
    it('should be enabled "isConcatSpreadable"', function() {
      var a = [], b = [];
      assert.typeOf(Symbol, 'function');
      b[Symbol.isConcatSpreadable] = false;
      a = a.concat(b);
      assert.equal(a[0], b);
    });
    it('should be enabled "isRegExp"', function() {
      assert.typeOf(Symbol, 'function');
      assert.isTrue(RegExp.prototype[Symbol.isRegExp]);
    });
    it('should be enabled "iterator"', function() {
      checkEnabled('(function() {\
        var a = 0, b = {};\
        b[Symbol.iterator] = function() {\
          return {\
            next: function() {\
              return {\
                done: a === 1,\
                value: a++\
              };\
            }\
          };\
        };\
        var c;\
        for (c of b) {\
        }\
        return c === 0;\
      })();');
    });
    it('should be enabled "toPrimitive"', function() {
      checkEnabled('(function() {\
        var a = {}, b = {}, c = {};\
        var passed = 0;\
        a[Symbol.toPrimitive] = function(hint) { passed += hint === "number";  return 0; };\
        b[Symbol.toPrimitive] = function(hint) { passed += hint === "string";  return 0; };\
        c[Symbol.toPrimitive] = function(hint) { passed += hint === "default"; return 0; };\
        a >= 0;\
        b in {};\
        c == 0;\
        return passed === 3;\
      })();');
    });
    it('should be enabled "toStringTag"', function() {
      var a = {};
      assert.typeOf(Symbol, 'function');
      a[Symbol.toStringTag] = "foo";
      assert.equal((a + ''), '[object foo]');
    });
    it('should be enabled "unscopables"', function() {
      var a = {
        foo: 1,
        bar: 2
      };
      assert.typeOf(Symbol, 'function');
      a[Symbol.unscopables] = {
        bar: true
      };
      assert.equal(a.foo, 1);
      assert.isUndefined(a.bar);
    });
  });

  describe('Math', function() {
    it('should be enabled "clz32"', function() {
      assert.typeOf(Math.clz32, 'function');
    });
    it('should be enabled "imul"', function() {
      assert.typeOf(Math.imul, 'function');
    });
    it('should be enabled "sign"', function() {
      assert.typeOf(Math.sign, 'function');
    });
    it('should be enabled "log10"', function() {
      assert.typeOf(Math.log10, 'function');
    });
    it('should be enabled "log2"', function() {
      assert.typeOf(Math.log2, 'function');
    });
    it('should be enabled "log1p"', function() {
      assert.typeOf(Math.log1p, 'function');
    });
    it('should be enabled "expm1"', function() {
      assert.typeOf(Math.expm1, 'function');
    });
    it('should be enabled "cosh"', function() {
      assert.typeOf(Math.cosh, 'function');
    });
    it('should be enabled "sinh"', function() {
      assert.typeOf(Math.sinh, 'function');
    });
    it('should be enabled "tanh"', function() {
      assert.typeOf(Math.tanh, 'function');
    });
    it('should be enabled "acosh"', function() {
      assert.typeOf(Math.acosh, 'function');
    });
    it('should be enabled "asinh"', function() {
      assert.typeOf(Math.asinh, 'function');
    });
    it('should be enabled "atanh"', function() {
      assert.typeOf(Math.atanh, 'function');
    });
    it('should be enabled "hypot"', function() {
      assert.typeOf(Math.hypot, 'function');
    });
    it('should be enabled "trunc"', function() {
      assert.typeOf(Math.trunc, 'function');
    });
    it('should be enabled "fround"', function() {
      assert.typeOf(Math.fround, 'function');
    });
    it('should be enabled "cbrt"', function() {
      assert.typeOf(Math.cbrt, 'function');
    });
  });

  function checkEnabled(checker) {
    var result = false,
      error = null;
    try {
      result = eval(checker);
    } catch (e) {
      error = e;
    }
    assert.isNull(error, error ? error.message : undefined);
    assert.isTrue(result);
  }
});
