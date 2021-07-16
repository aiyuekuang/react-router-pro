'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isCurrentRoute = exports.treeSearchByArr = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Index;

var _reactRouterDom = require('react-router-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../public/404');

var _2 = _interopRequireDefault(_);

var _no_auth = require('../public/no_auth');

var _no_auth2 = _interopRequireDefault(_no_auth);

var _esn = require('esn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var prop = {
    data: [],
    NotFound: _2.default,
    NoAuth: _no_auth2.default,
    isLogin: true,
    compEnum: [],
    HomeComp: null,
    warpRoute: null,
    isNoRouter: "isShow",
    isRouter: function isRouter() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        return data;
    },
    onChange: function onChange(routerActData) {}
};

var treeSearchByArr = exports.treeSearchByArr = function treeSearchByArr(tree, arr) {
    var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'id';
    var children = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'children';

    var obj = {};
    var objLayer = [];
    if (!tree) {
        console.log('提示', '你传递的tree是空');
    }
    var tree_ = (0, _esn.cloneop)(tree);
    if (!(0, _esn.isArrayop)(tree_)) {
        tree_ = [tree_];
    }
    var loop = function loop(tree_) {
        var layer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = tree_[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var i = _step.value;

                // let str = i[label];
                // if(i[label].indexOf("?") !== -1){
                //   str = str.substring(0,i[label].indexOf("?"))
                // }
                if (i[label] === arr[layer]) {
                    objLayer.push(i);
                    if (arr[layer + 1] && i[children] && i[children].length > 0) {
                        loop(i[children], layer + 1);
                    } else if (layer === arr.length - 1) {
                        obj = i;
                    }
                } else if ((0, _esn.strHasKey)(i[label], "/:") && i[label].split("/:")[0] === arr[layer]) {
                    obj = i;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    };
    loop(tree_);
    return { obj: obj, objLayer: objLayer };
};

// 是否为当前路由
var isCurrentRoute = exports.isCurrentRoute = function isCurrentRoute(path, currentPath) {
    var isRoute = false;
    if (path.includes('/:')) {
        var currentPathUrlArr = (0, _esn.stringArrAddValue)((0, _esn.arrDelNull)(currentPath.split("/")));
        currentPathUrlArr.pop();
        var _currentPath = currentPathUrlArr.length ? currentPathUrlArr.reduce(function (data, next) {
            return data + next;
        }) : "";

        if (_currentPath === path.split('/:')[0]) {
            isRoute = true;
        }
    } else {
        if (currentPath === path) {
            isRoute = true;
        }
    }
    return isRoute;
};

function Index(pro) {
    // Declare a new state variable, which we'll call "count"

    var props = _extends({}, prop, pro);
    var location = (0, _reactRouterDom.useLocation)();

    var data = props.data,
        NotFound = props.NotFound,
        compEnum = props.compEnum,
        NoAuth = props.NoAuth,
        isLogin = props.isLogin,
        HomeComp = props.HomeComp,
        warpRoute = props.warpRoute,
        isNoRouter = props.isNoRouter,
        onChange = props.onChange,
        isRouter = props.isRouter;

    var _useState = (0, _react.useState)([]),
        _useState2 = _slicedToArray(_useState, 2),
        routerActDataObj = _useState2[0],
        setRouterActDataObj = _useState2[1];

    var _useReducer = (0, _react.useReducer)(function (state, action) {
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

        if ((0, _esn.diffObj)(state, _state)) {
            var urlArr = _state.map(function (data, i) {
                var _obj = treeSearchByArr(props.data, (0, _esn.stringArrAddValue)((0, _esn.arrDelNull)(data.split("/"))), "path");
                var obj = _extends({}, _obj.obj);
                obj.url = data;
                obj.layer = _obj.objLayer;
                return obj;
            });
            setRouterActDataObj(urlArr);
            return _state;
        }

        return state;
    }, ["/"]),
        _useReducer2 = _slicedToArray(_useReducer, 2),
        routerActData = _useReducer2[0],
        dispatch = _useReducer2[1];

    (0, _react.useEffect)(function () {
        // Update the document title using the browser API

        return function () {};
    }, []);
    (0, _react.useEffect)(function () {
        // Update the document title using the browser API
        dispatch({ data: location.pathname, type: "ADD" });

        return function () {};
    }, [location]);

    (0, _react.useEffect)(function () {
        // Update the document title using the browser API
        onChange(routerActDataObj);
        return function () {};
    }, [routerActDataObj]);

    (0, _react.useEffect)(function () {
        // Update the document title using the browser API

        return function () {};
    }, [routerActData]);

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

            var isRoute = isCurrentRoute('' + parentPath + data.path, path);

            if (isRoute) {
                var Comp = data.component && typeof data.component === 'string' ? compEnum.get(data.component).component : data.component;
                var params = {};

                if ((0, _esn.strHasKey)(data.path, "/:")) {
                    params[(0, _esn.arrLast)(data.path.split("/:"))] = (0, _esn.arrLast)(location.pathname.split("/"));
                }

                return _react2.default.createElement(
                    'div',
                    {
                        key: path,
                        style: {
                            display: isCurrentRoute(path, location.pathname) ? 'block' : 'none',
                            height: '100%'
                        }
                    },
                    _react2.default.createElement(Comp, {
                        location: location,
                        routerAddDispatch: function routerAddDispatch(data) {
                            return dispatch({ data: data, type: "ADD" });
                        },
                        routerMinusDispatch: function routerMinusDispatch(data) {
                            return dispatch({ data: data, type: "MINUS" });
                        },
                        routerActData: routerActDataObj,
                        routerData: data,
                        match: {
                            params: params
                        }
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

    var HomeCompWarp = _react2.default.createElement(
        _react.Fragment,
        null,
        renderRouterDom(routerActData, data)
    );

    if (HomeComp) {
        HomeCompWarp = _react2.default.createElement(
            HomeComp,
            {
                routerAddDispatch: function routerAddDispatch(data) {
                    return dispatch({ data: data, type: "ADD" });
                },
                routerMinusDispatch: function routerMinusDispatch(data) {
                    return dispatch({ data: data, type: "MINUS" });
                },
                routerActData: routerActDataObj },
            renderRouterDom(routerActData, data)
        );
    }

    return _react2.default.createElement(
        _react.Fragment,
        null,
        HomeCompWarp
    );
}