"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var parseAction = exports.parseAction = function parseAction(currentType, fullType, parseActionParams) {
  if (Array.isArray(parseActionParams)) {
    // let's create our own action
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var actionParams = {};
      parseActionParams.forEach(function (parseActionParam, parseActionParamIndex) {
        actionParams[parseActionParam] = args[parseActionParamIndex];
      });

      var action = Object.assign({
        type: fullType
      }, actionParams);

      return action;
    };
  }

  // else, let's assume the user gave their own function as a param.
  // let's use that instead as the action.
  return parseActionParams;
};

exports["default"] = parseAction;