/**
 * Created by zengtao on 2017/10/18.
 */
import {createBrowserHistory} from 'history';
import {getUrlParam} from "esn"

let his = createBrowserHistory()

his.jump = (path, param = {}) => {
  let _param = "?"
  for (let i in param) {
    _param += `${i}=${param[i]}`
  }
  his.push(_param !== "?" ? path + _param : path)
}

his.getUrlParam = getUrlParam


export default his;
