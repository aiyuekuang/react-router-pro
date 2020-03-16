# react-router-pro
基于react-router的中国习惯版，聚合配置路由

## 文档
[文档地址](https://www.yuque.com/books/share/97de8b1c-5931-40fe-9bdb-c1f60ff95b6c?#)

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