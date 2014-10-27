describe('ECMAScript 5', function() {
  var assert = chai.assert;
  describe('Object', function() {
    it('exists methods', function() {
      assert.typeOf(Object.create, 'function');
      assert.typeOf(Object.defineProperty, 'function');
      assert.typeOf(Object.defineProperties, 'function');
      assert.typeOf(Object.getPrototypeOf, 'function');
      assert.typeOf(Object.keys, 'function');
      assert.typeOf(Object.seal, 'function');
      assert.typeOf(Object.freeze, 'function');
      assert.typeOf(Object.preventExtensions, 'function');
      assert.typeOf(Object.isSealed, 'function');
      assert.typeOf(Object.isFrozen, 'function');
      assert.typeOf(Object.getOwnPropertyDescriptor, 'function');
      assert.typeOf(Object.getOwnPropertyNames, 'function');
    });
    it('exists getter', function() {
      var obj = {
        get x() {
          return 1;
        }
      };
      assert.equal(obj.x, 1);
    });
    it('exists setter', function() {
      var value = 0;
      var obj = {
        set y(v) {
          value = v;
        }
      };
      obj.y = 1;
      assert.equal(value, 1);
    });
    it('should be usable reserved words', function() {
      var obj = {
        switch: 0,
        break: 1,
        finally: 2,
        this: 3,
        case: 4,
        for: 5,
        throw: 6,
        catch: 7,
        function: 8,
        try: 9,
        continue: 10,
        if: 11,
        typeof: 12,
        debugger: 13,
        in: 14,
        var: 15,
        default: 16,
        instanceof: 17,
        void: 18,
        delete: 19,
        new: 20,
        while: 21,
        do: 22,
        return: 23,
        with: 24,
        else: 25
      };
      assert.equal(obj.switch, 0);
      assert.equal(obj.break, 1);
    });
    it('should be usable zero-width chars in identifiers', function() {
      var _\u200c\u200d = true;
      assert.equal(_\u200c\u200d, true);
    });
  });
  describe('Date', function() {
    it('exists methods', function() {
      assert.typeOf(Date.prototype.toISOString, 'function');
      assert.typeOf(Date.now, 'function');
    });
  });
  describe('Array', function() {
    it('exists methods', function() {
      assert.typeOf(Array.isArray, 'function');
      assert.typeOf(Array.prototype.indexOf, 'function');
      assert.typeOf(Array.prototype.lastIndexOf, 'function');
      assert.typeOf(Array.prototype.every, 'function');
      assert.typeOf(Array.prototype.some, 'function');
      assert.typeOf(Array.prototype.forEach, 'function');
      assert.typeOf(Array.prototype.map, 'function');
      assert.typeOf(Array.prototype.filter, 'function');
      assert.typeOf(Array.prototype.reduce, 'function');
      assert.typeOf(Array.prototype.reduceRight, 'function');
    });
  });
  describe('JSON', function() {
    it('exists', function() {
      assert.typeOf(JSON, 'object');
    });
  });
  describe('Function', function() {
    it('exists methods', function() {
      assert.typeOf(Function.prototype.bind, 'function');
    });
  });
  describe('String', function() {
    it('exists methods', function() {
      assert.typeOf(String.prototype.trim, 'function');
    });
    it('should be accessing to property ', function() {
      assert.equal('foobar'[3], 'b');
    });
  });
  describe('#parseInt()', function() {
    it('should ignores leading zeros', function() {
      assert.equal(parseInt('010'), 10);
    });
  });
  describe('undefined', function() {
    it('should be immutable', function() {
      undefined = 123;
      assert.typeOf(undefined, 'undefined');
      undefined = void 0;
      assert.typeOf(undefined, 'undefined');
    });
  });
});
