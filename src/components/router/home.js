import {useLocation} from 'react-router-dom';
import React, {Fragment, useEffect, useReducer, useState} from 'react';
import NotFounds from "../public/404"
import NoAuths from "../public/no_auth"
import {arrDelNull, arrLast, cloneop, diffObj, isArrayop, strHasKey, stringArrAddValue} from "esn";

let prop = {
    data: [],
    NotFound: NotFounds,
    NoAuth: NoAuths,
    isLogin: true,
    compEnum: [],
    HomeComp: null,
    warpRoute: null,
    isNoRouter: "isShow",
    isRouter:(data=true)=>{
        return data;
    },
    onChange: (routerActData) => {

    }
}

export let treeSearchByArr = (tree, arr, label = 'id', children = 'children') => {
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
            // let str = i[label];
            // if(i[label].indexOf("?") !== -1){
            //   str = str.substring(0,i[label].indexOf("?"))
            // }
            if (i[label] === arr[layer]) {
                objLayer.push(i)
                if (arr[layer + 1] && i[children] && i[children].length > 0) {
                    loop(i[children], layer + 1);
                } else if (layer === (arr.length - 1)) {
                    obj = i;
                }
            } else if (strHasKey(i[label], "/:") && (i[label].split("/:"))[0] === arr[layer]) {
                obj = i;
            }
        }
    };
    loop(tree_);
    return {obj, objLayer};
};

// 是否为当前路由
export let isCurrentRoute = (path, currentPath) => {
    let isRoute = false;
    if (path.includes('/:')) {
        let currentPathUrlArr = stringArrAddValue(arrDelNull(currentPath.split("/")))
        currentPathUrlArr.pop()
        let _currentPath = currentPathUrlArr.length ? currentPathUrlArr.reduce((data, next) => {
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

    const {data, NotFound, compEnum, NoAuth, isLogin, HomeComp, warpRoute, isNoRouter, onChange, isRouter} = props;
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

        if (diffObj(state, _state)) {
            let urlArr = _state.map((data, i) => {
                let _obj = treeSearchByArr(props.data, stringArrAddValue(arrDelNull(data.split("/"))), "path")
                let obj = {..._obj.obj};
                obj.url = data;
                obj.layer = _obj.objLayer;
                return obj
            })
            setRouterActDataObj(urlArr)
            return _state
        }

        return state
    }, ["/"]);


    useEffect(() => {
        // Update the document title using the browser API

        return () => {
        }
    }, []);
    useEffect(() => {
        // Update the document title using the browser API
        dispatch({data: location.pathname, type: "ADD"})

        return () => {
        }
    }, [location]);

    useEffect(() => {
        // Update the document title using the browser API
        onChange(routerActDataObj)
        return () => {
        }
    }, [routerActDataObj]);

    useEffect(() => {
        // Update the document title using the browser API

        return () => {
        }
    }, [routerActData]);


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
                let params = {}

                if(strHasKey(data.path,"/:")){
                    params[arrLast(data.path.split("/:"))] = arrLast(location.pathname.split("/"))
                }

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
                            routerAddDispatch={(data) => dispatch({data: data, type: "ADD"})}
                            routerMinusDispatch={(data) => dispatch({data: data, type: "MINUS"})}
                            routerActData={routerActDataObj}
                            routerData={data}
                            match={{
                                params
                            }}
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


    let HomeCompWarp = (
        <Fragment>
            {renderRouterDom(routerActData, data)}
            {/*<Route render={() => <NotFound/>}/>*/}
        </Fragment>
    );

    if (HomeComp) {
        HomeCompWarp = (
            <HomeComp
                routerAddDispatch={(data) => dispatch({data, type: "ADD"})}
                routerMinusDispatch={(data) => dispatch({data, type: "MINUS"})}
                routerActData={routerActDataObj}>
                {renderRouterDom(routerActData, data)}
                {/*<Route exact={true} render={() => <NotFound/>}/>*/}
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

