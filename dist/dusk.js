'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autoMergeNameSpaces = exports.getPartFromHandlers = exports.setupDusk = exports.createHandler = undefined;

var _autoMergeNameSpaces = require('./lib/redux-persist/stateReconciler/autoMergeNameSpaces');

Object.defineProperty(exports, 'autoMergeNameSpaces', {
  enumerable: true,
  get: function () {
    function get() {
      return _autoMergeNameSpaces.autoMergeNameSpaces;
    }

    return get;
  }()
});

var _createHandler = require('./functions/createHandler');

var _getPartFromHandlers = require('./functions/getPartFromHandlers');

var _setupDusk = require('./functions/setupDusk');

exports.createHandler = _createHandler.createHandler;
exports.setupDusk = _setupDusk.setupDusk;
exports.getPartFromHandlers = _getPartFromHandlers.getPartFromHandlers;