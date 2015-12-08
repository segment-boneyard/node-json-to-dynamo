
'use strict';

/**
 * Expose `jsonToDynamo`.
 */

module.exports = jsonToDynamo;

/**
 * Convert the given `json` to Dynamo-format.
 *
 * @param {Object} json
 * @return {Object}
 * @api public
 */

function jsonToDynamo(json) {
  if (Array.isArray(json)) {
    var o = array(json);
    return o.L;
  }

  var res = object(json);
  return res.M;
}

/**
 * Convert the given `val` to its Dynamo representation.
 *
 * @param {Mixed|Any} val
 * @return {Object}
 * @api private
 */

function convert(val) {
  var type = typeof val;

  if (val === null) {
    return nil(val);
  }

  if (type == 'string') {
    return string(val);
  }

  if (type == 'number') {
    return number(val);
  }

  if (type == 'boolean') {
    return bool(val);
  }

  if (Array.isArray(val)) {
    return array(val);
  }

  if (Object.prototype.toString.call(val) == '[object Date]') {
    return date(val);
  }

  return object(val);
}

/**
 * Object.
 */

function object(val) {
  var obj = {};
  for (var prop in val) {
    if (!val.hasOwnProperty(prop)) continue;
    obj[prop] = convert(val[prop]);
  }
  return { M: obj };
}

/**
 * Date.
 */

function date(val) {
  return string(val.toString());
}

/**
 * Array.
 */

function array(val) {
  var result = [];
  for (var i = 0; i < val.length; i++) {
    result.push(convert(val[i]));
  }
  return { L: result };
}

/**
 * String.
 */

function string(val) {
  return { S: val };
}

/**
 * Boolean.
 */

function bool(val) {
  return { BOOL: !!val };
}

/**
 * Number.
 */

function number(val) {
  return { N: String(val) };
}

/**
 * Null.
 */

function nil() {
  return { NULL: true };
}
