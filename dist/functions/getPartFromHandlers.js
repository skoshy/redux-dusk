'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPartFromHandlers = undefined;

var _helpers = require('../helpers');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getPartFromHandlers = exports.getPartFromHandlers = function getPartFromHandlers(handlers, part) {
  var combinedPart = void 0;
  var handlersKeys = Object.keys(handlers);

  handlersKeys.forEach(function (handlerKey) {
    var handler = handlers[handlerKey];

    if (handler[part]) {
      // determine what we should make the combined part be
      if (typeof combinedPart === 'undefined') {
        combinedPart = {};
        if ((0, _helpers.isArray)(handler[part])) {
          combinedPart = [];
        }
      }

      if ((0, _helpers.isArray)(combinedPart)) {
        var _combinedPart;

        (_combinedPart = combinedPart).push.apply(_combinedPart, _toConsumableArray(handler[part]));
      } else {
        combinedPart[handlerKey] = handler[part];
      }
    }
  });

  return combinedPart;
};

exports['default'] = getPartFromHandlers;