'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootPieces = exports.connect = exports.DuskView = exports.DuskShadow = exports.Dusk = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _views = require('./views');

var _views2 = _interopRequireDefault(_views);

var _shadows = require('./shadows');

var _shadows2 = _interopRequireDefault(_shadows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var globalShadows = void 0;
var globalShadowKeys = void 0;
var globalRootPieces = {
  reducer: {},
  logic: []
};

var Dusk = function () {
  function Dusk() {
    _classCallCheck(this, Dusk);
  }

  _createClass(Dusk, null, [{
    key: 'setup',
    value: function setup(propShadows) {
      globalShadows = propShadows;

      // set shadowKeys to be the Object.keys of the shadows
      // helper variable, used for iterating through the shadows var
      globalShadowKeys = Object.keys(globalShadows);

      // let's get the root pieces for reducers, logic, and sagas
      globalRootPieces.reducer = this.getRootReducer();
      globalRootPieces.logic = this.getRootLogic();

      return {
        rootReducer: globalRootPieces.reducer,
        rootLogic: globalRootPieces.logic
      };
    }

    // creates the rootReducer, which is all the reducers combined into one.
    // this is passed to the store.

  }, {
    key: 'getRootReducer',
    value: function getRootReducer() {
      var reducersToCombine = {};

      globalShadowKeys.forEach(function (shadowKey) {
        reducersToCombine[shadowKey] = globalShadows[shadowKey].reducer;
      });

      var combinedReducers = (0, _redux.combineReducers)(reducersToCombine);

      return combinedReducers;
    }
  }, {
    key: 'getRootLogic',
    value: function getRootLogic() {
      var combinedLogic = [];

      globalShadowKeys.forEach(function (shadowKey) {
        if (globalShadows[shadowKey].logic) {
          var logicKeys = Object.keys(globalShadows[shadowKey].logic);
          logicKeys.forEach(function (logicFunctionKey) {
            combinedLogic.push(globalShadows[shadowKey].logic[logicFunctionKey]);
          });
        }
      });

      return combinedLogic;
    }

    // this is essentially mapStateToProps, but enhanced

  }, {
    key: 'stateMapper',
    value: function stateMapper(state, selectedStateVars) {
      var itemsToMap = {};
      var selectedStateVarsKeys = Object.keys(selectedStateVars);

      // Add a case if you're adding a new shadow
      selectedStateVarsKeys.forEach(function (selectedStateVarKey) {
        var selectedStateVar = selectedStateVars[selectedStateVarKey];

        var paramShadow = selectedStateVar[0] || undefined;
        var paramName = selectedStateVar[1] || undefined;
        var paramType = selectedStateVar[2] || undefined;

        var shadow = globalShadows[paramShadow];
        var name = paramName || selectedStateVarKey;

        // determine where do we grab this state item from
        // options: from state, or we can use a selector
        var type = paramType;
        if (type === undefined) {
          // No type was specified, so let's check for ourselves
          // Selectors are preferred over state
          type = 'state';
          if (shadow.selectors && shadow.selectors[name]) {
            type = 'selector';
          }
        }

        var rootObjectToCheck = state[paramShadow]; // default if type is 'state'
        if (type === 'selector') {
          rootObjectToCheck = shadow.selectors;
        }

        if (globalShadowKeys.includes(paramShadow)) {
          itemsToMap[selectedStateVarKey] = rootObjectToCheck[name];
        }

        if (type === 'selector') {
          // run the selector function
          itemsToMap[selectedStateVarKey] = itemsToMap[selectedStateVarKey](state);
        }
      });

      return {
        $state: itemsToMap
      };
    }

    // a function to map/import actions to a component

  }, {
    key: 'actionsMapper',
    value: function actionsMapper(dispatchToPassOff, selectedActions) {
      var itemsToMap = [];

      // Add a case if you're adding a new shadow
      selectedActions.forEach(function (selectedAction) {
        if (globalShadowKeys.includes(selectedAction)) {
          var itemToMap = { name: selectedAction };
          var shadow = globalShadows[selectedAction];

          itemToMap.actions = shadow.actions || false;
          itemToMap.selectors = shadow.selectors || false;

          itemsToMap.push(itemToMap);
        }
      });

      // ===========================================================
      // Below does the heavy lifting of mapping actions/selectors
      // for us. No need to edit below.
      // ===========================================================

      var mapDispatchToProps = function mapDispatchToProps(dispatch) {
        var dispatchers = {
          $actions: {},
          $selectors: {}
        };

        itemsToMap.forEach(function (itemToMap) {
          if (itemToMap.actions) {
            dispatchers.$actions[itemToMap.name] = (0, _redux.bindActionCreators)(itemToMap.actions, dispatch);
          }
          if (itemToMap.selectors) {
            dispatchers.$selectors[itemToMap.name] = (0, _redux.bindActionCreators)(itemToMap.selectors, dispatch);
          }
        });

        return dispatchers;
      };

      return mapDispatchToProps(dispatchToPassOff);
    }

    // an abstraction layer over redux's connect
    // component     => the component to augment
    // actionsArray  => actions to import into the component
    // stateFunction => state vars to map to the component

  }, {
    key: 'connect',
    value: function connect(component, actionsArray, stateObject) {
      return (0, _reactRedux.connect)(function (state) {
        return Dusk.stateMapper(state, stateObject);
      }, function (dispatch) {
        return Dusk.actionsMapper(dispatch, actionsArray);
      })(component);
    }
  }]);

  return Dusk;
}();

exports.Dusk = Dusk;
exports.DuskShadow = _shadows2.default;
exports.DuskView = _views2.default;
var connect = Dusk.connect,
    rootPieces = Dusk.rootPieces;
exports.connect = connect;
exports.rootPieces = rootPieces;