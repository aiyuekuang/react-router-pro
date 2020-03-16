import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/router';
import {data,compEnum} from "./router/data";


ReactDOM.render(
            <App data={data} compEnum={compEnum}/>,
    document.getElementById('root')
);
