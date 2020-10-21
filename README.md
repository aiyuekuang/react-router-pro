# react-router-pro
基于react-router的中国习惯版，包含：集中配置路由、缓存路由、移动端路由，路由之间可无缝切换，极简配置。（赠人玫瑰手有余香，辛苦码字，留个星呗）

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

let data = [{
    name: "主页",
    path: "/",
    component: Index,
   //注意：在/路由下不要出现children
	},{
        name: "内页",
        path: "/page",
        component: Index,
     	children:[{
            name: "子内页",
            path: "/pageIn",
            component: Index,
		}]
	}];

<RouterPro data={data}/>

```
## 业务无法实现？
如果遇到react-router-pro无法实现的业务，请及时issue，您会得到最及时的帮助

## 更新日志 v0.0.19 [地址](https://github.com/aiyuekuang/react-router-pro/blob/master/doc/doc.MD)
1. 发布PhoneRouter-手机端路由系统


## 常见问题
1. history.push为什么地址跳转了，但是页面不变？
    
    - 答：可能history你引用的是原生的，history要使用react-router-pro的。
2. 很多路由出现没权限的页面或者404？
    - 可能是/路由下配置了children，唯一特殊的就是根路由下不要配置子路由，需要的可以另起一个对象配置,如下：
    ```jsx harmony
    let data = [{
        name: "主页",
        zh_CN: "主页",
        en_US: "home",
        path: "/",
        component: Index,
        icon: "HomeOutlined",
    },{ name: "其他",
      zh_CN: "其他",
      en_US: "other",
      path: "/other",
      component: Index,
      icon: "HomeOutlined"}];
    ```
3. 跳转到没权限和404的地址是什么？
    
    - 无权限：/noneAuth，404：/404
4. react-router更新了，性能提高了，我想用怎么办？
    - react-router-pro会跟随react-router同步更新
    
## 联系作者
qq群号：873937696
或者点击加群：<a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=24240bf5a60ae132316f6e5aa23448f73f2fa34dcd701490a163744105e004a2">点击</a>