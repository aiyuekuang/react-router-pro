'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by zengtao on 2017/5/19.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


//本项目的模板页面


var Index = function (_Component) {
    _inherits(Index, _Component);

    _createClass(Index, null, [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps, prevState) {
            // const {value} = nextProps;
            // 当传入的type发生变化的时候，更新state
            // if ("value" in nextProps && value !== prevState.value) {
            //     console.log(value)
            //     return {
            //         value,
            //     };
            // }
            return null;
        }
    }]);

    function Index(props) {
        _classCallCheck(this, Index);

        var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

        _this.state = {};
        return _this;
    }

    //移除


    _createClass(Index, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            //离开页面消除所有接口请求
            //window.requestCancel();
        }
    }, {
        key: 'render',
        value: function render() {
            _objectDestructuringEmpty(this.props);

            _objectDestructuringEmpty(this.state);

            return _react2.default.createElement(
                'div',
                { className: 'not_found' },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement(
                            'b',
                            null,
                            '\u51FA\u9519\u5566\uFF01'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        '\u60A8\u65E0\u6743\u9650\u8BBF\u95EE\u6B64\u9875\u9762\u6216\u8BBF\u95EE\u7684\u9875\u9762\u4E0D\u5B58\u5728'
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: "/" },
                            '\u8FD4\u56DE\u9996\u9875'
                        )
                    )
                )
            );
        }
    }]);

    return Index;
}(_react.Component);

Index.defaultProps = {};
exports.default = Index;