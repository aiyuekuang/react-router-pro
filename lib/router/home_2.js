'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _history = require('../public/history');

var _history2 = _interopRequireDefault(_history);

var _esn = require('esn');

var _ = require('../public/404');

var _2 = _interopRequireDefault(_);

var _no_auth = require('../public/no_auth');

var _no_auth2 = _interopRequireDefault(_no_auth);

var _home = require('./home');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by zengtao on 2017/5/19.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


//本项目的模板页面

var Index = function (_Component) {
  _inherits(Index, _Component);

  _createClass(Index, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {}
  }]);

  function Index(props) {
    _classCallCheck(this, Index);

    var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

    _this.componentDidMount = function () {};

    _this.dispatch = function (action) {
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.routerActData;

      var _state = [].concat(_toConsumableArray(state));

      switch (action.type) {
        case "ADD":
          var index = _state.findIndex(function (data, i) {
            return data === action.data;
          });
          if (index === -1) {
            _state.push(action.data);
          }
          break;
        case "MINUS":
          _state.splice(_state.findIndex(function (item) {
            return item === action.data;
          }), 1);
          break;
      }
      // let urlArr = stringArrAddValue(arrDelNull(_state[_state.length - 1].split("/")))
      var urlArr = _state.map(function (data, i) {
        var _obj = (0, _home.treeSearchByArr)(_this.props.data, (0, _esn.stringArrAddValue)((0, _esn.arrDelNull)(data.split("/"))), "path");

        var obj = _extends({}, _obj.obj);
        obj.url = data;
        obj.layer = _obj.objLayer;
        return obj;
      });

      _this.setState({
        routerActData: _state,
        routerActDataObj: urlArr
      });

      // onChange(_state, urlArr)
    };

    _this.state = {
      routerActDataObj: [],
      routerActData: []
    };

    _history2.default.listen(function (location, action) {
      console.log(location, action);
      _this.dispatch({ data: location.pathname, type: "ADD" });
      // location就是window.location的一个子集
      // action可能的值，"PUSH", "REPLACE", "POP"
    });
    return _this;
  }

  _createClass(Index, [{
    key: 'componentWillUnmount',


    //移除
    value: function componentWillUnmount() {
      //离开页面消除所有接口请求
      //window.requestCancel();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          data = _props.data,
          NotFound = _props.NotFound,
          compEnum = _props.compEnum,
          NoAuth = _props.NoAuth,
          isLogin = _props.isLogin,
          HomeComp = _props.HomeComp,
          warpRoute = _props.warpRoute,
          isNoRouter = _props.isNoRouter,
          isRouterFun = _props.isRouterFun,
          onChange = _props.onChange,
          isRouter = _props.isRouter;
      var _state2 = this.state,
          routerActDataObj = _state2.routerActDataObj,
          routerActData = _state2.routerActData;


      var filterData = function filterData(arr) {
        if (arr && arr.length > 0) {
          var _arr = (0, _esn.cloneop)(arr);
          return _arr.filter(function (data, i) {
            return isRouter(data);
          });
        } else {
          return [];
        }
      };

      var loopRouter = function loopRouter(router) {
        var parentPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

        return router.map(function (data, i) {
          var _children = filterData(data.children);
          if (_children && _children.length > 0) {
            return loopRouter(data.children, '' + parentPath + data.path, path);
          }

          var isRoute = (0, _home.isCurrentRoute)('' + parentPath + data.path, path);

          if (isRoute) {
            var Comp = data.component && typeof data.component === 'string' ? compEnum.get(data.component).component : data.component;

            return _react2.default.createElement(
              'div',
              {
                key: path,
                style: {
                  display: (0, _home.isCurrentRoute)(path, location.pathname) ? 'block' : 'none',
                  height: '100%'
                }
              },
              _react2.default.createElement(Comp, {
                location: location,
                routerAddDispatch: function routerAddDispatch(data) {
                  return _this2.dispatch({ data: data, type: "ADD" });
                },
                routerMinusDispatch: function routerMinusDispatch(data) {
                  return _this2.dispatch({ data: data, type: "MINUS" });
                },
                routerActData: routerActDataObj,
                routerData: data
              })
            );
          }
        });
      };

      var renderRouterDom = function renderRouterDom(actData, routeData) {
        return actData.map(function (value, i) {
          return _react2.default.createElement(
            _react.Fragment,
            {
              key: i
            },
            loopRouter(routeData, "", value)
          );
        });
      };

      // let renderRouter = (router, parentPath = '') => {
      //   return router.map((data, i) => {
      //     let isRoute = isCurrentRoute(`${parentPath}${data.path}`, location.pathname);
      //     let _children = filterData(data.children);
      //
      //     if (!isRoute && _children && _children.length > 0) {
      //       return renderRouter(data.children, `${parentPath}${data.path}`);
      //     }
      //
      //     if (routerActData.includes(`${parentPath}${data.path}`) || isRoute) {
      //       let Comp = data.component && typeof data.component === 'string'
      //         ? compEnum.get(data.component).component : data.component
      //
      //       return (
      //         <div
      //           key={i}
      //           style={{
      //             display: isRoute ? 'block' : 'none',
      //             height: '100%',
      //           }}
      //         >
      //           <Comp location={location} routerAddDispatch={(data) => this.dispatch({data: data, type: "ADD"})}
      //                 routerMinusDispatch={(data) => this.dispatch({data: data, type: "MINUS"})}
      //                 routerActData={routerActDataObj}/>
      //         </div>
      //       );
      //     }
      //   });
      // };

      var HomeCompWarp = _react2.default.createElement(
        _react.Fragment,
        null,
        renderRouterDom(routerActData, data)
      );

      if (HomeComp) {
        HomeCompWarp = _react2.default.createElement(
          HomeComp,
          { routerAddDispatch: function routerAddDispatch(data) {
              return _this2.dispatch({ data: data, type: "ADD" });
            },
            routerMinusDispatch: function routerMinusDispatch(data) {
              return _this2.dispatch({ data: data, type: "MINUS" });
            }, routerActData: routerActDataObj },
          renderRouterDom(routerActData, data)
        );
      }
      return _react2.default.createElement(
        _react.Fragment,
        null,
        HomeCompWarp
      );
    }
  }]);

  return Index;
}(_react.Component);

Index.defaultProps = {
  data: [],
  NotFound: _2.default,
  NoAuth: _no_auth2.default,
  isLogin: true,
  compEnum: [],
  HomeComp: null,
  warpRoute: null,
  isNoRouter: "isShow",
  isRouterFun: function isRouterFun(bool) {
    return !bool;
  }
};
exports.default = Index;