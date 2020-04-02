import {
    Router,
    Route,
    Switch
} from 'react-router-dom';
import React, {Fragment, useEffect, useState} from 'react';
import history from '../public/history';
import NotFounds from "../public/404"
import NoAuths from "../public/no_auth"
import {isString} from "esn";

let prop = {
    data: [],
    NotFound: NotFounds,
    NoAuth: NoAuths,
    isLogin: true,
    compEnum: [],
    HomeComp: null,
    warpRoute:null
}

export default function Index(pro) {
    // Declare a new state variable, which we'll call "count"

    let props = {
        ...prop, ...pro
    }

    const {data, NotFound, compEnum, NoAuth, isLogin, HomeComp,warpRoute} = props;


    useEffect(() => {
        // Update the document title using the browser API

        return () => {
        }
    }, []);

    let list = (routes, parentPath = "") => {
        if(routes){
            return routes.map((route, index) => {
                let Comp = () => (<span/>);

                if (isString(route.component)) {
                    Comp = route.component ? compEnum.get(route.component).component : null
                } else {
                    Comp = route.component
                }

                let bool = route.children && route.children.length > 0

                return (
                    <Route
                        key={index}
                        path={parentPath + route.path}
                        exact={!bool}
                        render={(props) => { // 利用render 方法处理
                            if (bool) {
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
        }else {
            return null
        }
    }

    let HomeCompWarp = (<Switch>
        {list(data)}
        <Route render={() => <NotFound/>}/>
    </Switch>);

    if (HomeComp) {
        HomeCompWarp = (<HomeComp>
            <Switch>
                {list(data)}
                <Route render={() => <NotFound/>}/>
            </Switch>
        </HomeComp>)
    }

    return (
        <Router
            history={history}
        >
            <Switch>
                {list(warpRoute)}
                <Route exact path="/noneAuth" component={NoAuth}/>
                {isLogin ? HomeCompWarp : null}
            </Switch>
        </Router>
    );
}

