
# json-to-dynamo

Convert JSON to a DynamoDB-friendly representation.

## Example

```js
var convert = require('json-to-dynamo');

var obj = {
  foo: true,
  bar: {
    baz: null
  }
};

convert(obj);
//=> { foo: { BOOL: true }, bar: { M: { baz: { NULL: true } } } }
```

## License

MIT
