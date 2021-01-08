/**
 * Created by zengtao on 2017/5/19.
 */
import React, {Fragment, Component, PureComponent} from 'react';
import {Router, Route, Switch, Link} from 'react-router-dom';
import history from '../public/history';
import {arrDelNull, cloneop, cuns, stringArrAddValue} from 'esn';
import NotFounds from "../public/404"
import NoAuths from "../public/no_auth"
import {isCurrentRoute, treeSearchByArr} from "./home";
//本项目的模板页面

export default class Index extends Component {
  static defaultProps = {
    data: [],
    NotFound: NotFounds,
    NoAuth: NoAuths,
    isLogin: true,
    compEnum: [],
    HomeComp: null,
    warpRoute: null,
    isNoRouter: "isShow",
    isRouterFun: (bool) => {
      return !bool;
    }
  };

  componentWillReceiveProps(nextProps) {
  }

  constructor(props) {
    super(props);

    this.state = {
      routerActDataObj: [],
      routerActData: []
    };

    history.listen((location, action) => {
      console.log(location, action);
      this.dispatch({data: location.pathname, type: "ADD"})
      // location就是window.location的一个子集
      // action可能的值，"PUSH", "REPLACE", "POP"
    })
  }

  componentDidMount = () => {

  };

  //移除
  componentWillUnmount() {
    //离开页面消除所有接口请求
    //window.requestCancel();
  }


  dispatch = (action, state = this.state.routerActData) => {
    let _state = [...state];

    switch (action.type) {
      case "ADD":
        let index = _state.findIndex((data, i) => {
          return data === action.data
        })
        if (index === -1) {
          _state.push(action.data);
        }
        break;
      case "MINUS":
        _state.splice(_state.findIndex(item => item === action.data), 1);
        break;
    }
    // let urlArr = stringArrAddValue(arrDelNull(_state[_state.length - 1].split("/")))
    let urlArr = _state.map((data, i) => {
      let _obj = treeSearchByArr(this.props.data, stringArrAddValue(arrDelNull(data.split("/"))), "path")

      let obj = {..._obj.obj};
      obj.url = data;
      obj.layer = _obj.objLayer;
      return obj
    })


    this.setState({
      routerActData: _state,
      routerActDataObj: urlArr
    })


    // onChange(_state, urlArr)
  }

  render() {
    const {data, NotFound, compEnum, NoAuth, isLogin, HomeComp, warpRoute, isNoRouter, isRouterFun, onChange, isRouter} = this.props;
    const {routerActDataObj, routerActData} = this.state;


    let filterData = (arr) => {
      if (arr && arr.length > 0) {
        let _arr = cloneop(arr);
        return _arr.filter((data, i) => {
          return isRouter(data);
        })
      } else {
        return []
      }
    }

    let loopRouter = (router, parentPath = '', path = "") => {
      return router.map((data, i) => {
        let _children = filterData(data.children);
        if (_children && _children.length > 0) {
          return loopRouter(data.children, `${parentPath}${data.path}`, path);
        }

        let isRoute = isCurrentRoute(`${parentPath}${data.path}`, path);

        if (isRoute) {
          let Comp = data.component && typeof data.component === 'string'
            ? compEnum.get(data.component).component : data.component

          return (
            <div
              key={path}
              style={{
                display: isCurrentRoute(path, location.pathname) ? 'block' : 'none',
                height: '100%',
              }}
            >
              <Comp
                location={location}
                routerAddDispatch={(data) => this.dispatch({data: data, type: "ADD"})}
                routerMinusDispatch={(data) => this.dispatch({data: data, type: "MINUS"})}
                routerActData={routerActDataObj}
                routerData={data}
              />
            </div>
          );
        }
      });
    };


    let renderRouterDom = (actData, routeData) => {
      return actData.map((value, i) => {
        return (
          <Fragment
            key={i}
          >
            {loopRouter(routeData, "", value)}
          </Fragment>
        )
      })
    }


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

    let HomeCompWarp = (
      <Fragment>
        {renderRouterDom(routerActData, data)}
        {/*<Route render={() => <NotFound/>}/>*/}
      </Fragment>
    );

    if (HomeComp) {
      HomeCompWarp = (
        <HomeComp routerAddDispatch={(data) => this.dispatch({data, type: "ADD"})}
                  routerMinusDispatch={(data) => this.dispatch({data, type: "MINUS"})} routerActData={routerActDataObj}>
          {renderRouterDom(routerActData, data)}
          {/*<Route render={() => <NotFound/>}/>*/}
        </HomeComp>
      )
    }
    return (
      <Fragment>
        {HomeCompWarp}
        {/*<Route render={() => <NotFound/>}/>*/}
      </Fragment>
    )
  }
}
