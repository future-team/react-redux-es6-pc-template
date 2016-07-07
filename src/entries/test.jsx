/**
 * APP主程序入口
 */
import React, { Component ,PropTypes} from 'react';
import {render} from "react-dom";
import {BindReact} from 'eg-tools';

import TestWeb from '../containers/test.jsx';
import * as reducers from '../reducers/index.es6';

//判断执行dev环境

render(
    <BindReact Module={TestWeb} reducers={reducers} />,
    document.getElementById('root')
);