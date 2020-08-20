import {
  Router,
  Route,
  Switch,
  useLocation
} from 'react-router-dom';
import React, {Fragment, useEffect, useReducer, useState} from 'react';
import history from '../public/history';
import NotFounds from "../public/404"
import NoAuths from "../public/no_auth"
import {isString, treeSearchByArr, stringArrAddValue, arrDelNull, cloneop} from "esn";

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
  }
}
let Comp = () => (<span/>);


// 是否为当前路由
let isCurrentRoute = (path, currentPath) => {
  let isRoute = false;
  if (path.includes('/:id')) {
    if (currentPath.includes(path.split(':id')[0])) {
      isRoute = true;
    }
  } else {
    if (currentPath === path) {
      isRoute = true;
    }
  }
  return isRoute;
};


export default function Index(pro) {
  // Declare a new state variable, which we'll call "count"

  let props = {
    ...prop, ...pro
  }
  let location = useLocation();

  const {data, NotFound, compEnum, NoAuth, isLogin, HomeComp, warpRoute, isNoRouter, isRouterFun, onChange,isRouter} = props;
  const [routerActDataObj,setRouterActDataObj] = useState([])

  const [routerActData, dispatch] = useReducer((state, action) => {
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
      let obj = treeSearchByArr(props.data,stringArrAddValue(arrDelNull(data.split("/"))),"path")
      obj.url = data;
      return obj
    })
    setRouterActDataObj(urlArr)
    // onChange(_state, urlArr)
    return _state
  }, ["/"]);

  useEffect(() => {
    // Update the document title using the browser API
    dispatch({data: location.pathname, type: "ADD"})
    return () => {
    }
  }, [location]);

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   history.listen((data, type) => {
  //     dispatch({data: location.pathname})
  //   })
  //   return () => {
  //   }
  // }, []);

  let filterData = (arr)=>{
    if(arr && arr.length>0){
      let _arr = cloneop(arr);
      return _arr.filter((data,i)=>{
        return isRouter(data);
      })
    }else {
      return []
    }
  }


  let renderRouter = (router, parentPath = '') => {
    return router.map((data, i) => {
      let isRoute = isCurrentRoute(`${parentPath}${data.path}`, location.pathname);
      let _children = filterData(data.children);

      if (!isRoute && _children && _children.length > 0) {
        return renderRouter(data.children, `${parentPath}${data.path}`);
      }
      if (routerActData.includes(`${parentPath}${data.path}`) || isRoute) {
        return (
          <div
            key={i}
            style={{
              display: isRoute ? 'block' : 'none',
              height: '100%',
            }}
          >
            <Route
              key={i}
              // path={'/'}
              component={
                data.component && typeof data.component === 'string'
                  ? compEnum.get(data.component).component : data.component
              }
            />
          </div>
        );
      }
    });
  };



  let HomeCompWarp = (
    <Fragment>
      {renderRouter(data)}
      {/*<Route render={() => <NotFound/>}/>*/}
    </Fragment>
  );

  if (HomeComp) {
    HomeCompWarp = (
      <HomeComp dispatch={dispatch} routerActData={routerActDataObj}>
        {renderRouter(data)}
        {/*<Route render={() => <NotFound/>}/>*/}
      </HomeComp>
    )
  }

  return (
    <Fragment>
      {HomeCompWarp}
      {/*<Route render={() => <NotFound/>}/>*/}
    </Fragment>
  );
}

