import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/router/phoneRouter';
import {data,compEnum,data2} from "./router/data";
import HomeComp from "@page/home"


ReactDOM.render(
            <App data={data2} HomeComp={HomeComp}/>,
    document.getElementById('root')
);
