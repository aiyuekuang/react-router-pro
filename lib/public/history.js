"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _history = require("history");

var _esn = require("esn");

/**
 * Created by zengtao on 2017/10/18.
 */
var his = (0, _history.createBrowserHistory)();

his.jump = function (path) {
  var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _param = "?";
  for (var i in param) {
    _param += i + "=" + param[i];
  }
  his.push(_param !== "?" ? path + _param : path);
};

his.getUrlParam = _esn.getUrlParam;

exports.default = his;