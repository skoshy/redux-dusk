'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debugLog = exports.cloneObj = exports.isObject = exports.isFunction = exports.isArray = undefined;

var _debug = require('./debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var isArray = exports.isArray = function isArray(obj) {
  return Array.isArray(obj);
};

var isFunction = exports.isFunction = function isFunction(obj) {
  return typeof obj === 'function';
};

var isObject = exports.isObject = function isObject(obj) {
  // this checks if the given param is a javascript object {}
  // this returns false for [], null, etc. Must be something like {}.

  return obj === Object(obj) && !isArray(obj) && !isFunction(obj);
};

var cloneObj = exports.cloneObj = function cloneObj(obj) {
  return JSON.parse(JSON.stringify(obj));
};

var debugLog = exports.debugLog = function debugLog(options) {
  for (var _len = arguments.length, toLog = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    toLog[_key - 1] = arguments[_key];
  }

  if (_debug2['default']) {
    var _console;

    (_console = console).log.apply(_console, toLog);
  }
};