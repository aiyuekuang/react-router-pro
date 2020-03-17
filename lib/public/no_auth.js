"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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
        key: "getDerivedStateFromProps",
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

        _this.componentDidMount = function () {};

        _this.state = {};
        return _this;
    }

    _createClass(Index, [{
        key: "componentWillUnmount",


        //移除
        value: function componentWillUnmount() {
            //离开页面消除所有接口请求
            //window.requestCancel();
        }
    }, {
        key: "render",
        value: function render() {
            var locales = this.props.locales;

            _objectDestructuringEmpty(this.state);

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    "div",
                    { className: "no_auth" },
                    _react2.default.createElement(
                        "div",
                        null,
                        "\u672C\u8D26\u53F7\u65E0\u6743\u9650\u6216\u767B\u5F55\u5DF2\u5931\u6548\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55"
                    )
                )
            );
        }
    }]);

    return Index;
}(_react.Component);

Index.defaultProps = {};
exports.default = Index;