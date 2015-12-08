
'use strict';

var assert = require('assert');
var jsonToDynamo = require('..');

describe('jsonToDynamo(json)', function() {
  it('should handle nulls', function() {
    var json = {
      nil: null
    };
    var dynamo = jsonToDynamo(json);
    assert.deepEqual(dynamo, {
      nil: {
        NULL: true
      }
    });
  });

  it('should handle booleans', function() {
    var json = {
      true: true,
      false: false
    };
    var dynamo = jsonToDynamo(json);
    assert.deepEqual(dynamo, {
      true: {
        BOOL: true
      },
      false: {
        BOOL: false
      }
    });
  });

  it('should handle strings', function() {
    var json = {
      hello: 'world'
    };
    var dynamo = jsonToDynamo(json);
    assert.deepEqual(dynamo, {
      hello: {
        S: 'world'
      }
    });
  });

  it('should convert dates to strings', function() {
    var date = new Date;
    var json = {
      date: date
    };
    var dynamo = jsonToDynamo(json);
    assert.deepEqual(dynamo, {
      date: {
        S: date.toString()
      }
    });
  });

  it('should handle numbers', function() {
    var json = {
      number: 12345
    };
    var dynamo = jsonToDynamo(json);
    assert.deepEqual(dynamo, {
      number: {
        N: '12345'
      }
    });
  });

  it('should handle arrays', function() {
    var json = {
      colors: [ 'red', 'green', 'blue' ]
    };
    var dynamo = jsonToDynamo(json);
    assert.deepEqual(dynamo, {
      colors: {
        L: [
          { S: 'red' },
          { S: 'green' },
          { S: 'blue' }
        ]
      }
    });
  });

  it('should handle objects', function() {
    var json = {
      o: {
        foo: 'bar'
      }
    };
    var dynamo = jsonToDynamo(json);
    assert.deepEqual(dynamo, {
      o: {
        M: {
          foo: {
            S: 'bar'
          }
        }
      }
    });
  });

  it('should handle buffers', function() {
    var buf = new Buffer(`i'm a buffer.`);
    var json = { buffer: buf };
    var dynamo = jsonToDynamo(json);
    assert.deepEqual(dynamo, {
      buffer: {
        B: buf.toString('base64')
      }
    });
  });

  it('should handle arrays of mixed types', function() {
    var json = [ 'foo', 42, { blah: 'blah' } ];
    var dynamo = jsonToDynamo(json);
    assert.deepEqual(dynamo, [
      { S: 'foo' },
      { N: '42' },
      {
        M: {
          blah: {
            S: 'blah'
          }
        }
      }
    ]);
  });

  it('should handle nested objects', function() {
    var json = {
      obj: {
        foo: {
          bar: {
            baz: null
          }
        }
      }
    };
    var dynamo = jsonToDynamo(json);
    assert.deepEqual(dynamo, {
      obj: {
        M: {
          foo: {
            M: {
              bar: {
                M: {
                  baz: {
                    NULL: true
                  }
                }
              }
            }
          }
        }
      }
    });
  });
});
