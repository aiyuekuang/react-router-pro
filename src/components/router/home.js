import {useLocation} from 'react-router-dom';
import React, {Fragment, useEffect, useReducer, useState} from 'react';
import NotFounds from "../public/404"
import NoAuths from "../public/no_auth"
import {arrDelNull, cloneop, isArrayop, stringArrAddValue} from "esn";

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

let treeSearchByArr = (tree, arr, label = 'id', children = 'children') => {
  let obj = {};
  let objLayer = [];
  if (!tree) {
    console.log('提示', '你传递的tree是空');
  }
  let tree_ = cloneop(tree);
  if (!isArrayop(tree_)) {
    tree_ = [tree_];
  }
  let loop = (tree_, layer = 0) => {
    for (let i of tree_) {
      if (i[label] === arr[layer] || i[label].includes('/:')) {
        objLayer.push(i)
        if (arr[layer + 1] && i[children] && i[children].length > 0) {
          loop(i[children], layer + 1);
        } else if (layer === (arr.length - 1)) {
          obj = i;
        }
      }
    }
  };
  loop(tree_);
  return {obj, objLayer};
};

// 是否为当前路由
let isCurrentRoute = (path, currentPath) => {
  let isRoute = false;
  if (path.includes('/:')) {
    let ee = stringArrAddValue(arrDelNull(currentPath.split("/")))
    ee.pop()
    let _currentPath = ee.length ? ee.reduce((data, next) => {
      return data + next
    }) : ""

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


export default function Index(pro) {
  // Declare a new state variable, which we'll call "count"

  let props = {
    ...prop, ...pro
  }
  let location = useLocation();

  const {data, NotFound, compEnum, NoAuth, isLogin, HomeComp, warpRoute, isNoRouter, isRouterFun, onChange, isRouter} = props;
  const [routerActDataObj, setRouterActDataObj] = useState([])

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
      let _obj = treeSearchByArr(props.data, stringArrAddValue(arrDelNull(data.split("/"))), "path")

      let obj = {..._obj.obj};
      obj.url = data;
      obj.layer = _obj.objLayer;
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


  let renderRouter = (router, parentPath = '') => {
    return router.map((data, i) => {
      let isRoute = isCurrentRoute(`${parentPath}${data.path}`, location.pathname);
      let _children = filterData(data.children);

      if (!isRoute && _children && _children.length > 0) {
        return renderRouter(data.children, `${parentPath}${data.path}`);
      }

      if (routerActData.includes(`${parentPath}${data.path}`) || isRoute) {

        let Comp = data.component && typeof data.component === 'string'
          ? compEnum.get(data.component).component : data.component

        return (
          <div
            key={i}
            style={{
              display: isRoute ? 'block' : 'none',
              height: '100%',
            }}
          >
            <Comp routerAddDispatch={(data)=>dispatch({data: data, type: "ADD" })} routerMinusDispatch={(data)=>dispatch({data: data, type: "MINUS" })} routerActData={routerActDataObj}/>
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
      <HomeComp routerAddDispatch={(data)=>dispatch({data, type: "ADD" })} routerMinusDispatch={(data)=>dispatch({data, type: "MINUS" })} routerActData={routerActDataObj}>
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

