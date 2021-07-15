import {
  Router,
  Route,
  Switch,
} from 'react-router-dom';
import React, {Fragment, useEffect, useReducer, useState} from 'react';
import history from '../public/history';
import NotFounds from "../public/404"
import NoAuths from "../public/no_auth"
import {isString} from "esn";
import Home from "./home"

let prop = {
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
  },
  onChange:()=>{},
  //用于生成路由时，判断数据是不是路由数据
  isRouter:(data=true)=>{
    return data
  }
}
let Comp = () => (<span/>);



export default function Index(pro) {
  // Declare a new state variable, which we'll call "count"

  let props = {
    ...prop, ...pro
  }

  const {data, NotFound, compEnum, NoAuth, isLogin, HomeComp, warpRoute, isNoRouter, isRouterFun} = props;


  useEffect(() => {
    // Update the document title using the browser API

    return () => {
    }
  }, []);

  let list = (routes, parentPath = "") => {
    if (routes) {
      return routes.map((route, index) => {
        if (isString(route.component)) {
          Comp = route.component && compEnum.get(route.component) ? compEnum.get(route.component).component : () => (
            <span/>)
        } else {
          Comp = route.component
        }

        let bool = route.children && route.children.length > 0

        let isExpend = true
        if (bool) {
          isExpend = false
          for (let i of route.children) {
            if (isRouterFun(i[isNoRouter])) {
              isExpend = true
            }
          }
        }

        return (
          <Route
            key={index}
            path={parentPath + route.path}
            exact={!bool}
            render={(props) => { // 利用render 方法处理
              if (bool && isExpend) {
                return (
                  <Switch>
                    {list(route.children, parentPath + route.path)}
                    <Route render={() => <NotFound/>}/>
                  </Switch>
                )
              } else {
                return (
                  <Comp {...props}/>
                )
              }
            }}
          />
        )
      })
    } else {
      return null
    }
  }


  return (
    <Router
      history={history}
    >
      <Switch>
        {list(warpRoute)}
        {isLogin ? <Route component={()=><Home {...props} />}/> : null}
        {isLogin ?<Route exact={true} render={() => <NotFound/>}/>:null}
        {/*<Route exact path="/noneAuth" component={NoAuth}/>*/}
      </Switch>
    </Router>
  );
}

