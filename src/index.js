/**
 * 主程序入口
 */
import React from 'react';
import {render} from "react-dom";
import AppRouter from './containers/AppRouter';
import {BindReact} from 'eg-tools';

import * as reducers from './reducers/index';
require('../less/index.less');
//require('../less/public.less');

render(
<BindReact Module={AppRouter} reducers={reducers} />,
document.getElementById('root')
);
