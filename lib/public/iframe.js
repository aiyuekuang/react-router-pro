'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _reactRouterDom = require('react-router-dom');

var _history = require('@components/public/history');

var _history2 = _interopRequireDefault(_history);

var _esn = require('esn');

var _common = require('@components/public/common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

        _this.state = {
            wait: true,
            height: "auto"
        };

        _this.componentDidMount = function () {};

        _this.down = function () {
            var height = _this.up_tree.current.contentWindow.document.body.scrollHeight;
            _this.setState({
                wait: false,
                height: height
            });
        };

        _this.up_tree = (0, _react.createRef)();
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
            var url = this.props.url;
            var _state = this.state,
                height = _state.height,
                wait = _state.wait;

            return _react2.default.createElement(
                'div',
                { className: 'content_body' },
                _react2.default.createElement(
                    _antd.Spin,
                    { tip: '\u52A0\u8F7D\u4E2D\uFF0C\u8BF7\u7A0D\u540E...', spinning: wait, wrapperClassName: 'yn_edu_wangpan_wait' },
                    _react2.default.createElement('iframe', { id: 'ifr', ref: this.up_tree, src: url, frameBorder: '0', width: '100%', onLoad: this.down, height: height })
                )
            );
        }
    }]);

    return Index;
}(_react.Component);

Index.defaultProps = {
    url: ""
};
exports.default = Index;