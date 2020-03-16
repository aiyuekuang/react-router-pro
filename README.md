# react-router-pro
基于react-router的中国习惯版，聚合配置路由

## 文档
[文档地址](https://www.yuque.com/docs/share/58326e91-e6e6-4a4a-a4eb-841dae2628e4?#)

## 用法

#### 安装
```cmd
npm i react-router-pro
```

#### 使用
```jsx harmony
import {RouterPro} from "react-router-pro"

const compEnum = createMap([{
    alias: "home",
    component: Index
}],"alias")


let data = [{
    name: "主页",
    zh_CN: "主页",
    en_US: "home",
    path: "/",
    isMenuShow: false,
    component: Index,
    icon: "HomeOutlined",
}];

<RouterPro data={data} compEnum={compEnum}/>

```