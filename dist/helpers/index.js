'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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