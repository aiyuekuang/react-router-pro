import React, {Fragment, Component, PureComponent} from 'react';
import Index from '@page/home';
import {qus,createMap} from 'esn';


export const compEnum = createMap([{
    alias: "home",
    component: Index
}],"alias")


export let data = [{
    name: "主页",
    zh_CN: "主页",
    en_US: "home",
    path: "/",
    isMenuShow: false,
    component: Index,
    icon: "HomeOutlined",
}];
