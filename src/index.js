import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/router';
import {data,compEnum,data2} from "./router/data";
import HomeComp from "@page/home"


ReactDOM.render(
            <App data={data} compEnum={compEnum} HomeComp={HomeComp} warpRoute={data2}/>,
    document.getElementById('root')
);
